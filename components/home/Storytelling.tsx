'use client';

import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useRef } from 'react';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

const STORIES = [
  {
    eyebrow: '01 · El barrio',
    title: 'A Cabana, Ferrol.',
    body: 'Llevamos años poniendo la mesa para los vecinos. Aquí no hay marketing: hay clientes que llegan caminando desde casa y se quedan a charlar antes de pedir.',
    hue: '#0a8478',
  },
  {
    eyebrow: '02 · La compra',
    title: 'Lo que entra hoy.',
    body: 'Pulpo y marisco de la lonja de Ferrol cuando hay. Verdura de proximidad. Carne de gente que conocemos. Si no nos convence, no entra a la cocina.',
    hue: '#a8854f',
  },
  {
    eyebrow: '03 · La cocina',
    title: 'Adobos largos, fuegos templados.',
    body: 'La zorza descansa con su pimentón. El pulpo se cuece justo antes de salir. El raxo se sella al momento. Nada se acelera porque el reloj corra: cocinamos como en casa.',
    hue: '#d9582a',
  },
  {
    eyebrow: '04 · La mesa',
    title: 'Servido sin prisa.',
    body: 'Si vienes con tiempo, mejor. Aquí no hay turnos cronometrados ni mesas pegadas. Vienes a comer, no a pasar.',
    hue: '#1fbdab',
  },
] as const;

export function Storytelling() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const activeIndex = useTransform(scrollYProgress, [0, 1], [0, STORIES.length - 1]);

  return (
    <section
      ref={ref}
      className="relative bg-[color:var(--color-bg-hollow)]"
      style={{ height: `${STORIES.length * 90}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="container-refugio grid w-full gap-12 md:grid-cols-12 md:gap-16">
          {/* Media sticky */}
          <div className="relative md:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] bg-[color:var(--color-bg-base)]">
              {STORIES.map((story, i) => (
                <Frame key={i} index={i} hue={story.hue} activeIndex={activeIndex} reduced={reduced} />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-bg-hollow)]/60 via-transparent to-transparent" />
            </div>
          </div>
          {/* Text */}
          <div className="relative md:col-span-6">
            {STORIES.map((story, i) => (
              <TextBlock key={i} index={i} story={story} activeIndex={activeIndex} reduced={reduced} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface FrameProps {
  index: number;
  hue: string;
  activeIndex: MotionValue<number>;
  reduced: boolean;
}

function Frame({ index, hue, activeIndex, reduced }: FrameProps) {
  const opacity = useTransform(activeIndex, (v) => {
    const d = Math.abs(v - index);
    return reduced ? (index === 0 ? 1 : 0) : Math.max(0, 1 - d * 1.2);
  });
  const scale = useTransform(activeIndex, (v) => {
    const d = Math.abs(v - index);
    return reduced ? 1 : 1 + Math.max(0, 0.04 - d * 0.04);
  });

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0"
    >
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <defs>
          <radialGradient id={`fr-${index}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={hue} stopOpacity="0.55" />
            <stop offset="60%" stopColor="#0B1A24" />
            <stop offset="100%" stopColor="#07111A" />
          </radialGradient>
          <filter id={`grain-${index}`}>
            <feTurbulence baseFrequency="0.9" numOctaves="2" />
            <feColorMatrix values="0 0 0 0 0.9, 0 0 0 0 0.85, 0 0 0 0 0.78, 0 0 0 0.15 0" />
          </filter>
        </defs>
        <rect width="400" height="500" fill={`url(#fr-${index})`} />
        <circle cx="200" cy="240" r="140" fill={hue} opacity="0.18" />
        <circle cx="200" cy="240" r="90" fill={hue} opacity="0.35" />
        <rect width="400" height="500" filter={`url(#grain-${index})`} opacity="0.5" />
      </svg>
    </motion.div>
  );
}

interface TextBlockProps {
  index: number;
  story: (typeof STORIES)[number];
  activeIndex: MotionValue<number>;
  reduced: boolean;
}

function TextBlock({ index, story, activeIndex, reduced }: TextBlockProps) {
  const opacity = useTransform(activeIndex, (v) => {
    const d = Math.abs(v - index);
    return reduced ? (index === 0 ? 1 : 0.3) : Math.max(0, 1 - d * 1.6);
  });
  const y = useTransform(activeIndex, (v) => {
    if (reduced) return 0;
    const d = v - index;
    return -d * 24;
  });

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <Eyebrow>{story.eyebrow}</Eyebrow>
      <h3 className="mt-4 font-display text-[length:var(--fs-display-lg)] leading-[1.04]">
        {story.title}
      </h3>
      <p className="mt-6 max-w-md text-[length:var(--fs-body-lg)] leading-relaxed text-stone-200">
        {story.body}
      </p>
    </motion.div>
  );
}
