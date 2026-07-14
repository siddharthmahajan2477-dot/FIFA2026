import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from alembic.config import Config
from alembic import command
from backend.app.core.config import settings

# Override the database URL to use SQLite purely for generating the initial DDL migration
settings.DATABASE_URL = "sqlite+aiosqlite:///:memory:"

alembic_cfg = Config("alembic.ini")
alembic_cfg.set_main_option("sqlalchemy.url", settings.DATABASE_URL)

try:
    command.revision(alembic_cfg, autogenerate=True, message="Initial schema")
    print("Successfully generated migration.")
except Exception as e:
    print(f"Error generating migration: {e}")
