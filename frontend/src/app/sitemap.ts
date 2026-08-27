import { MetadataRoute } from 'next';
import { INITIAL_MIRACLES } from '@/data/miraclesData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://encounterchrist.vercel.app';

  const staticPages = [
    '',
    '/miracles',
    '/science',
    '/return-home',
    '/adoration',
    '/prayers',
    '/apologetics',
    '/share',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const miraclePages = INITIAL_MIRACLES.map((m) => ({
    url: `${baseUrl}/miracles/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...miraclePages];
}
