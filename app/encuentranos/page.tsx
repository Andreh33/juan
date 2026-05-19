import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { SectionTitle } from '@/components/primitives/SectionTitle';
import { ButtonLink } from '@/components/primitives/ButtonLink';
import { RESTAURANT } from '@/lib/data/restaurant';
import { MapPreview } from '@/components/encuentranos/MapPreview';
import { CopyAddress } from '@/components/encuentranos/CopyAddress';

export const metadata: Metadata = {
  title: 'Cómo llegar · Calle Pilar 5, A Cabana',
  description:
    'Cómo llegar a El Refugio de A Cabana en Ferrol. Calle Pilar 5, A Cabana. Horarios, teléfono y rutas en Google Maps, Apple Maps y Waze.',
  alternates: { canonical: '/encuentranos' },
};

export default function EncuentranosPage() {
  return (
    <>
      <section className="pt-36 pb-10 md:pt-44">
        <div className="container-refugio max-w-3xl">
          <Eyebrow>· encuéntranos</Eyebrow>
          <SectionTitle as="h1" size="xl" className="mt-6">
            Encuéntranos.
          </SectionTitle>
          <p className="mt-6 text-[length:var(--fs-body-lg)] leading-relaxed text-stone-200">
            {RESTAURANT.address.street} · {RESTAURANT.address.locality}. A 4 km del puerto, a un paseo del Atlántico.
          </p>
        </div>
      </section>

      <section className="pb-[var(--section-y)]">
        <div className="container-refugio grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <MapPreview />
          </div>

          <div className="md:col-span-5 space-y-8">
            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] text-turquoise-200">
                Dirección
              </h2>
              <p className="mt-3 flex items-start gap-2 text-stone-100">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-turquoise-400" />
                <span>
                  {RESTAURANT.address.street}
                  <br />
                  {RESTAURANT.address.postalCode} {RESTAURANT.address.locality}
                  <br />
                  {RESTAURANT.address.region}, {RESTAURANT.address.country}
                </span>
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <ButtonLink size="sm" href={RESTAURANT.address.googleMapsUrl}>
                  Google Maps
                </ButtonLink>
                <ButtonLink size="sm" variant="ghost" href={RESTAURANT.address.appleMapsUrl}>
                  Apple Maps
                </ButtonLink>
                <ButtonLink size="sm" variant="ghost" href={RESTAURANT.address.wazeUrl}>
                  Waze
                </ButtonLink>
              </div>
              <div className="mt-4">
                <CopyAddress address={RESTAURANT.address.full} />
              </div>
            </div>

            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] text-turquoise-200">
                Contacto
              </h2>
              <Link
                href={RESTAURANT.phone.tel}
                className="mt-3 flex items-center gap-2 font-mono tabular text-stone-100 hover:text-turquoise-200"
              >
                <Phone className="h-4 w-4 text-turquoise-400" />
                {RESTAURANT.phone.display}
              </Link>
              <Link
                href={`mailto:${RESTAURANT.email}`}
                className="mt-2 flex items-center gap-2 text-stone-100 hover:text-turquoise-200"
              >
                <Mail className="h-4 w-4 text-turquoise-400" />
                {RESTAURANT.email}
              </Link>
            </div>

            <div id="horarios">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] text-turquoise-200">
                Horarios
              </h2>
              <ul className="mt-3 space-y-1.5 text-sm">
                {RESTAURANT.hours.map((day) => (
                  <li key={day.day} className="flex items-baseline justify-between gap-4">
                    <span className="font-medium text-stone-100">{day.label}</span>
                    <span className="font-mono tabular text-stone-300">
                      {day.ranges.length === 0
                        ? 'Cerrado'
                        : day.ranges.map(([a, b]) => `${a}–${b}`).join(' · ')}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-center gap-2 text-xs text-stone-400">
                <Clock className="h-3.5 w-3.5" />
                Festivos pueden variar. Llámanos si dudas.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
