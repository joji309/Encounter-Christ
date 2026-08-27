"""Development proxy for serving the Next.js frontend through Django's port."""

from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from django.conf import settings
from django.http import HttpResponse, HttpResponseServerError


# Headers that describe the proxy connection itself and must not be forwarded.
HOP_BY_HOP_HEADERS = {
    'connection', 'keep-alive', 'proxy-authenticate', 'proxy-authorization',
    'te', 'trailer', 'transfer-encoding', 'upgrade',
}


def next_frontend_proxy(request, path=''):
    """Forward public frontend requests to the local Next.js server in DEBUG."""
    target = f"{settings.NEXT_FRONTEND_URL.rstrip('/')}/{path}"
    if request.META.get('QUERY_STRING'):
        target = f"{target}?{request.META['QUERY_STRING']}"

    # Forward only end-user request metadata that the frontend needs. Keeping
    # hop-by-hop and server-specific headers out avoids confusing Next's
    # development host validation.
    forwarded_headers = {
        'user-agent', 'accept', 'accept-language', 'cookie', 'content-type', 'referer',
        # Next App Router navigation headers (needed for client-side transitions).
        'rsc', 'next-router-state-tree', 'next-router-prefetch', 'next-url',
        'x-nextjs-data', 'purpose',
    }
    headers = {
        key: value for key, value in request.headers.items()
        if key.lower() in forwarded_headers
    }
    # Next's development server validates the Host header. Use its own host
    # while retaining the original host for framework-aware links if needed.
    headers['Host'] = settings.NEXT_FRONTEND_URL.split('://', 1)[-1].rstrip('/')
    body = request.body if request.method not in {'GET', 'HEAD'} else None
    proxy_request = Request(target, data=body, headers=headers, method=request.method)

    try:
        with urlopen(proxy_request, timeout=30) as upstream:
            response = HttpResponse(
                upstream.read(),
                status=upstream.status,
                content_type=upstream.headers.get_content_type(),
            )
            for key, value in upstream.headers.items():
                if key.lower() not in HOP_BY_HOP_HEADERS and key.lower() != 'content-type':
                    response[key] = value
            return response
    except HTTPError as error:
        response = HttpResponse(error.read(), status=error.code)
        if error.headers.get('Content-Type'):
            response['Content-Type'] = error.headers['Content-Type']
        return response
    except (URLError, TimeoutError, OSError) as error:
        return HttpResponseServerError(
            f"Next.js frontend is unavailable at {settings.NEXT_FRONTEND_URL}: {error}"
        )
