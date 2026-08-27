from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Miracle, PrayerIntention, Testimony, DailyReflection, ApologeticsTopic, Event


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'icon', 'miracle_count']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name', 'description']

    def miracle_count(self, obj):
        return obj.miracles.count()
    miracle_count.short_description = 'Miracles Count'


@admin.register(Miracle)
class MiracleAdmin(admin.ModelAdmin):
    list_display = [
        'title', 'location_city', 'location_country', 'year_occurred',
        'blood_type', 'church_approval', 'is_featured', 'views_count',
        'map_pin_link', 'image_preview',
    ]
    list_filter = ['church_approval', 'is_featured', 'category', 'century', 'white_blood_cells_present']
    search_fields = ['title', 'location_city', 'location_country', 'summary', 'scientific_summary']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['map_coordinate_preview']
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'category', 'location_city', 'location_country', 'year_occurred', 'century', 'is_featured')
        }),
        ('📍 Map Pin Location (Latitude / Longitude)', {
            'description': 'Set the exact geographic coordinates to place this miracle on the Interactive Map on the website. '
                           'Tip: Open Google Maps, right-click the location, and copy the coordinates.',
            'fields': ('latitude', 'longitude', 'map_coordinate_preview'),
        }),
        ('Imagery & Audio', {
            'fields': ('cover_image', 'cover_image_url', 'relic_image_url', 'audio_narration_url')
        }),
        ('Narrative & Story', {
            'fields': ('summary', 'full_story', 'key_spiritual_message', 'scripture_verse')
        }),
        ('Scientific Medical Dossier', {
            'fields': ('scientific_summary', 'blood_type', 'tissue_type', 'white_blood_cells_present', 'forensic_lead_scientist', 'scientific_notes')
        }),
        ('Ecclesiastical Recognition', {
            'fields': ('church_approval', 'views_count')
        }),
    )

    def image_preview(self, obj):
        url = obj.cover_image.url if obj.cover_image else obj.cover_image_url
        if url:
            return format_html('<img src="{}" width="60" height="40" style="object-fit:cover; border-radius:4px;" />', url)
        return "-"
    image_preview.short_description = 'Preview'

    def map_pin_link(self, obj):
        """Show a clickable OSM link so admin can verify the pin location."""
        if obj.latitude and obj.longitude:
            lat = float(obj.latitude)
            lng = float(obj.longitude)
            osm_url = f'https://www.openstreetmap.org/?mlat={lat}&mlon={lng}&zoom=12'
            lat_str = f'{lat:.3f}'
            lng_str = f'{lng:.3f}'
            return format_html(
                '<a href="{}" target="_blank" style="'
                'color:#B45309; font-weight:bold; font-size:12px; '
                'text-decoration:none; background:#FEF3C7; padding:2px 6px; '
                'border-radius:4px; border:1px solid #FCD34D;">'
                '📍 {}, {}</a>',
                osm_url, lat_str, lng_str
            )
        return format_html('<span style="color:#9CA3AF; font-size:11px;">No coordinates set</span>')
    map_pin_link.short_description = 'Map Pin'

    def map_coordinate_preview(self, obj):
        """Embed a live OpenStreetMap tile preview in the change form."""
        if obj.latitude and obj.longitude:
            # Convert to float and round to three decimal places for consistency
            lat = float(obj.latitude)
            lng = float(obj.longitude)
            lat_str = f"{lat:.3f}"
            lng_str = f"{lng:.3f}"
            osm_url = f'https://www.openstreetmap.org/?mlat={lat_str}&mlon={lng_str}&zoom=10'
            static_img = (
                f'https://static-maps.yandex.ru/1.x/?lang=en-US'
                f'&ll={lng_str},{lat_str}&z=10&l=map&size=450,200'
                f'&pt={lng_str},{lat_str},pm2rdm'
            )
            return format_html(
                '<div style="margin-top:8px;">'
                '<p style="font-size:12px; color:#6B7280; margin-bottom:6px;">'
                'Current pin location:</p>'
                '<a href="{}" target="_blank" style="display:inline-block;">'
                '<img src="{}" style="border-radius:8px; border:2px solid #FCD34D; '
                'width:450px; max-width:100%; box-shadow:0 2px 8px rgba(0,0,0,0.1);" '
                'alt="Map preview" onerror="this.style.display=\'none\'"/>'
                '</a>'
                '<br/><a href="{}" target="_blank" style="font-size:11px; color:#B45309; font-weight:bold;">'
                '🔗 View on OpenStreetMap</a>'
                '</div>',
                osm_url, static_img, osm_url
            )
        return format_html(
            '<p style="color:#9CA3AF; font-size:12px; font-style:italic;">'
            'Enter latitude and longitude above to see the map pin preview.</p>'
        )
    map_coordinate_preview.short_description = 'Map Preview'


@admin.register(PrayerIntention)
class PrayerIntentionAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'short_intention', 'prayers_count', 'is_candle_lit', 'is_approved', 'created_at']
    list_filter = ['category', 'is_approved', 'is_candle_lit', 'created_at']
    search_fields = ['name', 'intention_text', 'location']
    actions = ['approve_intentions', 'disapprove_intentions']

    def short_intention(self, obj):
        return obj.intention_text[:60] + "..." if len(obj.intention_text) > 60 else obj.intention_text
    short_intention.short_description = 'Intention'

    def approve_intentions(self, request, queryset):
        queryset.update(is_approved=True)
    approve_intentions.short_description = "Approve selected intentions"

    def disapprove_intentions(self, request, queryset):
        queryset.update(is_approved=False)
    disapprove_intentions.short_description = "Hide selected intentions"


@admin.register(Testimony)
class TestimonyAdmin(admin.ModelAdmin):
    list_display = ['title', 'author_name', 'author_location', 'related_miracle', 'is_approved', 'created_at']
    list_filter = ['is_approved', 'created_at']
    search_fields = ['title', 'author_name', 'story']


@admin.register(DailyReflection)
class DailyReflectionAdmin(admin.ModelAdmin):
    list_display = ['date', 'title', 'saint_name', 'scripture_reference']
    search_fields = ['title', 'saint_name', 'reflection_body', 'scripture_text']
    ordering = ['-date']


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'event_date', 'category', 'location', 'is_published']
    list_filter = ['category', 'is_published', 'event_date']
    search_fields = ['title', 'description', 'location']
    date_hierarchy = 'event_date'
    ordering = ['event_date']


@admin.register(ApologeticsTopic)
class ApologeticsTopicAdmin(admin.ModelAdmin):
    list_display = ['question', 'category', 'order', 'slug']
    list_filter = ['category']
    search_fields = ['question', 'short_answer', 'detailed_explanation']
    prepopulated_fields = {'slug': ('question',)}
    ordering = ['category', 'order']
