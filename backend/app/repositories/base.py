from typing import Generic, TypeVar, Type, List, Optional, Any, Dict, Union
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import update as sql_update, delete as sql_delete
from uuid import UUID
from backend.app.models.base import Base

ModelType = TypeVar("ModelType", bound=Base)

class BaseRepository(Generic[ModelType]):
    def __init__(self, model: Type[ModelType]):
        self.model = model

    async def get(self, db: AsyncSession, id: Any) -> Optional[ModelType]:
        result = await db.execute(select(self.model).filter(self.model.id == id))
        return result.scalars().first()

    async def get_by_uuid(self, db: AsyncSession, uuid_val: UUID) -> Optional[ModelType]:
        result = await db.execute(select(self.model).filter(self.model.uuid == uuid_val))
        return result.scalars().first()

    async def get_multi(self, db: AsyncSession, skip: int = 0, limit: int = 100) -> List[ModelType]:
        result = await db.execute(select(self.model).offset(skip).limit(limit))
        return result.scalars().all()

    async def create(self, db: AsyncSession, obj_in: Union[dict, ModelType]) -> ModelType:
        if isinstance(obj_in, dict):
            db_obj = self.model(**obj_in)
        else:
            db_obj = obj_in
        db.add(db_obj)
        await db.flush()
        return db_obj

    async def update(self, db: AsyncSession, db_obj: ModelType, obj_in: Union[dict, ModelType]) -> ModelType:
        update_data = obj_in if isinstance(obj_in, dict) else obj_in.__dict__
        for field in update_data:
            if hasattr(db_obj, field) and field != "_sa_instance_state":
                setattr(db_obj, field, update_data[field])
        db.add(db_obj)
        await db.flush()
        return db_obj

    async def remove(self, db: AsyncSession, id: Any) -> Optional[ModelType]:
        db_obj = await self.get(db, id)
        if db_obj:
            await db.delete(db_obj)
            await db.flush()
        return db_obj
