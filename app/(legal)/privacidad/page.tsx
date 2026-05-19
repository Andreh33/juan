import type { Metadata } from 'next';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { SectionTitle } from '@/components/primitives/SectionTitle';
import { RESTAURANT } from '@/lib/data/restaurant';

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Política de privacidad de El Refugio de A Cabana — tratamiento de datos personales.',
  alternates: { canonical: '/privacidad' },
};

export default function PrivacidadPage() {
  return (
    <article className="pt-36 pb-[var(--section-y)] md:pt-44">
      <div className="container-refugio max-w-3xl space-y-8">
        <header>
          <Eyebrow>· legal</Eyebrow>
          <SectionTitle as="h1" size="lg" className="mt-6">
            Política de privacidad.
          </SectionTitle>
        </header>

        <section className="space-y-3">
          <h2 className="font-display text-[length:var(--fs-h3)]">Responsable</h2>
          <p>
            {RESTAURANT.legalName}<br />
            {RESTAURANT.address.full}<br />
            Email: {RESTAURANT.email}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[length:var(--fs-h3)]">Datos que tratamos</h2>
          <p>
            Cuando reservas mesa a través del formulario, tratamos: nombre, teléfono, email, fecha
            y hora de reserva, número de comensales y notas adicionales que decidas comunicarnos
            (alergias, ocasión, etc.).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[length:var(--fs-h3)]">Finalidad</h2>
          <ul className="list-disc space-y-1 pl-5 text-stone-200">
            <li>Gestionar tu reserva y comunicarnos contigo en caso necesario.</li>
            <li>Atender consultas y resolver incidencias.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[length:var(--fs-h3)]">Base legal</h2>
          <ul className="list-disc space-y-1 pl-5 text-stone-200">
            <li>Ejecución de un acuerdo precontractual (art. 6.1.b RGPD).</li>
            <li>Interés legítimo en organizar el aforo del local (art. 6.1.f RGPD).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[length:var(--fs-h3)]">Destinatarios</h2>
          <p>
            Tus datos no se cederán a terceros salvo obligación legal. El email de notificación de
            reserva se procesa mediante Resend bajo cláusulas contractuales tipo aprobadas por la
            Comisión Europea.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[length:var(--fs-h3)]">Conservación</h2>
          <p>
            Conservamos los datos de reserva durante 6 meses desde la fecha de la reserva, salvo
            obligación legal de conservación superior.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-[length:var(--fs-h3)]">Derechos</h2>
          <p>
            Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación,
            portabilidad y a no ser objeto de decisiones automatizadas escribiéndonos a{' '}
            <a href={`mailto:${RESTAURANT.email}`} className="link-underline">
              {RESTAURANT.email}
            </a>
            . Puedes también reclamar ante la AEPD (www.aepd.es).
          </p>
        </section>
      </div>
    </article>
  );
}
