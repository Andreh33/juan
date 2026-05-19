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
      <section className="pt-36 pb-12 md:pt-44">
        <div className="container-refugio max-w-3xl">
          <Eyebrow>· la carta</Eyebrow>
          <SectionTitle as="h1" size="xl" className="mt-6">
            La Carta.
          </SectionTitle>
          <p className="mt-6 text-[length:var(--fs-body-lg)] leading-relaxed text-stone-200">
            Una carta corta a propósito. Lo que hay, está bueno. Lo que no, no lo servimos.
          </p>
        </div>
      </section>

      <MenuClient />
    </>
  );
}
