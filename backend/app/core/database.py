# Backward compatibility bridge to new database package layout
from backend.app.database.database import engine, check_db_health
from backend.app.database.session import async_session_maker, get_db_session, get_db_session as get_db
from backend.app.database.base import Base
