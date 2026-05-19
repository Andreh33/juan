import type { Metadata } from 'next';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { SectionTitle } from '@/components/primitives/SectionTitle';
import { RESTAURANT } from '@/lib/data/restaurant';

export const metadata: Metadata = {
  title: 'Aviso legal',
  description: 'Aviso legal e información general de El Refugio de A Cabana.',
  alternates: { canonical: '/aviso-legal' },
};

export default function AvisoLegalPage() {
  return (
    <article className="pt-36 pb-[var(--section-y)] md:pt-44">
      <div className="container-refugio max-w-3xl space-y-8">
        <header>
          <Eyebrow>· legal</Eyebrow>
          <SectionTitle as="h1" size="lg" className="mt-6">
            Aviso legal.
          </SectionTitle>
        </header>

        <section className="space-y-3">
          <h2 className="font-display text-[length:var(--fs-h3)]">Titular del sitio web</h2>
          <p className="text-stone-200">
            Denominación: {RESTAURANT.legalName}<br />
            NIF: {RESTAURANT.nif}<br />
            Domicilio: {RESTAURANT.address.full}<br />
            Teléfono: {RESTAURANT.phone.display}<br />
            Email: {RESTAURANT.email}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[length:var(--fs-h3)]">Objeto</h2>
          <p>
            El presente aviso legal regula el uso del sitio web elrefugiodeacabana.com en
            cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información y Comercio
            Electrónico (LSSI-CE).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[length:var(--fs-h3)]">Propiedad intelectual</h2>
          <p>
            Los contenidos (textos, imágenes, diseño, código) son titularidad del responsable o de
            terceros que han autorizado su uso. Queda prohibida su reproducción total o parcial sin
            autorización expresa.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[length:var(--fs-h3)]">Responsabilidad</h2>
          <p>
            El responsable no se hace cargo de los posibles daños derivados del uso indebido del
            sitio web, ni de la información publicada por terceros enlazados.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[length:var(--fs-h3)]">Legislación aplicable</h2>
          <p>
            La relación entre el responsable y los usuarios se rige por la legislación española.
            Los tribunales competentes serán los de Ferrol (A Coruña).
          </p>
        </section>
      </div>
    </article>
  );
}
