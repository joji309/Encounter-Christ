import os
import sys
from urllib.parse import parse_qsl, urlencode
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parent.parent / 'backend'
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

from config.wsgi import application

def app(environ, start_response):
    query = parse_qsl(environ.get('QUERY_STRING', ''), keep_blank_values=True)
    values = dict(query)
    route = values.pop('route', None)
    forwarded_path = values.pop('path', '')
    if route in {'admin', 'api', 'static', 'media'}:
        path = f'/{route}/{forwarded_path}'.replace('//', '/')
        environ['PATH_INFO'] = path if path.endswith('/') else f'{path}/'
        environ['QUERY_STRING'] = urlencode(values)
    else:
        path = environ.get('PATH_INFO', '')
        if path == '/admin' or path.startswith('/admin/') or path == '/api' or path.startswith('/api/'):
            if not path.endswith('/'):
                environ['PATH_INFO'] = f'{path}/'
    return application(environ, start_response)
