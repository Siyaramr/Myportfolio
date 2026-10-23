import logging

from fastapi import FastAPI
from fastapi import Request
from fastapi.responses import JSONResponse
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from starlette.middleware.cors import CORSMiddleware

from app.limiter import limiter
from app.routers.contact import router as contact_router

api = FastAPI()
api.state.limiter = limiter
api.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
api.add_middleware(SlowAPIMiddleware)
api.include_router(contact_router, prefix="/api")


@api.get("/")
async def health_check() -> dict[str, str]:
    return {"status": "ok"}


@api.exception_handler(Exception)
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
    app=api,
    allow_origins=[
        "https://siyaram01.vercel.app",
        "http://localhost:5173",
    ],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)
