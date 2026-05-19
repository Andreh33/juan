import { RESTAURANT, formatHoursForSchema } from '@/lib/data/restaurant';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://elrefugiodeacabana.com';

export function RestaurantSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE_URL}/#restaurant`,
    name: RESTAURANT.name,
    url: SITE_URL,
    telephone: RESTAURANT.phone.international,
    image: `${SITE_URL}/opengraph-image`,
    priceRange: '€€',
    servesCuisine: ['Galician', 'Spanish', 'Traditional'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: RESTAURANT.address.street,
      addressLocality: RESTAURANT.address.locality,
      addressRegion: RESTAURANT.address.region,
      postalCode: RESTAURANT.address.postalCode,
      addressCountry: RESTAURANT.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: RESTAURANT.address.coordinates.lat,
      longitude: RESTAURANT.address.coordinates.lng,
    },
    openingHours: formatHoursForSchema(),
    acceptsReservations: 'True',
    hasMenu: `${SITE_URL}/carta`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
