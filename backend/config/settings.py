"""
Django settings for Encounter Christ project.
"""

import os
from pathlib import Path
import dj_database_url
from dotenv import load_dotenv
from django.core.exceptions import ImproperlyConfigured

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / '.env')

# Quick-start development settings - unsuitable for production
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-encounter-christ-faith-platform-key-2026')

DEBUG = os.environ.get('DEBUG', 'False').lower() == 'true'
APPEND_SLASH = False

ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '*').split(',')

# The public development URL is Django; Next.js renders behind this proxy.
NEXT_FRONTEND_URL = os.environ.get('NEXT_FRONTEND_URL', 'http://127.0.0.1:3000')

# Application definition
INSTALLED_APPS = [
    # jazzmin MUST come before django.contrib.admin
    'jazzmin',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third-party apps
    'rest_framework',
    'corsheaders',
    
    # Local apps
    'core',
]

# Add cloudinary if credentials exist
CLOUDINARY_CLOUD_NAME = os.environ.get('CLOUDINARY_CLOUD_NAME')
CLOUDINARY_API_KEY = os.environ.get('CLOUDINARY_API_KEY')
CLOUDINARY_API_SECRET = os.environ.get('CLOUDINARY_API_SECRET')

if CLOUDINARY_CLOUD_NAME and CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET:
    INSTALLED_APPS.insert(0, 'cloudinary_storage')
    INSTALLED_APPS.append('cloudinary')
    DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'
    CLOUDINARY_STORAGE = {
        'CLOUD_NAME': CLOUDINARY_CLOUD_NAME,
        'API_KEY': CLOUDINARY_API_KEY,
        'API_SECRET': CLOUDINARY_API_SECRET,
    }

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# Database configuration. Production must use hosted PostgreSQL because
# Vercel's serverless filesystem is ephemeral.
DATABASE_URL = os.environ.get('DATABASE_URL')
if DATABASE_URL:
    DATABASES = {
        'default': dj_database_url.config(
            default=DATABASE_URL,
            conn_max_age=0,
            ssl_require=not DEBUG,
        )
    }
elif DEBUG:
    # Keep SQLite available for local development without a database service.
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
else:
    raise ImproperlyConfigured(
        'DATABASE_URL must be set when DEBUG=False. Configure a hosted PostgreSQL database.'
    )

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static & Media files
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'
STORAGES = {
    'default': {
        'BACKEND': 'django.core.files.storage.FileSystemStorage',
    },
    'staticfiles': {
        'BACKEND': 'django.contrib.staticfiles.storage.StaticFilesStorage',
    },
}

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS settings for Next.js frontend
CORS_ALLOW_ALL_ORIGINS = DEBUG  # Allow all in local dev
_default_cors_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
CORS_ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.environ.get('CORS_ALLOWED_ORIGINS', ','.join(_default_cors_origins)).split(',')
    if origin.strip()
]
CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^https:\/\/.*\.vercel\.app$",
]
CSRF_TRUSTED_ORIGINS = [
    origin.strip()
    for origin in os.environ.get('CSRF_TRUSTED_ORIGINS', ','.join(_default_cors_origins)).split(',')
    if origin.strip()
]

if not DEBUG:
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True

# REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}

