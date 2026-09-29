from typing import List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "TribeX AI API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Database
    POSTGRES_SERVER: str = "localhost"
    POSTGRES_USER: str = "tribex_admin"
    POSTGRES_PASSWORD: str = "tribex_secure_pass_2026"
    POSTGRES_DB: str = "tribex_db"
    POSTGRES_PORT: int = 5432
    
    @property
    def ASYNC_DATABASE_URI(self) -> str:
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "https://tribex-ai.gov.in"
    ]
    
    # Security
    SALT_PEPPER: str = "tribex_mota_secure_salt_pepper_2026"

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
