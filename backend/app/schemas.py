from typing import Annotated

from pydantic import BaseModel, EmailStr, Field, field_validator


class ContactMessage(BaseModel):
    name: Annotated[str, Field(min_length=1, max_length=120)]
    email: Annotated[EmailStr, Field(max_length=254)]
    subject: Annotated[
        str, Field(min_length=1, max_length=200)
    ] = "Portfolio contact"
    message: Annotated[str, Field(min_length=1, max_length=10_000)]
    website: Annotated[str, Field(max_length=500)] = ""

    @field_validator("name", "subject", mode="before")
    @classmethod
    def normalize_header_text(cls, value: str) -> str:
        if not isinstance(value, str):
            return value
        value = " ".join(value.splitlines()).strip()
        if not value:
            raise ValueError("This field cannot be blank")
        return value

    @field_validator("email", mode="before")
    @classmethod
    def strip_email_whitespace(cls, value: str) -> str:
        return value.strip() if isinstance(value, str) else value

    @field_validator("message", mode="before")
    @classmethod
    def strip_message_whitespace(cls, value: str) -> str:
        return value.strip() if isinstance(value, str) else value