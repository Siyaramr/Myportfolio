from typing import Annotated

from pydantic import BaseModel, EmailStr, Field, field_validator


class ContactMessage(BaseModel):
    name: Annotated[str, Field(min_length=1, max_length=120)]
    email: EmailStr
    subject: Annotated[str, Field(min_length=1, max_length=200)]
    message: Annotated[str, Field(min_length=1, max_length=10_000)]

    @field_validator("name", "subject")
    @classmethod
    def validate_header_text(cls, value: str) -> str:
        if "\r" in value or "\n" in value:
            raise ValueError("Line breaks are not allowed")
        value = value.strip()
        if not value:
            raise ValueError("This field cannot be blank")
        return value

        