/**
 * Canonical public URL used for metadata, sitemap entries, and shared links.
 * Configure NEXT_PUBLIC_SITE_URL in Vercel for each production deployment.
 */
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://encounterchrist.online';

export const SITE_URL = configuredSiteUrl.replace(/\/+$/, '');
