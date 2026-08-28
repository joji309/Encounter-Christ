"""
URL configuration for Encounter Christ project.
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from .frontend_proxy import next_frontend_proxy

# Admin branding is configured via JAZZMIN_SETTINGS in settings.py
admin_index = admin.site.admin_view(admin.site.index)

urlpatterns = [
    path('admin/login', admin.site.login),
    path('admin/logout', admin.site.logout),
    path('admin', admin_index),
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    # Keep admin/API ownership in Django; send other public routes to Next.js.
    urlpatterns += [re_path(r'^(?P<path>(?!admin(?:/|$)|api(?:/|$)|static(?:/|$)|media(?:/|$)).*)$', next_frontend_proxy)]
