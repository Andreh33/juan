'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, Phone } from 'lucide-react';
import { ButtonLink } from '@/components/primitives/ButtonLink';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Marquee } from '@/components/composed/Marquee';
import { RESTAURANT } from '@/lib/data/restaurant';

const HERO_TEXT = 'Refugio';

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* —— Capa 1: foto real del comedor —— */}
      <div aria-hidden className="absolute inset-0 -z-20">
        <Image
          src="/images/hero/dining-warm.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover object-center"
        />
      </div>

      {/* —— Capa 2: duotone azul-cálido + dimming —— */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(7,17,26,0.55) 0%, rgba(7,17,26,0.78) 50%, rgba(7,17,26,0.96) 100%), radial-gradient(ellipse at top right, rgba(15,164,147,0.30), transparent 55%), radial-gradient(ellipse at bottom left, rgba(168,133,79,0.22), transparent 60%)',
        }}
      />

      {/* —— Contenido —— */}
      <div className="container-refugio relative z-10 flex flex-1 flex-col justify-center pt-32 pb-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <Eyebrow>re.ˈfu.xjo · /n./</Eyebrow>
          </motion.div>

          <h1 className="mt-6 font-display font-normal leading-[0.92]">
            <span className="block overflow-hidden">
              <motion.span
                className="inline-block text-[length:var(--fs-display-2xl)] font-[400] [font-variation-settings:'wonk'_1,'SOFT'_50]"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              >
                {HERO_TEXT}
              </motion.span>
            </span>
            <span className="mt-3 block overflow-hidden">
              <motion.span
                className="inline-block text-[length:var(--fs-display-lg)] italic font-light text-stone-100"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              >
                Lugar donde se está bien.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
            className="mt-8 max-w-xl text-[length:var(--fs-body-lg)] leading-relaxed text-stone-100/90"
          >
            Cocina gallega de barrio en A Cabana, Ferrol. Pulpo, raxo, tortilla y el calor de toda la vida.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.95 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <ButtonLink href="/carta" size="lg" magnetic iconRight={<ArrowRight className="h-4 w-4" />}>
              Ver la carta
            </ButtonLink>
            <ButtonLink
              href={RESTAURANT.phone.tel}
              size="lg"
              variant="ghost"
              iconLeft={<Phone className="h-4 w-4" />}
            >
              Reservar · {RESTAURANT.phone.display}
            </ButtonLink>
          </motion.div>
        </div>

        {/* —— Scroll indicator —— */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 right-[var(--gutter)] flex flex-col items-center gap-3 text-xs uppercase tracking-[0.32em] text-stone-300"
        >
          <span className="rotate-90 origin-center [writing-mode:vertical-rl]">scroll</span>
          <motion.span
            className="h-12 w-px bg-turquoise-400/60"
            animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      <div className="relative z-10 -mb-2 pb-4">
        <Marquee
          items={[
            'Polbo',
            'Raxo',
            'Tortilla',
            'Pinchos',
            'Helados',
            'Ensalada campera',
            'Zorza',
            'Hamburguesa',
          ]}
        />
        {/* —— viga inferior del hero como marco del local —— */}
        <div aria-hidden className="divider-wood mt-4 h-1.5" />
      </div>
    </section>
  );
}
