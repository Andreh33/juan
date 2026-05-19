import type { Metadata } from 'next';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { SectionTitle } from '@/components/primitives/SectionTitle';
import { ReservaForm } from '@/components/reservas/ReservaForm';

export const metadata: Metadata = {
  title: 'Reservar mesa',
  description:
    'Reserva tu mesa en El Refugio de A Cabana. Cocina gallega en Ferrol. Calle Pilar 5. Teléfono 659 633 047.',
  alternates: { canonical: '/reservas' },
};

export default function ReservasPage() {
  return (
    <section className="pt-36 pb-[var(--section-y)] md:pt-44">
      <div className="container-refugio grid gap-16 md:grid-cols-12">
        <header className="md:col-span-5">
          <Eyebrow>· reservas</Eyebrow>
          <SectionTitle as="h1" size="xl" className="mt-6">
            Reservar mesa.
          </SectionTitle>
          <p className="mt-6 text-[length:var(--fs-body-lg)] leading-relaxed text-stone-200">
            Tres pasos. Sin formularios eternos. Si prefieres llamar, mejor —
            siempre tenemos a alguien al otro lado.
          </p>
        </header>
        <div className="md:col-span-7">
          <ReservaForm />
        </div>
      </div>
    </section>
  );
}
