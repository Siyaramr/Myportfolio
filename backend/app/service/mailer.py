import asyncio
import smtplib
import ssl
from email.message import EmailMessage

from app.config import settings
from app.schemas import ContactMessage


class EmailServiceError(Exception):
    def __init__(self, message: str, status_code: int) -> None:
        super().__init__(message)
        self.status_code = status_code


def _deliver_email(
    email: EmailMessage,
    *,
    host: str,
    port: int,
    username: str,
    password: str,
) -> None:
    with smtplib.SMTP(host, port, timeout=15) as smtp:
        smtp.ehlo()
        smtp.starttls(context=ssl.create_default_context())
        smtp.ehlo()
        smtp.login(username, password)
        smtp.send_message(email)


async def send_contact_email(contact: ContactMessage) -> None:
    required_settings = {
        "SMTP_HOST": settings.smtp_host,
        "SMTP_PORT": settings.smtp_port,
        "SMTP_USER": settings.smtp_user,
        "SMTP_PASSWORD": settings.smtp_password,
        "SMTP_FROM_EMAIL": settings.smtp_from_email,
        "CONTACT_TO_EMAIL": settings.contact_to_email,
    }
    missing_settings = [
        name for name, value in required_settings.items() if not value
    ]
    if missing_settings:
        missing = ", ".join(missing_settings)
        raise EmailServiceError(
            f"Contact email service is not configured. Missing settings: {missing}.",
            503,
        )

    smtp_host = settings.smtp_host
    smtp_port = settings.smtp_port
    smtp_username = settings.smtp_user
    smtp_password = settings.smtp_password
    recipient = settings.contact_to_email
    sender = settings.smtp_from_email

    assert smtp_host is not None
    assert smtp_port is not None
    assert smtp_username is not None
    assert smtp_password is not None
    assert recipient is not None
    assert sender is not None

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
        await asyncio.to_thread(
            _deliver_email,
            email,
            host=smtp_host,
            port=smtp_port,
            username=smtp_username,
            password=smtp_password,
        )
    except (smtplib.SMTPException, OSError, TimeoutError) as error:
        raise EmailServiceError(
            "The message could not be sent. Please try again later.",
            502,
        ) from error