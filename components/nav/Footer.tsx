import Link from 'next/link';
import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import { Logo } from '@/components/composed/Logo';
import { RESTAURANT } from '@/lib/data/restaurant';
import { OpenStatusBadge } from '@/components/composed/OpenStatusBadge';

export function Footer() {
  return (
    <footer className="relative mt-[var(--section-y)] border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-hollow)]">
      <div className="container-refugio grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-6 max-w-xs font-display text-lg italic leading-relaxed text-stone-300">
            {RESTAURANT.tagline}
          </p>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-stone-400">
            {new Date().getFullYear()} · A Cabana, Ferrol
          </p>
        </div>

        <div className="md:col-span-3">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-turquoise-200">
            Visítanos
          </h3>
          <a
            href={RESTAURANT.address.googleMapsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-stone-200 hover:text-turquoise-200"
          >
            <MapPin className="mt-1 h-4 w-4 shrink-0 text-turquoise-400" />
            <span>
              {RESTAURANT.address.street}
              <br />
              {RESTAURANT.address.postalCode} {RESTAURANT.address.locality}
            </span>
          </a>
          <div className="mt-4">
            <OpenStatusBadge compact />
          </div>
        </div>

        <div className="md:col-span-3">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-turquoise-200">
            Contacto
          </h3>
          <a
            href={RESTAURANT.phone.tel}
            className="mt-4 flex items-center gap-2 font-mono text-sm tabular text-stone-200 hover:text-turquoise-200"
          >
            <Phone className="h-4 w-4 text-turquoise-400" />
            {RESTAURANT.phone.display}
          </a>
          <a
            href={`mailto:${RESTAURANT.email}`}
            className="mt-3 flex items-center gap-2 text-sm text-stone-200 hover:text-turquoise-200"
          >
            <Mail className="h-4 w-4 text-turquoise-400" />
            {RESTAURANT.email}
          </a>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-border-default)] text-stone-300 hover:border-turquoise-400 hover:text-turquoise-200"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-border-default)] text-stone-300 hover:border-turquoise-400 hover:text-turquoise-200"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-turquoise-200">
            Sitio
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/carta" className="link-underline text-stone-200">Carta</Link>
            </li>
            <li>
              <Link href="/nuestra-historia" className="link-underline text-stone-200">Historia</Link>
            </li>
            <li>
              <Link href="/reservas" className="link-underline text-stone-200">Reservas</Link>
            </li>
            <li>
              <Link href="/encuentranos" className="link-underline text-stone-200">Encuéntranos</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[color:var(--color-border-subtle)]">
        <div className="container-refugio flex flex-col items-start justify-between gap-3 py-6 text-xs text-stone-400 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} El Refugio de A Cabana. Diseñado con cuidado en Galicia.</span>
          <div className="flex items-center gap-5">
            <Link href="/aviso-legal" className="link-underline">Aviso legal</Link>
            <Link href="/privacidad" className="link-underline">Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
