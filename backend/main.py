import logging

from fastapi import FastAPI
from fastapi import Request
from fastapi.responses import JSONResponse
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from starlette.middleware.cors import CORSMiddleware

from app.config import settings
from app.limiter import limiter
from app.routers.contact import router as contact_router

app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)
app.include_router(contact_router, prefix="/api")


@app.api_route("/", methods=["GET", "HEAD"])
async def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.exception_handler(Exception)
async def handle_unexpected_error(_request: Request, error: Exception) -> JSONResponse:
    logging.getLogger(__name__).error(
        "Unhandled API error",
        exc_info=(type(error), error, error.__traceback__),
    )
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error."},
    )


app = CORSMiddleware(
    app=app,
    allow_origins=settings.allowed_frontend_origins,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)


if __name__ == "__main__":
    import os

    import uvicorn

    uvicorn.run(
        "main:app",
        host=os.environ.get("HOST", "127.0.0.1"),
        port=int(os.environ.get("PORT", 8000)),
    )
