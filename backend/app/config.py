from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=Path(__file__).resolve().parent.parent / ".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        env_ignore_empty=True,
        extra="ignore",
    )

    smtp_host: str | None = None
    smtp_port: str | None = None
    smtp_user: str | None = None
    smtp_password: str | None = None
    smtp_from_email: str | None = None
    contact_to_email: str | None = None
    frontend_origins: str = ""

    @property
    def allowed_frontend_origins(self) -> list[str]:
        return [
            origin
            for raw_origin in self.frontend_origins.split(",")
            if (origin := raw_origin.strip().rstrip("/"))
        ]


settings = Settings()