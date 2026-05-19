import type { Metadata } from 'next';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { SectionTitle } from '@/components/primitives/SectionTitle';
import { MenuClient } from '@/components/menu/MenuClient';

export const metadata: Metadata = {
  title: 'Carta · Pulpo, raxo, tortilla y más',
  description:
    'Carta de El Refugio de A Cabana. Cocina gallega de barrio: pulpo, raxo al queso, zorza, tortilla, ensalada campera, combinados y helados artesanos.',
  alternates: { canonical: '/carta' },
};

export default function CartaPage() {
  return (
    <>
      <section className="relative pt-36 pb-12 md:pt-44">
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
          <div className="texture-wood absolute inset-x-0 top-0 h-48 opacity-[0.14]" />
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[color:var(--color-bg-deep)]/30 via-[color:var(--color-bg-deep)]/80 to-[color:var(--color-bg-deep)]" />
        </div>
        <div aria-hidden className="divider-wood absolute inset-x-0 top-0 h-1.5" />
        <div className="container-refugio max-w-3xl">
          <Eyebrow>· la carta</Eyebrow>
          <SectionTitle as="h1" size="xl" className="mt-6">
            La Carta.
          </SectionTitle>
          <p className="mt-6 text-[length:var(--fs-body-lg)] leading-relaxed text-stone-100">
            Una carta corta a propósito. Lo que hay, está bueno. Lo que no, no lo servimos.
          </p>
        </div>
      </section>

      <MenuClient />
    </>
  );
}
