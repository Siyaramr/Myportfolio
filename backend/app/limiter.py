from slowapi import Limiter
from slowapi.util import get_remote_address
from starlette.requests import Request


def get_client_ip(request: Request) -> str:
    forwarded_for = request.headers.get("x-forwarded-for", "")
    client_ip = forwarded_for.split(",", maxsplit=1)[0].strip()
    return client_ip or get_remote_address(request)


limiter = Limiter(key_func=get_client_ip)
