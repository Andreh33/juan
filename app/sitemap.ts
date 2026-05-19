import type { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://elrefugiodeacabana.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ['', '/carta', '/nuestra-historia', '/reservas', '/encuentranos', '/aviso-legal', '/privacidad'];
  return routes.map((r) => ({
    url: `${BASE}${r}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: r === '' ? 1 : 0.8,
  }));
}
