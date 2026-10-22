# Backend

The backend receives contact form messages and emails them to you.

## Start the backend

From the `backend` folder, run:

```powershell
.\venv\Scripts\Activate.ps1
python -m uvicorn main:app --reload
```

The API runs at `http://127.0.0.1:8001`. The contact form sends messages to
`POST /api/contact`.

## Set up email

Copy `.env.example` to `.env` and set `SMTP_PASSWORD` to a Google App Password.
Gmail requires 2-Step Verification to create an App Password; use the App
Password, not the account's regular password. Keep `.env` private and do not
share or commit it. For a deployed backend, add the same values as environment
variables in the hosting provider's secret/configuration settings. The backend
loads `.env` from the `backend` folder regardless of the current directory.

Install the backend packages from the repository root:

```powershell
python -m pip install -r backend\requirements.txt
```

If you are already in the `backend` folder, use `python -m pip install -r requirements.txt`.

The API sends mail using `smtplib` over STARTTLS on port `587`, with SMTP work
run off the async event loop. Contact messages are delivered to the configured
`CONTACT_TO_EMAIL` address, and replies go to the sender of the contact form.
Requests are limited to five per minute per IP.

Start the frontend separately from the `frontend` folder with `npm run dev`.
Set `VITE_API_URL` in the frontend environment to the backend base URL; for
local development, use `http://127.0.0.1:8001`.

## Test the contact endpoint

From PowerShell, send a JSON request with `curl.exe`:

```powershell
curl.exe -X POST http://127.0.0.1:8001/api/contact `
  -H "Content-Type: application/json" `
  -d '{"name":"Example Sender","email":"sender@example.com","subject":"Test message","message":"Testing the contact form","website":""}'
```

A successful request returns `{"message":"Your message has been sent."}`.
Leaving `website` blank is expected; filling it triggers the spam honeypot.
