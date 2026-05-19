import Link from 'next/link';
import { OpenStatusBadge } from '@/components/composed/OpenStatusBadge';

export function HoursStrip() {
  return (
    <section
      aria-label="Estado de apertura"
      className="border-y border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-hollow)]"
    >
      <div className="container-refugio flex flex-col items-start justify-between gap-3 py-4 sm:flex-row sm:items-center">
        <OpenStatusBadge compact />
        <Link
          href="/encuentranos#horarios"
          className="link-underline text-xs text-stone-300"
        >
          Ver horarios completos
        </Link>
      </div>
    </section>
  );
}
