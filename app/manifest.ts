import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'El Refugio de A Cabana',
    short_name: 'El Refugio',
    description: 'Cocina gallega de barrio en A Cabana, Ferrol.',
    start_url: '/',
    display: 'standalone',
    background_color: '#07111A',
    theme_color: '#0FA493',
    icons: [
      { src: '/icon', sizes: '512x512', type: 'image/png' },
    ],
  };
}
