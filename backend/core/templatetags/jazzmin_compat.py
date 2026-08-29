"""Compatibility filters required by the installed Jazzmin templates."""

from django import template


register = template.Library()


@register.filter
def length_is(value, expected_length):
    """Restore Django's removed ``length_is`` filter for Jazzmin 3.0.5."""
    try:
        return len(value) == int(expected_length)
    except (TypeError, ValueError):
        return False
