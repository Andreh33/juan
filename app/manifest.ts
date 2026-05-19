import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'El Refugio de A Cabana',
    short_name: 'El Refugio',
    description: 'Cocina gallega de barrio en A Cabana, Ferrol.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#07111A',
    theme_color: '#0FA493',
    categories: ['food', 'lifestyle', 'restaurants'],
    lang: 'es-ES',
    icons: [
      { src: '/icon', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      {
        name: 'Reservar',
        short_name: 'Reservar',
        description: 'Reservar mesa rápidamente',
        url: '/reservas',
      },
      {
        name: 'Ver carta',
        short_name: 'Carta',
        description: 'Carta del Refugio',
        url: '/carta',
      },
    ],
  };
}
