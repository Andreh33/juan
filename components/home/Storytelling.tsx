'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, AnimatePresence } from 'motion/react';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { placeholderBlurDataUri } from '@/lib/utils/placeholders';

interface Story {
  eyebrow: string;
  title: string;
  body: string;
  hue: string;
  image: string;
  alt: string;
}

const STORIES: ReadonlyArray<Story> = [
  {
    eyebrow: 'El barrio',
    title: 'A Cabana, Ferrol.',
    body: 'Llevamos años poniendo la mesa para los vecinos. Aquí no hay marketing: hay clientes que llegan caminando desde casa y se quedan a charlar antes de pedir.',
    hue: '#0a8478',
    image: '/images/hero/dining-alt.jpg',
    alt: 'Terraza con mesas servidas en luz cálida de atardecer',
  },
  {
    eyebrow: 'La compra',
    title: 'Lo que entra hoy.',
    body: 'Pulpo y marisco de la lonja de Ferrol cuando hay. Verdura de proximidad. Carne de gente que conocemos. Si no nos convence, no entra a la cocina.',
    hue: '#a8854f',
    image: '/images/gallery/g06.jpg',
    alt: 'Cuenco humeante con marisco, arroz y caldo de pimentón',
  },
  {
    eyebrow: 'La cocina',
    title: 'Adobos largos,\nfuegos templados.',
    body: 'La zorza descansa con su pimentón. El pulpo se cuece justo antes de salir. El raxo se sella al momento. Nada se acelera porque el reloj corra: cocinamos como en casa.',
    hue: '#d9582a',
    image: '/images/team/cocina.jpg',
    alt: 'Manos del cocinero emplatando un plato con cuidado',
  },
  {
    eyebrow: 'La mesa',
    title: 'Servido sin prisa.',
    body: 'Si vienes con tiempo, mejor. Aquí no hay turnos cronometrados ni mesas pegadas. Vienes a comer, no a pasar.',
    hue: '#1fbdab',
    image: '/images/gallery/g07.jpg',
    alt: 'Mesa de restaurante servida con copa de vino y plato emplatado',
  },
];

export function Storytelling() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const step = Math.min(
        STORIES.length - 1,
        Math.max(0, Math.floor(v * STORIES.length)),
      );
      setActiveStep((current) => (current === step ? current : step));
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const current = STORIES[activeStep] ?? STORIES[0];
  if (!current) return null;
  const stepDisplay = String(activeStep + 1).padStart(2, '0');
  const totalDisplay = String(STORIES.length).padStart(2, '0');

  return (
    <section
      ref={ref}
      className="relative bg-[color:var(--color-bg-hollow)]"
      style={{ height: `${STORIES.length * 90}vh` }}
    >
      {/* —— textura de piedra de fondo —— */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="texture-stone absolute inset-0 opacity-[0.07]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(11,26,36,0.85) 0%, rgba(7,17,26,0.95) 100%)',
          }}
        />
      </div>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* —— Número de paso gigante de fondo —— */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={stepDisplay}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.045, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(20rem,40vw,42rem)] font-medium leading-none text-stone-100 [font-variation-settings:'wonk'_1]"
            >
              {stepDisplay}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="container-refugio relative z-10 grid w-full gap-10 md:grid-cols-12 md:gap-12">
          {/* —— Image —— */}
          <div className="relative md:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] bg-[color:var(--color-bg-base)] shadow-[var(--shadow-lg)] md:aspect-[5/6]">
              <AnimatePresence mode="sync">
                <motion.div
                  key={current.image}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1 }}
                  transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.image}
                    alt={current.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 58vw"
                    placeholder="blur"
                    blurDataURL={placeholderBlurDataUri(current.hue)}
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(180deg, transparent 40%, rgba(10,22,32,0.65) 100%), radial-gradient(circle at 20% 20%, ${current.hue}3b 0%, transparent 60%)`,
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* —— overlay bottom-left: paso eyebrow + bullets —— */}
              <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between gap-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.eyebrow}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-3 rounded-full bg-[color:var(--color-bg-deep)]/70 px-3.5 py-1.5 backdrop-blur"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-turquoise-200">
                      {current.eyebrow}
                    </span>
                  </motion.div>
                </AnimatePresence>
                <div className="flex items-center gap-1.5">
                  {STORIES.map((_, i) => (
                    <span
                      key={i}
                      aria-hidden
                      className={`h-1 rounded-full transition-all duration-500 ${
                        i === activeStep ? 'w-8 bg-turquoise-400' : 'w-3 bg-stone-200/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* —— Text —— */}
          <div className="relative flex min-h-[260px] flex-col justify-center md:col-span-5 md:min-h-[460px]">
            <span className="font-mono text-sm tabular text-stone-400">
              <span className="text-turquoise-300">{stepDisplay}</span>
              <span className="mx-2 text-stone-500">/</span>
              <span>{totalDisplay}</span>
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 flex flex-col"
              >
                <Eyebrow>{`· ${current.eyebrow.toLowerCase()}`}</Eyebrow>
                <h3 className="mt-4 whitespace-pre-line font-display text-[length:var(--fs-display-lg)] leading-[1.04]">
                  {current.title}
                </h3>
                <p className="mt-6 max-w-md text-[length:var(--fs-body-lg)] leading-relaxed text-stone-100/90">
                  {current.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
