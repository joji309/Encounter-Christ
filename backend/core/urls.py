from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet,
    SiteStatusView,
    MiracleViewSet,
    PrayerIntentionViewSet,
    TestimonyViewSet,
    DailyReflectionViewSet,
    ApologeticsTopicViewSet,
    EventViewSet,
    OverviewStatsView,
)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'miracles', MiracleViewSet, basename='miracle')
router.register(r'prayers', PrayerIntentionViewSet, basename='prayer')
router.register(r'testimonies', TestimonyViewSet, basename='testimony')
router.register(r'reflections', DailyReflectionViewSet, basename='reflection')
router.register(r'apologetics', ApologeticsTopicViewSet, basename='apologetic')
router.register(r'events', EventViewSet, basename='event')

urlpatterns = [
    path('site-status/', SiteStatusView.as_view(), name='site-status'),
    path('', include(router.urls)),
    path('stats/', OverviewStatsView.as_view(), name='overview-stats'),
]
