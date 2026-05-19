import Link from 'next/link';
import { OpenStatusBadge } from '@/components/composed/OpenStatusBadge';

export function HoursStrip() {
  return (
    <section
      aria-label="Estado de apertura"
      className="relative border-y border-wood-700/30 bg-[color:var(--color-bg-hollow)]"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="texture-stone absolute inset-0 opacity-[0.10]" />
      </div>
      <div className="container-refugio flex flex-col items-start justify-between gap-3 py-4 sm:flex-row sm:items-center">
        <OpenStatusBadge compact />
        <Link
          href="/encuentranos#horarios"
          className="link-underline text-xs text-stone-200"
        >
          Ver horarios completos
        </Link>
      </div>
    </section>
  );
}
