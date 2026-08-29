from django.utils import timezone
from django.db.models import F
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Category, Miracle, PrayerIntention, Testimony, DailyReflection, ApologeticsTopic, Event
from .serializers import (
    CategorySerializer,
    MiracleListSerializer,
    MiracleDetailSerializer,
    PrayerIntentionSerializer,
    TestimonySerializer,
    DailyReflectionSerializer,
    ApologeticsTopicSerializer,
    EventSerializer,
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'


class MiracleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Miracle.objects.all()
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return MiracleDetailSerializer
        return MiracleListSerializer

    def get_queryset(self):
        queryset = Miracle.objects.all()
        category = self.request.query_params.get('category')
        century = self.request.query_params.get('century')
        search = self.request.query_params.get('search')
        featured = self.request.query_params.get('featured')

        if category:
            queryset = queryset.filter(category__slug=category)
        if century:
            queryset = queryset.filter(century__icontains=century)
        if featured and featured.lower() == 'true':
            queryset = queryset.filter(is_featured=True)
        if search:
            queryset = queryset.filter(
                title__icontains=search
            ) | queryset.filter(
                location_city__icontains=search
            ) | queryset.filter(
                location_country__icontains=search
            ) | queryset.filter(
                summary__icontains=search
            )
        return queryset

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Increment view count
        Miracle.objects.filter(pk=instance.pk).update(views_count=F('views_count') + 1)
        instance.refresh_from_db()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class PrayerIntentionViewSet(viewsets.ModelViewSet):
    queryset = PrayerIntention.objects.filter(is_approved=True)
    serializer_class = PrayerIntentionSerializer
    http_method_names = ['get', 'post', 'head', 'options']

    def get_queryset(self):
        queryset = PrayerIntention.objects.filter(is_approved=True)
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)
        return queryset

    @action(detail=True, methods=['post'])
    def pray(self, request, pk=None):
        """Endpoint to increment intercession count when someone taps 'I Prayed For You'"""
        intention = self.get_object()
        PrayerIntention.objects.filter(pk=intention.pk).update(prayers_count=F('prayers_count') + 1)
        intention.refresh_from_db()
        return Response({
            'status': 'success',
            'prayers_count': intention.prayers_count,
            'message': 'Your prayer has been lifted for this intention.'
        })


class TestimonyViewSet(viewsets.ModelViewSet):
    queryset = Testimony.objects.filter(is_approved=True)
    serializer_class = TestimonySerializer
    http_method_names = ['get', 'post', 'head', 'options']


class DailyReflectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DailyReflection.objects.all()
    serializer_class = DailyReflectionSerializer

    @action(detail=False, methods=['get'])
    def today(self, request):
        today = timezone.now().date()
        reflection = DailyReflection.objects.filter(date=today).first()
        if not reflection:
            # Fallback to the latest reflection
            reflection = DailyReflection.objects.first()
        if reflection:
            serializer = self.get_serializer(reflection)
            return Response(serializer.data)
        return Response({'detail': 'No reflection available for today.'}, status=status.HTTP_404_NOT_FOUND)


class ApologeticsTopicViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ApologeticsTopic.objects.all()
    serializer_class = ApologeticsTopicSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        queryset = ApologeticsTopic.objects.all()
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)
        return queryset


class EventViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = EventSerializer

    def get_queryset(self):
        queryset = Event.objects.filter(is_published=True)
        month = self.request.query_params.get('month')
        if month:
            try:
                year, month_number = month.split('-')
                queryset = queryset.filter(event_date__year=int(year), event_date__month=int(month_number))
            except (ValueError, TypeError):
                pass
        return queryset


class OverviewStatsView(APIView):
    def get(self, request):
        total_miracles = Miracle.objects.count()
        total_prayers = sum(p.prayers_count for p in PrayerIntention.objects.all())
        total_testimonies = Testimony.objects.filter(is_approved=True).count()
        featured_miracles = Miracle.objects.filter(is_featured=True).count()

        return Response({
            'total_miracles': total_miracles,
            'total_prayers': total_prayers,
            'total_testimonies': total_testimonies,
            'featured_miracles': featured_miracles,
        })
class SiteStatusView(APIView):
    def get(self, request):
        settings = SiteSettings.objects.first()
        return Response({
            'maintenance_mode': settings.maintenance_mode if settings else False,
            'maintenance_message': settings.maintenance_message if settings else '',
        })

