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
    EucharisticPrayerViewSet,
    MediaCategoryViewSet,
    MediaCollectionViewSet,
    MediaItemViewSet,
)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'miracles', MiracleViewSet, basename='miracle')
router.register(r'prayers', PrayerIntentionViewSet, basename='prayer')
router.register(r'testimonies', TestimonyViewSet, basename='testimony')
router.register(r'reflections', DailyReflectionViewSet, basename='reflection')
router.register(r'apologetics', ApologeticsTopicViewSet, basename='apologetic')
router.register(r'events', EventViewSet, basename='event')
router.register(r'eucharistic-prayers', EucharisticPrayerViewSet, basename='eucharistic-prayer')
router.register(r'library/categories', MediaCategoryViewSet, basename='media-category')
router.register(r'library/collections', MediaCollectionViewSet, basename='media-collection')
router.register(r'library/items', MediaItemViewSet, basename='media-item')

urlpatterns = [
    path('site-status/', SiteStatusView.as_view(), name='site-status'),
    path('', include(router.urls)),
    path('stats/', OverviewStatsView.as_view(), name='overview-stats'),
]
