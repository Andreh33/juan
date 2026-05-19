'use client';

import { ArrowRight, Phone } from 'lucide-react';
import { ButtonLink } from '@/components/primitives/ButtonLink';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { SectionTitle } from '@/components/primitives/SectionTitle';
import { RESTAURANT } from '@/lib/data/restaurant';

export function CtaReservas() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-bg-hollow)] py-[var(--section-y)]">
      {/* —— textura de tablones de madera —— */}
      <div aria-hidden className="absolute inset-0 -z-20">
        <div className="texture-wood absolute inset-0 opacity-[0.32]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(7,17,26,0.78) 0%, rgba(7,17,26,0.92) 100%), radial-gradient(ellipse at 20% 30%, rgba(15,164,147,0.18), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(168,133,79,0.22), transparent 60%)',
          }}
        />
      </div>

      {/* —— viga superior e inferior —— */}
      <div aria-hidden className="divider-wood absolute inset-x-0 top-0 h-2" />
      <div aria-hidden className="divider-wood absolute inset-x-0 bottom-0 h-2 rotate-180" />

      <div className="container-refugio relative">
        <div className="flex max-w-4xl flex-col gap-6">
          <Eyebrow>· te esperamos</Eyebrow>
          <SectionTitle as="h2" size="xl">
            Pon la mesa<br />
            <span className="italic text-wood-100">con nosotros.</span>
          </SectionTitle>
          <p className="max-w-2xl text-[length:var(--fs-body-lg)] leading-relaxed text-stone-100">
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
