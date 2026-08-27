from django.db import models
from django.utils.text import slugify

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, default='Sparkles', help_text='Lucide icon name')

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Miracle(models.Model):
    APPROVAL_CHOICES = [
        ('VATICAN', 'Vatican Formally Approved'),
        ('DIOCESAN', 'Diocesan Bishop Approved'),
        ('HISTORICAL', 'Historically Documented & Vetted'),
    ]

    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True, max_length=255)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='miracles')
    
    # Location & Historical date
    location_city = models.CharField(max_length=150)
    location_country = models.CharField(max_length=150)
    year_occurred = models.CharField(max_length=50, help_text="e.g. '750 AD', '1996', '2008'")
    century = models.CharField(max_length=50, default="Modern", help_text="e.g. '8th Century', '20th Century', '21st Century'")
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    # Visual & Media
    cover_image = models.ImageField(upload_to='miracles/', null=True, blank=True)
    cover_image_url = models.URLField(max_length=500, blank=True, help_text="Fallback external URL or Cloudinary URL")
    relic_image_url = models.URLField(max_length=500, blank=True)
    audio_narration_url = models.URLField(max_length=500, blank=True)

    # Narrative Content
    summary = models.TextField(help_text="Concise 2-3 sentence overview for cards and meta descriptions")
    full_story = models.TextField(help_text="Detailed narrative of how the miracle took place")
    
    # Scientific Evidence Dossier
    scientific_summary = models.TextField(help_text="Summary of forensic/medical discoveries")
    blood_type = models.CharField(max_length=50, default="AB+", help_text="e.g. AB Positive (Universal Recipient)")
    tissue_type = models.CharField(max_length=255, default="Myocardium (Left Ventricle Heart Muscle)", help_text="Tissue pathology finding")
    white_blood_cells_present = models.BooleanField(default=True, help_text="Indicates tissue was living / under severe trauma at moment of study")
    forensic_lead_scientist = models.CharField(max_length=255, blank=True, help_text="e.g. Dr. Edoardo Linoli, Dr. Frederic Zugibe (Columbia University)")
    scientific_notes = models.TextField(blank=True, help_text="Additional scientific laboratory observations")

    # Spiritual & Church Validation
    church_approval = models.CharField(max_length=20, choices=APPROVAL_CHOICES, default='VATICAN')
    key_spiritual_message = models.TextField(blank=True)
    scripture_verse = models.CharField(max_length=255, default="John 6:51 - 'I am the living bread that came down from heaven.'")

    # Meta
    is_featured = models.BooleanField(default=False)
    views_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_featured', 'year_occurred']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} ({self.location_city}, {self.location_country})"


class PrayerIntention(models.Model):
    CATEGORY_CHOICES = [
        ('FAITH_RETURN', 'Return to Faith & Family'),
        ('HEALING', 'Physical & Mental Healing'),
        ('FAMILY', 'Marriage & Family Peace'),
        ('VOCATIONS', 'Priesthood & Religious Life'),
        ('PEACE', 'World Peace & Protection'),
        ('THANKSGIVING', 'Thanksgiving & Praise'),
    ]

    name = models.CharField(max_length=100, default='A Fellow Pilgrim')
    location = models.CharField(max_length=100, blank=True, default='')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='FAITH_RETURN')
    intention_text = models.TextField()
    is_candle_lit = models.BooleanField(default=True)
    prayers_count = models.PositiveIntegerField(default=1, help_text="Count of pilgrims who tapped 'I Prayed For You'")
    is_approved = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Intention by {self.name} - {self.get_category_display()}"


class Testimony(models.Model):
    title = models.CharField(max_length=255)
    author_name = models.CharField(max_length=100)
    author_location = models.CharField(max_length=150, blank=True)
    story = models.TextField()
    related_miracle = models.ForeignKey(Miracle, on_delete=models.SET_NULL, null=True, blank=True, related_name='testimonies')
    is_approved = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Testimonies'
        ordering = ['-created_at']

    def __str__(self):
        return f"Testimony: {self.title} by {self.author_name}"


class DailyReflection(models.Model):
    date = models.DateField(unique=True)
    title = models.CharField(max_length=255)
    scripture_reference = models.CharField(max_length=150)
    scripture_text = models.TextField()
    saint_name = models.CharField(max_length=150)
    saint_feast_or_title = models.CharField(max_length=150, blank=True)
    saint_quote = models.TextField()
    reflection_body = models.TextField()
    closing_prayer = models.TextField()

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.date} - {self.title}"


class Event(models.Model):
    CATEGORY_CHOICES = [
        ('FEAST', 'Liturgical Feast'),
        ('ADORATION', 'Eucharistic Adoration'),
        ('PARISH', 'Parish Event'),
        ('PRAYER', 'Prayer & Devotion'),
        ('OTHER', 'Other'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    event_date = models.DateTimeField(db_index=True)
    location = models.CharField(max_length=255, blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='PARISH')
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ['event_date']

    def __str__(self):
        return f"{self.title} — {self.event_date:%d %b %Y}"


class ApologeticsTopic(models.Model):
    CATEGORY_CHOICES = [
        ('EUCHARIST', 'Real Presence in the Eucharist'),
        ('CONFESSION', 'Sacrament of Reconciliation'),
        ('RETURNING', 'Returning to the Catholic Church'),
        ('CHURCH_FATHERS', 'Early Church History & Sacred Tradition'),
        ('MARY_SAINTS', 'Mary, Saints & Intercession'),
        ('BIBLE_CHURCH', 'Scripture & Church Authority'),
    ]

    question = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='EUCHARIST')
    short_answer = models.TextField(help_text="Quick summary / TL;DR")
    detailed_explanation = models.TextField(help_text="Biblical, theological, and logical breakdown")
    scripture_citations = models.TextField(blank=True, help_text="e.g. John 6:51-58, 1 Cor 11:23-29")
    church_fathers_quote = models.TextField(blank=True, help_text="Quotes from St. Ignatius, Justin Martyr, Augustine, etc.")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['category', 'order']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.question[:50])
        super().save(*args, **kwargs)

    def __str__(self):
        return self.question
