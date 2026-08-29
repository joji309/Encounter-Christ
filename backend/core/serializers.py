from rest_framework import serializers
from .models import Category, Miracle, PrayerIntention, Testimony, DailyReflection, ApologeticsTopic, Event, SiteSettings

class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = ('maintenance_mode', 'maintenance_message')


class CategorySerializer(serializers.ModelSerializer):
    miracles_count = serializers.IntegerField(source='miracles.count', read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'icon', 'miracles_count']


class MiracleImageUrlMixin:
    """Prefer the image uploaded through Django admin over a manual URL."""

    cover_image_url = serializers.SerializerMethodField()

    def get_cover_image_url(self, obj):
        if obj.cover_image:
            return obj.cover_image.url
        return obj.cover_image_url

class MiracleListSerializer(MiracleImageUrlMixin, serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Miracle
        fields = [
            'id', 'title', 'slug', 'category', 'category_name',
            'location_city', 'location_country', 'year_occurred', 'century',
            'latitude', 'longitude', 'cover_image_url', 'summary',
            'blood_type', 'tissue_type', 'white_blood_cells_present',
            'church_approval', 'is_featured', 'views_count'
        ]


class MiracleDetailSerializer(MiracleImageUrlMixin, serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Miracle
        fields = '__all__'


class PrayerIntentionSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = PrayerIntention
        fields = [
            'id', 'name', 'location', 'category', 'category_display',
            'intention_text', 'is_candle_lit', 'prayers_count', 'created_at'
        ]
        read_only_fields = ['prayers_count', 'created_at', 'is_approved']


class TestimonySerializer(serializers.ModelSerializer):
    miracle_title = serializers.CharField(source='related_miracle.title', read_only=True)

    class Meta:
        model = Testimony
        fields = [
            'id', 'title', 'author_name', 'author_location',
            'story', 'related_miracle', 'miracle_title', 'created_at'
        ]
        read_only_fields = ['created_at', 'is_approved']


class DailyReflectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyReflection
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'event_date', 'location', 'category', 'category_display', 'is_published']


class ApologeticsTopicSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = ApologeticsTopic
        fields = '__all__'
