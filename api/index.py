import os
import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parent.parent / 'backend'
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

from config.wsgi import application

def app(environ, start_response):
    path = environ.get('PATH_INFO', '')
    if path == '/admin' or path.startswith('/admin/') or path == '/api' or path.startswith('/api/'):
        if not path.endswith('/'):
            environ['PATH_INFO'] = f'{path}/'
    return application(environ, start_response)
