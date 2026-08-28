class AdminPathMiddleware:
    """Normalize Vercel's no-slash admin model URLs before URL resolution."""

    exact_paths = {'/admin', '/admin/login', '/admin/logout'}

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        path = request.path_info
        if (path.startswith('/admin/') or path.startswith('/api/')) and not path.endswith('/'):
            normalized_path = f'{path}/'
            request.path_info = normalized_path
            request.META['PATH_INFO'] = normalized_path
        return self.get_response(request)