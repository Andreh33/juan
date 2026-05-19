'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Eyebrow } from '@/components/primitives/Eyebrow';

const EVENTS = [
  {
    year: '1980s',
    title: 'A Cabana, barrio que crece.',
    body: 'A Cabana se consolida como barrio vivo de Ferrol, con vecinos del puerto, talleres y familias jóvenes buscando un sitio donde comer sin pretensión.',
  },
  {
    year: 'Apertura',
    title: 'Levantamos las persianas.',
    body: 'El Refugio abre sus puertas en Calle Pilar 5. Carta corta, fuego templado, mantel limpio. Sin invento.',
  },
  {
    year: 'Hoy',
    title: 'La misma mesa, nuevos vecinos.',
    body: 'Seguimos comprando en la lonja, manteniendo el adobo de zorza tal cual y dejando que el pulpo se cueza sin prisa. Lo que cambia es la gente que cruza la puerta — y nos encanta.',
  },
  {
    year: 'Mañana',
    title: 'Lo mismo, mejor.',
    body: 'Sin planes de franquicia. Sin cartas inflables. Solo seguir cocinando como en casa, con producto de aquí y tiempo de sobra.',
  },
] as const;

export function Timeline() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.85], ['0%', '100%']);

  return (
    <section ref={ref} className="py-[var(--section-y)]">
      <div className="container-refugio">
        <div className="relative grid gap-12 md:grid-cols-12">
          <div className="relative md:col-span-1">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[color:var(--color-border-subtle)] md:left-1/2" />
            <motion.div
              className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-turquoise-400 to-turquoise-700"
              style={{ height: lineHeight }}
            />
          </div>
          <ul className="md:col-span-11 flex flex-col gap-16">
            {EVENTS.map((event, i) => (
              <motion.li
                key={event.year}
                initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-6 md:grid-cols-12"
              >
                <div className="md:col-span-3">
                  <Eyebrow>{event.year}</Eyebrow>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-display text-[length:var(--fs-h2)] leading-tight">
                    {event.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-stone-200">{event.body}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
