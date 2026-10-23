# Backend

The backend receives contact form messages and emails them to you.

## Start the backend

From the `backend` folder, run:

```powershell
.\venv\Scripts\Activate.ps1
python -m uvicorn main:app --reload --port 8001
```

The API runs at `http://127.0.0.1:8001`. The contact form sends messages to
`POST /api/contact`; `GET /` returns `{"status":"ok"}`.

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
local development, use `http://127.0.0.1:8001`. The production frontend uses
`https://myportfolio-backend01.vercel.app` unless `VITE_API_URL` is set.

## Deploy to Vercel

Keep the frontend and backend as separate Vercel projects. Set the backend
project's Root Directory to `backend`; `api/index.py` exposes the FastAPI app
and `vercel.json` routes requests through it. Add the SMTP settings above as
backend environment variables in Vercel, for each environment you deploy.

The API allows browser requests only from `https://siyaram01.vercel.app` and
`http://localhost:5173`. Its contact endpoint accepts `name`, `email`, and
`message`; `subject` is optional. The hidden `website` field is a honeypot.
The frontend's production API URL can be overridden with `VITE_API_URL` in the
frontend project's Vercel environment settings.

## Test the contact endpoint

From PowerShell, send a JSON request with `curl.exe`:

```powershell
curl.exe -X POST http://127.0.0.1:8001/api/contact `
  -H "Content-Type: application/json" `
  -d '{"name":"Example Sender","email":"sender@example.com","subject":"Test message","message":"Testing the contact form","website":""}'
```

A successful request returns `{"message":"Your message has been sent."}`.
Leaving `website` blank is expected; filling it triggers the spam honeypot.
