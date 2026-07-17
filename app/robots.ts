import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://etalase-ai.vercel.app';
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/app'],
      disallow: ['/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
