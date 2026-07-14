from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.models.system.models import AuditLog
import datetime

async def log_audit_event(
    db: AsyncSession,
    action: str,
    user_id: int | None = None,
    entity_type: str | None = None,
    entity_id: int | None = None,
    details: dict | None = None,
    ip_address: str | None = None
) -> AuditLog:
    """
    Standardized function to record an audit log event into the database.
    """
    audit_log = AuditLog(
        user_id=user_id,
        action=action,
        entity_type=entity_type,
        entity_id=entity_id,
        details=details or {},
        ip_address=ip_address,
        created_at=datetime.datetime.now(datetime.timezone.utc)
    )
    db.add(audit_log)
    # We purposefully don't strictly commit here to allow it to be part of an outer transaction.
    # We just flush to get the ID if needed.
    await db.flush()
    return audit_log
