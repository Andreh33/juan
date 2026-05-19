'use client';

import { motion } from 'motion/react';
import { placeholderDataUri } from '@/lib/utils/placeholders';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { SectionTitle } from '@/components/primitives/SectionTitle';
import { VIEWPORT_DEFAULT, stagger, fadeUp } from '@/lib/motion/variants';

const TEAM = [
  {
    id: 'cocina',
    name: 'En la cocina',
    role: 'Brazo derecho de la casa',
    quote: 'Lo bueno tarda. Lo bueno se cuece a su tiempo.',
    hue: '#0a8478',
  },
  {
    id: 'sala',
    name: 'En la sala',
    role: 'Quien te conoce por el nombre',
    quote: 'La mesa cuenta con que llegues con hambre y con ganas de charlar.',
    hue: '#a8854f',
  },
  {
    id: 'barra',
    name: 'En la barra',
    role: 'El que sabe lo que pides antes de pedirlo',
    quote: 'El primer vino entra mejor si lo sirvo yo, ¿no?',
    hue: '#d9582a',
  },
] as const;

export function Team() {
  return (
    <section className="bg-[color:var(--color-bg-hollow)] py-[var(--section-y)]">
      <div className="container-refugio">
        <div className="flex flex-col gap-4">
          <Eyebrow>· quienes cocinamos</Eyebrow>
          <SectionTitle as="h2" size="lg">
            Las manos del Refugio.
          </SectionTitle>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_DEFAULT}
          variants={stagger(0.08)}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {TEAM.map((person) => (
            <motion.li
              key={person.id}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-base)]"
            >
              <div className="aspect-[4/5] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element -- placeholder SVG inline */}
                <img
                  src={placeholderDataUri(person.id, person.hue)}
                  alt={`Equipo del Refugio: ${person.name}`}
                  className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:scale-[1.05]"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-[length:var(--fs-h3)] leading-tight">
                  {person.name}
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.24em] text-turquoise-200">
                  {person.role}
                </p>
                <p className="mt-4 italic leading-relaxed text-stone-300">«{person.quote}»</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
