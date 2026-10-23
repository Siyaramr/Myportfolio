# Backend

The backend receives contact form messages and emails them to you.

## Run locally

From the `backend` folder, run:

```powershell
.\venv\Scripts\Activate.ps1
python -m uvicorn main:app --reload --port 8000
```

The API runs at `http://localhost:8000`. The contact form sends messages to
`POST /api/contact`; `GET /` and `HEAD /` check API health.

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

The application supports both GET and HEAD health requests at `/`. The CORS
middleware wraps the entire ASGI app so allowed origins also receive CORS
headers on 429 and 500 responses.

The frontend is deployed separately to Vercel. Set
`VITE_API_URL=https://<your-render-service>.onrender.com` in the Vercel
frontend project's environment settings and redeploy. Vite embeds this value
at build time. For local development, `frontend/.env.example` uses
`http://localhost:8000`.

## Test the contact endpoint

In PowerShell, replace the URL below with your Render service URL:

```powershell
$api = "https://your-service.onrender.com"
curl.exe -I "$api/"
curl.exe -X POST "$api/api/contact" `
  -H "Content-Type: application/json" `
  -d '{"name":"Example Sender","email":"sender@example.com","subject":"Test message","message":"Testing the contact form","website":""}'
```

A successful POST returns `{"message":"Your message has been sent."}`.
Leaving `website` blank is expected; filling it triggers the honeypot.
