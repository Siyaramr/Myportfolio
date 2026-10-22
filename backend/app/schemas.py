from typing import Annotated

from pydantic import BaseModel, EmailStr, Field, field_validator


class ContactMessage(BaseModel):
    name: Annotated[str, Field(min_length=1, max_length=120)]
    email: EmailStr
    subject: Annotated[str, Field(min_length=1, max_length=200)]
    message: Annotated[str, Field(min_length=1, max_length=10_000)]
    website: Annotated[str, Field(max_length=500)] = ""

    @field_validator("name", "subject", mode="before")
    @classmethod
    def sanitize_header_text(cls, value: str) -> str:
        if not isinstance(value, str):
            return value
        value = " ".join(value.splitlines()).strip()
        if not value:
            raise ValueError("This field cannot be blank")
        return value