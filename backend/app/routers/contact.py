from fastapi import APIRouter, HTTPException, Request

from app.limiter import limiter
from app.schemas import ContactMessage
from app.service.mailer import EmailServiceError, send_contact_email

router = APIRouter()


@router.post("/contact")
@limiter.limit("5/minute")
async def submit_contact_message(request: Request, contact: ContactMessage) -> dict[str, str]:
    if contact.website:
        return {"message": "Your message has been sent."}

    try:
        await send_contact_email(contact)
    except EmailServiceError as error:
        raise HTTPException(status_code=error.status_code, detail=str(error)) from error

    return {"message": "Your message has been sent."}

