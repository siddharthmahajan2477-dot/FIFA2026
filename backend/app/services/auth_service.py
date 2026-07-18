"""Authentication service layer for FastAPI routes.

This module extracts the business logic from the auth router into reusable service
functions. The router now becomes a thin HTTP layer that only handles request
validation, dependency injection, and response modelling.

All functions are async and expect an ``AsyncSession`` instance. They raise
``HTTPException`` where appropriate so the caller (the router) can let FastAPI
handle the HTTP response.
"""

import datetime
import uuid
from fastapi import HTTPException, status
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

async def check_username(username: str, db: AsyncSession) -> dict:
    """Return availability of a username.

    Args:
        username: The desired username to check.
        db: Async SQLAlchemy session.
    """
    result = await db.execute(select(User).filter(User.username == username))
    existing = result.scalars().first()
    return {"username": username, "available": existing is None}

async def sync_user_profile(
    profile_in: UserSyncRequest,
    request,
    credentials,
    db: AsyncSession,
) -> UserSyncResponse:
    """Synchronize Firebase authenticated user with PostgreSQL.

    This mirrors the original router implementation but is isolated for unit
    testing. It raises ``HTTPException`` on auth errors.
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

    result = await db.execute(select(User).filter(User.firebase_uid == firebase_uid))
    user = result.scalars().first()
    is_new_user = False

    if not user:
        result = await db.execute(select(User).filter(User.email == email))
        user = result.scalars().first()
        if user:
            user.firebase_uid = firebase_uid
            user.username = profile_in.username or user.username
        else:
            is_new_user = True
            user = User(
                email=email,
                firebase_uid=firebase_uid,
                username=profile_in.username,
                is_verified=email_verified,
                is_active=True,
            )
            db.add(user)
            await db.flush()

            requested_role_name = profile_in.role or "Fan"
            role_result = await db.execute(
                select(Role).filter(Role.name.ilike(requested_role_name))
            )
            role = role_result.scalars().first()
            if not role:
                role_result = await db.execute(select(Role).filter(Role.name == "Fan"))
                role = role_result.scalars().first()

            if role:
                user_role = UserRole(user_id=user.id, role_id=role.id)
                db.add(user_role)

            profile = UserProfile(
                user_id=user.id,
                display_name=profile_in.display_name,
                country=profile_in.country,
                language=profile_in.language,
            )
            db.add(profile)
    else:
        result = await db.execute(select(UserProfile).filter(UserProfile.user_id == user.id))
        profile = result.scalars().first()
        if profile:
            profile.display_name = profile_in.display_name or profile.display_name
            profile.country = profile_in.country or profile.country
            profile.language = profile_in.language or profile.language

    client_ip = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")
    session = Session(
        session_id=str(uuid.uuid4()),
        user_id=user.id,
        ip_address=client_ip,
        user_agent=user_agent,
        expires_at=datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=7),
    )
    db.add(session)

    await log_audit_event(
        db=db,
        action="user_login" if not is_new_user else "user_signup",
        user_id=user.id,
        entity_type="User",
        entity_id=user.id,
        ip_address=client_ip,
    )

    await db.commit()

    result = await db.execute(select(UserProfile).filter(UserProfile.user_id == user.id))
    profile = result.scalars().first()

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
        role=primary_role_name,
    )

async def logout_user(request, current_user, db: AsyncSession) -> dict:
    """Invalidate active sessions for the current user.

    Args:
        request: FastAPI request (used for IP extraction).
        current_user: ``User`` instance obtained from auth middleware.
        db: Async session.
    """
    client_ip = request.client.host if request.client else None
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
        ip_address=client_ip,
    )
    await db.commit()
    return {"detail": "Logged out successfully"}
