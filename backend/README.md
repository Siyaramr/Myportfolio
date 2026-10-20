# Backend

The backend receives contact form messages and emails them to you.

## Start the backend

From the `backend` folder, run:

```powershell
.\venv\Scripts\Activate.ps1
python -m uvicorn main:app --reload
```

The API runs at `http://127.0.0.1:8000`. The contact form sends messages to
`POST /api/contact`.

## Set up email

Gmail SMTP is configured in `.env.example` for `ranasiyaram6194@gmail.com`.
Copy it to `.env` and replace `SMTP_PASSWORD` with a Google App Password for
that account. Gmail requires 2-Step Verification to create an App Password;
use the App Password, not the account's regular password. Keep `.env` private
and do not share or commit it. For a deployed backend, add the same values as
environment variables in the hosting provider's secret/configuration settings.

Install the backend packages if needed:

```powershell
python -m pip install -r requirements.txt
```

The API sends email asynchronously using `aiosmtplib`. SMTP port `587` uses
STARTTLS; port `465` uses TLS. Contact messages are delivered to the configured
`CONTACT_TO_EMAIL` address, and replies go to the sender of the contact form.

Start the frontend separately from the `frontend` folder with `npm run dev`.
