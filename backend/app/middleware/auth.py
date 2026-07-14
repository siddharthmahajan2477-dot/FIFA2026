from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from backend.app.core.database import get_db_session as get_db
from backend.app.models.auth.models import User, Role, Permission, UserRole
from backend.app.services.firebase import verify_firebase_token

security = HTTPBearer(auto_error=False)

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db)
) -> User:
    """
    Dependency to authenticate requests using the Firebase ID Token.
    Decodes the token, maps/verifies the user profile in PostgreSQL,
    and returns the authenticated User instance with preloaded roles and permissions.
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
    
    # Query user profile from PostgreSQL with roles and permissions eager-loaded
    stmt = (
        select(User)
        .options(
            selectinload(User.roles).selectinload(UserRole.role).selectinload(Role.permissions)
        )
        .filter(User.firebase_uid == firebase_uid)
    )
    result = await db.execute(stmt)
    user = result.scalars().first()
    
    # Account linking fallback
    if not user and email:
        stmt = (
            select(User)
            .options(
                selectinload(User.roles).selectinload(UserRole.role).selectinload(Role.permissions)
            )
            .filter(User.email == email)
        )
        result = await db.execute(stmt)
        user = result.scalars().first()
        if user:
            user.firebase_uid = firebase_uid
            await db.commit()
            
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not registered with application database. Sync profile first.",
        )
        
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is suspended or deactivated.",
        )
        
    return user

def require_permissions(required_permissions: list[str]):
    """
    Dependency creator to restrict API access based on the user's permissions.
    If the user has the 'Super Administrator' role, they bypass all permission checks.
    """
    async def dependency(current_user: User = Depends(get_current_user)):
        user_permissions = set()
        is_super_admin = False
        
        for user_role in current_user.roles:
            if user_role.role.name.lower() in ["super administrator", "administrator"]:
                is_super_admin = True
                break
            for perm in user_role.role.permissions:
                user_permissions.add(perm.name)
                
        if is_super_admin:
            return current_user
            
        # Check if all required permissions are met
        for req_perm in required_permissions:
            if req_perm not in user_permissions:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"Access denied: Requires permission '{req_perm}'.",
                )
                
        return current_user
    return dependency

def require_roles(required_roles: list[str]):
    """
    Dependency creator to restrict API access based strictly on roles.
    """
    async def dependency(current_user: User = Depends(get_current_user)):
        user_roles = {ur.role.name.lower() for ur in current_user.roles}
        
        if "super administrator" in user_roles or "administrator" in user_roles:
            return current_user
            
        req_roles_lower = [r.lower() for r in required_roles]
        if not any(r in user_roles for r in req_roles_lower):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied: Requires one of roles {required_roles}.",
            )
        return current_user
    return dependency
