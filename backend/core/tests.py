from django.contrib.auth import get_user_model
from django.test import TestCase, override_settings

from .models import MediaCategory, MediaItem, PrayerIntention, Miracle


@override_settings(ALLOWED_HOSTS=['testserver'])
class MiracleAdminTests(TestCase):
    def test_change_page_renders_for_clean_url(self):
        """The Jazzmin fieldset must render on Django 5.2."""
        user = get_user_model().objects.create_superuser(
            username='admin', email='admin@example.com', password='test-password'
        )
        miracle = Miracle.objects.create(
            title='Admin Template Test Miracle',
            location_city='Rome',
            location_country='Italy',
            year_occurred='2026',
            summary='A test summary.',
            full_story='A test story.',
            scientific_summary='A test scientific summary.',
        )

        self.client.force_login(user)
        response = self.client.get(f'/admin/core/miracle/{miracle.pk}/change')

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Imagery &amp; Audio')


class PrayerIntentionApiTests(TestCase):
    def test_submitted_intention_is_persisted_and_returned_by_the_wall_api(self):
        payload = {
            'name': 'Prayer Wall Test',
            'location': 'Kerala, India',
            'category': 'HEALING',
            'intention_text': 'Please pray for a lasting regression test.',
        }

        create_response = self.client.post('/api/prayers/', payload, content_type='application/json')

        self.assertEqual(create_response.status_code, 201)
        intention = PrayerIntention.objects.get(name=payload['name'])
        self.assertTrue(intention.is_approved)

        list_response = self.client.get('/api/prayers/')

        self.assertEqual(list_response.status_code, 200)
        listed_ids = [item['id'] for item in list_response.json()['results']]
        self.assertIn(intention.id, listed_ids)


class MediaLibraryApiTests(TestCase):
    def test_only_published_resources_are_available_to_visitors(self):
        category = MediaCategory.objects.create(name='Eucharist')
        published = MediaItem.objects.create(
            title='A Public Catholic Resource', content_type=MediaItem.ContentType.DOCUMENT,
            short_description='A verified resource for visitors.', source_url='https://example.com/resource',
            license_name='Public domain', attribution='Example Archive', status=MediaItem.Status.PUBLISHED,
        )
        published.categories.add(category)
        MediaItem.objects.create(
            title='Unreviewed Resource', content_type=MediaItem.ContentType.MUSIC,
            short_description='Must stay private.', source_url='https://example.com/draft',
            license_name='Permission pending', attribution='Example Artist', status=MediaItem.Status.DRAFT,
        )

        response = self.client.get('/api/library/items/?category=eucharist')

        self.assertEqual(response.status_code, 200)
        resources = response.json()['results']
        self.assertEqual([resource['slug'] for resource in resources], [published.slug])
        self.assertEqual(resources[0]['categories'][0]['name'], 'Eucharist')
