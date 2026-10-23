# Backend

The backend receives contact form messages and emails them to you.

## Run locally

From the `backend` folder, run:

```powershell
.\venv\Scripts\Activate.ps1
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

The API runs at `http://127.0.0.1:8000`. The contact form sends messages to
`POST /api/contact`; `GET /` and `HEAD /` check API health.
When running the frontend with Vite at `http://localhost:5173`, it connects to
this local API by default. Keep the backend running while testing the form.

## Email configuration

Copy `.env.example` to `.env` and set `SMTP_PASSWORD` to a Google App Password.
Gmail requires 2-Step Verification to create an App Password; use the App
Password, not the account's regular password. Keep `.env` private and do not
share or commit it. The backend loads `.env` from the `backend` folder.

The API sends mail using Python's standard-library `smtplib` over STARTTLS on
port `587`, with SMTP work run off the async event loop. Contact messages are
delivered to `CONTACT_TO_EMAIL`, and replies go to the sender of the form.
Requests are limited to five per minute per client IP.

The backend reads these environment variables: `SMTP_HOST`, `SMTP_PORT`,
`SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM_EMAIL`, `CONTACT_TO_EMAIL`, and
`FRONTEND_ORIGINS`. SMTP variables are optional during startup. If SMTP
configuration is missing or invalid, a send attempt returns a clean JSON 500
response. SMTP credentials are never logged or returned in API errors.

`FRONTEND_ORIGINS` is a comma-separated list. Whitespace and trailing slashes
are trimmed from each origin before it is passed to CORS middleware. For
example:

```text
https://siyaram01.vercel.app,http://localhost:5173
```

## Deploy backend to Render

Create a Render Web Service with `backend` as the Root Directory:

- Build Command: `pip install -r requirements.txt`
- Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT --proxy-headers --forwarded-allow-ips="*"`
- Environment variable: `PYTHON_VERSION=3.12.8`

Set these environment variables in the Render dashboard before using the
contact form:

- `FRONTEND_ORIGINS`: `https://siyaram01.vercel.app,http://localhost:5173`
- `SMTP_HOST`: `smtp.gmail.com`
- `SMTP_PORT`: `587`
- `SMTP_USER`: the Gmail account used to send messages
- `SMTP_PASSWORD`: that account's Google App Password (never its regular
  password)
- `SMTP_FROM_EMAIL`: the sender address, normally the same Gmail account
- `CONTACT_TO_EMAIL`: the inbox that should receive contact messages

Keep SMTP credentials configured as Render environment variables, not in
source control.

The application supports both GET and HEAD health requests at `/`. The CORS
middleware wraps the entire ASGI app so allowed origins also receive CORS
headers on 429 and 500 responses.

The frontend is deployed separately to Vercel. Its production API URL is
`https://myportfoliob-six.vercel.app`, configured in
`frontend/src/sections/contact.tsx` as the production fallback. Vercel's
Production environment can override it by setting `VITE_API_URL` to the same
backend URL; redeploy after changing the setting because Vite embeds it at
build time. For local development, `frontend/.env.example` uses
`http://localhost:8000`.

The frontend production origin must be included in the backend's
`FRONTEND_ORIGINS` environment variable. Add any Vercel preview or custom
domains as needed.

## Test the contact endpoint

In PowerShell, use the deployed backend URL:

```powershell
$api = "https://myportfoliob-six.vercel.app"
curl.exe -I "$api/"
curl.exe -X POST "$api/api/contact" `
  -H "Content-Type: application/json" `
  -d '{"name":"Example Sender","email":"sender@example.com","subject":"Test message","message":"Testing the contact form","website":""}'
```

A successful POST returns `{"message":"Your message has been sent."}`.
Leaving `website` blank is expected; filling it triggers the honeypot.
