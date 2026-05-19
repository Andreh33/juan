/**
 * Datos canónicos del restaurante (NAP, horarios, redes).
 * Cambios aquí se propagan al footer, página /encuentranos, schema.org y meta.
 */

export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface DayHours {
  day: DayKey;
  label: string;
  ranges: ReadonlyArray<readonly [string, string]>;
}

export const RESTAURANT = {
  name: 'El Refugio de A Cabana',
  legalName: '[POR CONFIRMAR — denominación fiscal]',
  nif: '[POR CONFIRMAR]',
  tagline: 'Cocinado en A Cabana. Servido sin prisa.',
  phone: {
    raw: '659633047',
    international: '+34659633047',
    display: '659 633 047',
    tel: 'tel:+34659633047',
  },
  email: 'hola@elrefugiodeacabana.com',
  address: {
    street: 'Calle Pilar, 5',
    locality: 'A Cabana, Ferrol',
    region: 'A Coruña',
    postalCode: '15593',
    country: 'ES',
    full: 'Calle Pilar 5, 15593 A Cabana, Ferrol, A Coruña',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Calle+Pilar+5+A+Cabana+Ferrol',
    appleMapsUrl:
      'https://maps.apple.com/?address=Calle+Pilar+5,+15593+A+Cabana,+Ferrol',
    wazeUrl: 'https://www.waze.com/ul?ll=43.4956%2C-8.2079&navigate=yes',
    coordinates: { lat: 43.4956, lng: -8.2079 },
  },
  hours: [
    { day: 'mon', label: 'Lunes', ranges: [] },
    {
      day: 'tue',
      label: 'Martes',
      ranges: [
        ['13:00', '16:00'],
        ['20:00', '23:00'],
      ],
    },
    {
      day: 'wed',
      label: 'Miércoles',
      ranges: [
        ['13:00', '16:00'],
        ['20:00', '23:00'],
      ],
    },
    {
      day: 'thu',
      label: 'Jueves',
      ranges: [
        ['13:00', '16:00'],
        ['20:00', '23:00'],
      ],
    },
    {
      day: 'fri',
      label: 'Viernes',
      ranges: [
        ['13:00', '16:00'],
        ['20:00', '23:30'],
      ],
    },
    {
      day: 'sat',
      label: 'Sábado',
      ranges: [
        ['13:00', '16:30'],
        ['20:00', '23:30'],
      ],
    },
    { day: 'sun', label: 'Domingo', ranges: [['13:00', '16:30']] },
  ] as const satisfies ReadonlyArray<DayHours>,
  social: {
    instagram: '',
    facebook: '',
  },
  timezone: 'Europe/Madrid',
} as const;

const DAY_INDEX: Record<DayKey, number> = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
};

function timeToMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
}

export interface OpenStatus {
  open: boolean;
  nextChange: { label: string; at: string } | null;
}

/**
 * Calcula si el restaurante está abierto en la hora dada (zona Europe/Madrid simplificada).
 * Para una versión 100% TZ-segura habría que usar Intl; aquí asumimos la hora del cliente.
 */
export function getOpenStatus(now: Date = new Date()): OpenStatus {
  const dayIdx = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const todayKey = (Object.entries(DAY_INDEX).find(([, v]) => v === dayIdx)?.[0] ??
    'mon') as DayKey;
  const today = RESTAURANT.hours.find((h) => h.day === todayKey);

  if (today) {
    for (const [start, end] of today.ranges) {
      const s = timeToMinutes(start);
      const e = timeToMinutes(end);
      if (minutes >= s && minutes < e) {
        return { open: true, nextChange: { label: 'Cerramos a las', at: end } };
      }
      if (minutes < s) {
        return { open: false, nextChange: { label: 'Abrimos a las', at: start } };
      }
    }
  }

  // siguiente día con servicio
  for (let i = 1; i <= 7; i++) {
    const nextIdx = (dayIdx + i) % 7;
    const nextKey = (Object.entries(DAY_INDEX).find(([, v]) => v === nextIdx)?.[0] ??
      'mon') as DayKey;
    const next = RESTAURANT.hours.find((h) => h.day === nextKey);
    if (next && next.ranges.length > 0) {
      const firstRange = next.ranges[0];
      if (!firstRange) continue;
      return {
        open: false,
        nextChange: { label: `Abrimos ${next.label.toLowerCase()} a las`, at: firstRange[0] },
      };
    }
  }
  return { open: false, nextChange: null };
}

export function formatHoursForSchema(): string[] {
  const map: Record<DayKey, string> = {
    mon: 'Mo',
    tue: 'Tu',
    wed: 'We',
    thu: 'Th',
    fri: 'Fr',
    sat: 'Sa',
    sun: 'Su',
  };
  return RESTAURANT.hours.flatMap((d) =>
    d.ranges.map(([from, to]) => `${map[d.day]} ${from}-${to}`),
  );
}
