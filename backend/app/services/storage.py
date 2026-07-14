from abc import ABC, abstractmethod
from typing import BinaryIO

class ObjectStorage(ABC):
    @abstractmethod
    async def upload_file(self, file_obj: BinaryIO, filename: str) -> str:
        pass

class LocalStorage(ObjectStorage):
    async def upload_file(self, file_obj: BinaryIO, filename: str) -> str:
        return f"/uploads/{filename}"

class S3Storage(ObjectStorage):
    async def upload_file(self, file_obj: BinaryIO, filename: str) -> str:
        # Mock AWS S3 bucket upload logic
        return f"https://s3.amazonaws.com/stadium-media/{filename}"