# ==============================================================================
# JAZZMIN ADMIN PANEL CONFIGURATION
# ==============================================================================
JAZZMIN_SETTINGS = {
    # ── Title / Branding ──────────────────────────────────────────────────────
    'site_title': 'Encounter Christ',
    'site_header': 'Encounter Christ',
    'site_brand': 'Encounter Christ',
    'welcome_sign': 'Welcome to the Encounter Christ Admin Panel',
    'copyright': 'Encounter Christ Apostolate · Ad Majorem Dei Gloriam',

    # ── Logo ─────────────────────────────────────────────────────────────────
    # Served from core/static/core/img/logo.png
    'site_logo': 'core/img/logo.png',
    'site_logo_classes': 'img-circle',
    'site_icon': 'core/img/logo.png',
    'login_logo': 'core/img/logo.png',
    'login_logo_dark': 'core/img/logo.png',

    # ── Top Navigation Bar ───────────────────────────────────────────────────
    'topmenu_links': [
        # Link to the live website
        {'name': '🌐 View Website', 'url': 'http://localhost:8000', 'new_window': True},
        {'name': '📍 Miracles', 'url': '/admin/core/miracle/', 'permissions': ['core.view_miracle']},
        {'name': '🕯 Prayers', 'url': '/admin/core/prayerintention/', 'permissions': ['core.view_prayerintention']},
        {'name': '📖 Reflections', 'url': '/admin/core/dailyreflection/', 'permissions': ['core.view_dailyreflection']},
    ],

    # ── User Menu (top-right corner) ─────────────────────────────────────────
    'usermenu_links': [
        {'name': '🌐 View Website', 'url': 'http://localhost:8000', 'new_window': True},
    ],

    # ── Sidebar Navigation ───────────────────────────────────────────────────
    'show_sidebar': True,
    'navigation_expanded': True,
    'hide_apps': [],
    'hide_models': [],

    # Custom sidebar icon classes per model (using Font Awesome 5)
    'icons': {
        'auth':                    'fas fa-users-cog',
        'auth.user':               'fas fa-user',
        'auth.group':              'fas fa-users',
        'core.miracle':            'fas fa-church',
        'core.category':           'fas fa-tags',
        'core.prayerintention':    'fas fa-hands-praying',
        'core.testimony':          'fas fa-comment-dots',
        'core.dailyreflection':    'fas fa-book-open',
        'core.apologeticstopic':   'fas fa-shield-alt',
    },
    'default_icon_parents': 'fas fa-chevron-circle-right',
    'default_icon_children': 'fas fa-circle',

    # ── Search ────────────────────────────────────────────────────────────────
    'search_model': ['core.miracle', 'core.prayerintention', 'core.testimony'],

    # ── Related modal pop-ups ─────────────────────────────────────────────────
    'related_modal_active': True,

    # ── UI Tweaks ─────────────────────────────────────────────────────────────
    'show_ui_builder': False,
    'changeform_format': 'horizontal_tabs',
    'changeform_format_overrides': {
        'auth.user': 'collapsible',
        'auth.group': 'vertical_tabs',
    },

    # ── Language Chooser ──────────────────────────────────────────────────────
    'language_chooser': False,
    # Keep the authenticated admin shell in the same warm visual family as the custom login page.
    'custom_css': 'core/css/admin-theme.css',
}

JAZZMIN_UI_TWEAKS = {
    # ── Navbar color scheme ───────────────────────────────────────────────────
    # navbar-white = white top bar; navbar-light = light-colored; text-dark = dark text
    'navbar_small_text': False,
    'footer_small_text': False,
    'body_small_text': False,
    'brand_small_text': False,

    # warm amber/gold navbar to match the Encounter Christ website
    'brand_colour': 'navbar-warning',       # Bootstrap warning = amber/gold
    'accent': 'accent-warning',             # accent links in amber
    'navbar': 'navbar-white navbar-light',  # top bar stays white/light
    'no_navbar_border': False,
    'navbar_fixed': True,                   # sticky top nav

    # ── Sidebar ───────────────────────────────────────────────────────────────
    'sidebar': 'sidebar-light-warning',     # light sidebar with amber active items
    'sidebar_nav_small_text': False,
    'sidebar_disable_expand': False,
    'sidebar_nav_child_indent': True,
    'sidebar_nav_compact_style': False,
    'sidebar_nav_legacy_style': False,
    'sidebar_nav_flat_style': False,
    'sidebar_fixed': True,                  # sticky sidebar

    # ── Theme & Actions ───────────────────────────────────────────────────────
    'theme': 'default',
    # Explicitly use the light palette instead of following the browser's dark-mode preference.
    'default_theme_mode': 'light',
    'button_classes': {
        'primary':   'btn-outline-primary',
        'secondary': 'btn-outline-secondary',
        'info':      'btn-info',
        'warning':   'btn-warning',
        'danger':    'btn-danger',
        'success':   'btn-success',
    },
}
