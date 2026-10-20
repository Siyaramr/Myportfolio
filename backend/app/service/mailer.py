import asyncio
from email.message import EmailMessage

import aiosmtplib

from app.config import settings
from app.schemas import ContactMessage


class EmailServiceError(Exception):
    def __init__(self, message: str, status_code: int) -> None:
        super().__init__(message)
        self.status_code = status_code


async def send_contact_email(contact: ContactMessage) -> None:
    smtp_host = settings.smtp_host
    smtp_username = settings.smtp_user
    smtp_password = settings.smtp_password
    recipient = settings.contact_to_email
    sender = settings.smtp_from_email or smtp_username

    if not all((smtp_host, smtp_username, smtp_password, recipient, sender)):
        raise EmailServiceError("Contact email service is not configured.", 503)

    email = EmailMessage()
    email["From"] = sender
    email["To"] = recipient
    email["Reply-To"] = str(contact.email)
    email["Subject"] = contact.subject
    email.set_content(
        f"Name: {contact.name}\n"
        f"Email: {contact.email}\n\n"
        f"{contact.message}"
    )

    try:
        await aiosmtplib.send(
            email,
            hostname=smtp_host,
            port=settings.smtp_port,
            username=smtp_username,
            password=smtp_password,
            use_tls=settings.smtp_port == 465,
            start_tls=settings.smtp_port != 465,
            timeout=15,
        )
    except (aiosmtplib.SMTPException, OSError, asyncio.TimeoutError) as error:
        raise EmailServiceError(
            "The message could not be sent. Please try again later.",
            502,
        ) from error