import asyncio
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.core.database import SessionLocal
from backend.app.models.auth.models import Role, Permission
from backend.app.models.users.models import Country, Language
from backend.app.models.football.models import Group

ROLES = [
    {"name": "Admin", "description": "Full system administrator"},
    {"name": "Fan", "description": "Standard user and fan"},
    {"name": "Volunteer", "description": "Stadium volunteer"},
    {"name": "Security", "description": "Stadium security personnel"},
    {"name": "Medical", "description": "Stadium medical staff"},
    {"name": "Vendor", "description": "Food/Merch vendor staff"},
    {"name": "Operations", "description": "Stadium operations management"},
]

PERMISSIONS = [
    {"name": "manage_users", "description": "Can manage users"},
    {"name": "view_incidents", "description": "Can view security/medical incidents"},
    {"name": "manage_inventory", "description": "Can manage F&B and merch inventory"},
    {"name": "manage_matches", "description": "Can schedule/update matches"},
]

COUNTRIES = [
    {"code": "US", "name": "United States", "phone_code": "+1"},
    {"code": "CA", "name": "Canada", "phone_code": "+1"},
    {"code": "MX", "name": "Mexico", "phone_code": "+52"},
    {"code": "GB", "name": "United Kingdom", "phone_code": "+44"},
    {"code": "AR", "name": "Argentina", "phone_code": "+54"},
    {"code": "BR", "name": "Brazil", "phone_code": "+55"},
    {"code": "FR", "name": "France", "phone_code": "+33"},
    {"code": "ES", "name": "Spain", "phone_code": "+34"},
]

LANGUAGES = [
    {"code": "en", "name": "English", "native_name": "English"},
    {"code": "es", "name": "Spanish", "native_name": "Español"},
    {"code": "fr", "name": "French", "native_name": "Français"},
    {"code": "pt", "name": "Portuguese", "native_name": "Português"},
]

GROUPS = [
    {"name": "Group A"}, {"name": "Group B"}, {"name": "Group C"},
    {"name": "Group D"}, {"name": "Group E"}, {"name": "Group F"},
    {"name": "Group G"}, {"name": "Group H"}, {"name": "Group I"},
    {"name": "Group J"}, {"name": "Group K"}, {"name": "Group L"},
]

async def seed_data(db: AsyncSession):
    print("Seeding Roles...")
    for role_data in ROLES:
        role = Role(**role_data)
        db.add(role)
        
    print("Seeding Permissions...")
    for perm_data in PERMISSIONS:
        perm = Permission(**perm_data)
        db.add(perm)
        
    print("Seeding Countries...")
    for country_data in COUNTRIES:
        country = Country(**country_data)
        db.add(country)
        
    print("Seeding Languages...")
    for lang_data in LANGUAGES:
        lang = Language(**lang_data)
        db.add(lang)
        
    print("Seeding World Cup Groups...")
    for group_data in GROUPS:
        group = Group(**group_data)
        db.add(group)
        
    await db.commit()
    print("Seeding complete!")

async def main():
    async with SessionLocal() as session:
        try:
            await seed_data(session)
        except Exception as e:
            await session.rollback()
            print(f"Error seeding database: {e}")

if __name__ == "__main__":
    asyncio.run(main())
