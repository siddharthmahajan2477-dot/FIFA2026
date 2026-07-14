import datetime
import uuid
from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from backend.app.core.database import get_db_session as get_db
from backend.app.models.auth.models import User, Role, UserRole, Session
from backend.app.models.users.models import UserProfile
from backend.app.schemas.schemas import UserSyncRequest, UserSyncResponse
from backend.app.services.firebase import verify_firebase_token
from backend.app.middleware.auth import get_current_user
from backend.app.services.audit import log_audit_event
from backend.app.repositories.core import user_repo, profile_repo, role_repo

router = APIRouter()
security = HTTPBearer(auto_error=False)

@router.get("/check-username")
async def check_username(username: str, db: AsyncSession = Depends(get_db)):
    """
    Checks if a username is available for a new user registration.
    """
    result = await db.execute(select(User).filter(User.username == username))
    existing = result.scalars().first()
    return {"username": username, "available": existing is None}

@router.post("/sync", response_model=UserSyncResponse)
async def sync_user_profile(
    profile_in: UserSyncRequest,
    request: Request,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db)
):
    """
    Synchronizes the Firebase authenticated user with the PostgreSQL database.
    Creates a new user profile or updates the existing one.
    Also manages a backend Session object.
    """
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization credentials missing.",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    token = credentials.credentials
    try:
        decoded_token = verify_firebase_token(token)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    firebase_uid = decoded_token.get("uid")
    email = decoded_token.get("email")
    email_verified = decoded_token.get("email_verified", False)
    
    if not firebase_uid or not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid token payload: missing uid or email.",
        )

    # 1. Search user by Firebase UID
    result = await db.execute(select(User).filter(User.firebase_uid == firebase_uid))
    user = result.scalars().first()
    
    is_new_user = False
    
    if not user:
        # 2. Search user by Email (Account linking fallback)
        result = await db.execute(select(User).filter(User.email == email))
        user = result.scalars().first()
        if user:
            # Link existing local account with Firebase
            user.firebase_uid = firebase_uid
            user.username = profile_in.username or user.username
        else:
            # 3. Create a new user profile in PostgreSQL
            is_new_user = True
            user = User(
                email=email,
                firebase_uid=firebase_uid,
                username=profile_in.username,
                is_verified=email_verified,
                is_active=True
            )
            db.add(user)
            await db.flush() # Flush to get user.id
            
            # Fetch the default role
            requested_role_name = profile_in.role or "Fan"
            role_result = await db.execute(select(Role).filter(Role.name.ilike(requested_role_name)))
            role = role_result.scalars().first()
            
            if not role:
                role_result = await db.execute(select(Role).filter(Role.name == "Fan"))
                role = role_result.scalars().first()
                
            if role:
                user_role = UserRole(user_id=user.id, role_id=role.id)
                db.add(user_role)
                
            # Create UserProfile
            profile = UserProfile(
                user_id=user.id,
                display_name=profile_in.display_name,
                country=profile_in.country,
                language=profile_in.language,
            )
            db.add(profile)
    else:
        # User already exists, fetch profile to update if necessary
        result = await db.execute(select(UserProfile).filter(UserProfile.user_id == user.id))
        profile = result.scalars().first()
        if profile:
            profile.display_name = profile_in.display_name or profile.display_name
            profile.country = profile_in.country or profile.country
            profile.language = profile_in.language or profile.language

    # Generate a backend session record
    client_ip = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")
    
    session = Session(
        session_id=str(uuid.uuid4()),
        user_id=user.id,
        ip_address=client_ip,
        user_agent=user_agent,
        expires_at=datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=7)
    )
    db.add(session)
    
    await log_audit_event(
        db=db,
        action="user_login" if not is_new_user else "user_signup",
        user_id=user.id,
        entity_type="User",
        entity_id=user.id,
        ip_address=client_ip
    )
    
    await db.commit()
    
    # Reload profile for response mapping
    result = await db.execute(select(UserProfile).filter(UserProfile.user_id == user.id))
    profile = result.scalars().first()
    
    # Fetch roles
    role_result = await db.execute(select(UserRole.role_id).filter(UserRole.user_id == user.id))
    role_ids = role_result.scalars().all()
    primary_role_name = "Fan"
    if role_ids:
        role_record = await db.execute(select(Role).filter(Role.id == role_ids[0]))
        r = role_record.scalars().first()
        if r:
            primary_role_name = r.name
    
    return UserSyncResponse(
        firebase_uid=user.firebase_uid,
        email=user.email,
        username=user.username,
        display_name=profile.display_name if profile else None,
        country=profile.country if profile else None,
        favorite_team=None,
        favorite_club=None,
        language=profile.language if profile else "en",
        role=primary_role_name
    )

@router.post("/logout")
async def logout(
    request: Request,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Invalidates active sessions for the current user matching this IP/device
    and records an audit log.
    """
    client_ip = request.client.host if request.client else None
    
    # Simple logout: remove sessions matching the current IP for this user
    # In a full robust setup, we might invalidate a specific session token passed by the frontend.
    stmt = select(Session).filter(Session.user_id == current_user.id, Session.ip_address == client_ip)
    result = await db.execute(stmt)
    sessions = result.scalars().all()
    
    for sess in sessions:
        await db.delete(sess)
        
    await log_audit_event(
        db=db,
        action="user_logout",
        user_id=current_user.id,
        entity_type="User",
        entity_id=current_user.id,
        ip_address=client_ip
    )
    
    await db.commit()
    return {"status": "success", "message": "Logged out successfully"}
