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
Set `VITE_API_URL` in the frontend environment to the backend base URL. For
local development, use `http://127.0.0.1:8001`; for production, use
`https://myportfolio-yb3k.vercel.app`. The frontend does not use a production
fallback: `VITE_API_URL` must be set in Vercel and the frontend redeployed.

## Deploy to Vercel

Keep the frontend and backend as separate Vercel projects. Set the backend
project's Root Directory to `backend`. The backend exports the FastAPI
application from `main.py`; do not add a `vercel.json` rewrite or an `api/`
folder to the backend project. Add the SMTP settings above as backend
environment variables in Vercel, for each environment you deploy.

Set `VITE_API_URL=https://myportfolio-yb3k.vercel.app` in the frontend Vercel
project and redeploy. Vite embeds `VITE_` variables at build time.

The backend reads these optional environment variables at startup and checks
them only when a contact message is sent: `SMTP_HOST`, `SMTP_PORT`,
`SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM_EMAIL`, and `CONTACT_TO_EMAIL`.
Missing or invalid mail settings do not prevent the app from starting; a send
attempt returns a JSON 500 error if email is not configured. The frontend reads
`VITE_API_URL`.

The API allows browser requests only from `https://siyaram01.vercel.app` and
`http://localhost:5173`. Its contact endpoint accepts `name`, `email`, and
`message`; `subject` is optional. The hidden `website` field is a honeypot.
The production API URL is configured only through `VITE_API_URL` in the
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
