'use client';

import { ArrowRight, Phone } from 'lucide-react';
import { ButtonLink } from '@/components/primitives/ButtonLink';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { SectionTitle } from '@/components/primitives/SectionTitle';
import { RESTAURANT } from '@/lib/data/restaurant';

export function CtaReservas() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-bg-hollow)] py-[var(--section-y)]">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundImage:
            'repeating-linear-gradient(115deg, rgba(168,133,79,0.06) 0px, rgba(168,133,79,0.06) 2px, transparent 2px, transparent 14px), radial-gradient(circle at 20% 20%, rgba(168,133,79,0.18), transparent 55%), radial-gradient(circle at 85% 80%, rgba(15,164,147,0.12), transparent 60%)',
        }}
      />
      <div className="container-refugio relative">
        <div className="flex max-w-4xl flex-col gap-6">
          <Eyebrow>· te esperamos</Eyebrow>
          <SectionTitle as="h2" size="xl">
            Pon la mesa<br />
            <span className="italic text-stone-200">con nosotros.</span>
          </SectionTitle>
          <p className="max-w-2xl text-[length:var(--fs-body-lg)] leading-relaxed text-stone-200">
            Las mesas se llenan los fines de semana. Si vienes con plan, reserva. Si vienes con suerte, también.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <ButtonLink
              href="/reservas"
              size="lg"
              magnetic
              iconRight={<ArrowRight className="h-4 w-4" />}
            >
              Reservar mesa
            </ButtonLink>
            <ButtonLink
              href={RESTAURANT.phone.tel}
              size="lg"
              variant="ghost"
              iconLeft={<Phone className="h-4 w-4" />}
            >
              Llamar · {RESTAURANT.phone.display}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
