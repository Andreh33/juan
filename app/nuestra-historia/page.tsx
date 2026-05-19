import type { Metadata } from 'next';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { SectionTitle } from '@/components/primitives/SectionTitle';
import { Timeline } from '@/components/historia/Timeline';
import { Team } from '@/components/historia/Team';
import { CtaReservas } from '@/components/home/CtaReservas';

export const metadata: Metadata = {
  title: 'Nuestra historia',
  description:
    'La historia de El Refugio de A Cabana. Cocina honesta, mesa de barrio y producto cuidado en el corazón de Ferrol.',
  alternates: { canonical: '/nuestra-historia' },
};

export default function HistoriaPage() {
  return (
    <>
      <section className="relative pt-36 pb-12 md:pt-44">
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
          <div className="texture-wood absolute inset-x-0 top-0 h-56 opacity-[0.12]" />
          <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[color:var(--color-bg-deep)]/40 via-[color:var(--color-bg-deep)]/85 to-[color:var(--color-bg-deep)]" />
        </div>
        <div aria-hidden className="divider-wood absolute inset-x-0 top-0 h-1.5" />
        <div className="container-refugio max-w-3xl">
          <Eyebrow>· nuestra historia</Eyebrow>
          <SectionTitle as="h1" size="xl" className="mt-6">
            Llevamos años poniendo<br />
            <span className="italic text-wood-100">la mesa.</span>
          </SectionTitle>
          <p className="mt-6 text-[length:var(--fs-body-lg)] leading-relaxed text-stone-100">
            Lo nuestro no es reinventar nada: es comprar bien, cocinar despacio y servir caliente.
            Si vienes con hambre y con tiempo, has acertado.
          </p>
        </div>
      </section>

      <Timeline />
      <Team />
      <CtaReservas />
    </>
  );
}
