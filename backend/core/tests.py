from django.contrib.auth import get_user_model
from django.test import Client, TestCase, override_settings

from .models import Miracle, PrayerIntention


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

    def test_public_submission_is_not_blocked_by_an_admin_session_csrf_check(self):
        """A visitor may submit a prayer even when their browser has an admin session."""
        user = get_user_model().objects.create_superuser(
            username='csrf-admin', email='csrf-admin@example.com', password='test-password'
        )
        csrf_client = Client(enforce_csrf_checks=True)
        csrf_client.force_login(user)

        response = csrf_client.post('/api/prayers/', {
            'name': 'Public Pilgrim',
            'category': 'HEALING',
            'intention_text': 'A prayer that must not be rejected by CSRF.',
        }, content_type='application/json')

        self.assertEqual(response.status_code, 201)
