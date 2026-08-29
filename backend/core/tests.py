from django.contrib.auth import get_user_model
from django.test import TestCase, override_settings

from .models import Miracle


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
