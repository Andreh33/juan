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
    eyebrow: '01 · El barrio',
    title: 'A Cabana, Ferrol.',
    body: 'Llevamos años poniendo la mesa para los vecinos. Aquí no hay marketing: hay clientes que llegan caminando desde casa y se quedan a charlar antes de pedir.',
    hue: '#0a8478',
    image: '/images/hero/dining-alt.jpg',
    alt: 'Terraza con mesas servidas en luz cálida de atardecer',
  },
  {
    eyebrow: '02 · La compra',
    title: 'Lo que entra hoy.',
    body: 'Pulpo y marisco de la lonja de Ferrol cuando hay. Verdura de proximidad. Carne de gente que conocemos. Si no nos convence, no entra a la cocina.',
    hue: '#a8854f',
    image: '/images/gallery/g06.jpg',
    alt: 'Cuenco humeante con marisco, arroz y caldo de pimentón',
  },
  {
    eyebrow: '03 · La cocina',
    title: 'Adobos largos, fuegos templados.',
    body: 'La zorza descansa con su pimentón. El pulpo se cuece justo antes de salir. El raxo se sella al momento. Nada se acelera porque el reloj corra: cocinamos como en casa.',
    hue: '#d9582a',
    image: '/images/team/cocina.jpg',
    alt: 'Manos del cocinero emplatando un plato con cuidado',
  },
  {
    eyebrow: '04 · La mesa',
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

  return (
    <section
      ref={ref}
      className="relative bg-[color:var(--color-bg-hollow)]"
      style={{ height: `${STORIES.length * 90}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="container-refugio grid w-full gap-12 md:grid-cols-12 md:gap-16">
          {/* —— Media sticky con crossfade —— */}
          <div className="relative md:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] bg-[color:var(--color-bg-base)] shadow-[var(--shadow-lg)]">
              <AnimatePresence mode="sync">
                <motion.div
                  key={current.image}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.image}
                    alt={current.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL={placeholderBlurDataUri(current.hue)}
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(180deg, transparent 30%, rgba(10,22,32,0.55) 100%), radial-gradient(circle at 30% 30%, ${current.hue}33 0%, transparent 55%)`,
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* —— Step indicator —— */}
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                {STORIES.map((_, i) => (
                  <span
                    key={i}
                    aria-hidden
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === activeStep ? 'w-8 bg-turquoise-400' : 'w-3 bg-stone-400/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* —— Texto con crossfade —— */}
          <div className="relative min-h-[320px] md:col-span-6 md:min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col"
              >
                <Eyebrow>{current.eyebrow}</Eyebrow>
                <h3 className="mt-4 font-display text-[length:var(--fs-display-lg)] leading-[1.04]">
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
