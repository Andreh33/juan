'use client';

import { motion } from 'motion/react';
import { ArrowRight, Phone } from 'lucide-react';
import { ButtonLink } from '@/components/primitives/ButtonLink';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Marquee } from '@/components/composed/Marquee';
import { PlateOrnament } from '@/components/interactive/PlateOrnament';
import { RESTAURANT } from '@/lib/data/restaurant';

const HERO_TEXT = 'Refugio';

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* Background atmospheric layers */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(15,164,147,0.18),transparent_60%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,rgba(168,133,79,0.18),transparent_55%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-[60vh] bg-gradient-to-t from-[color:var(--color-bg-deep)] via-[color:var(--color-bg-deep)]/85 to-transparent"
      />

      <PlateOrnament />

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
                className="inline-block text-[length:var(--fs-display-lg)] italic font-light text-stone-200"
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
            className="mt-8 max-w-xl text-[length:var(--fs-body-lg)] leading-relaxed text-stone-200"
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

        {/* Scroll indicator */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 right-[var(--gutter)] flex flex-col items-center gap-3 text-xs uppercase tracking-[0.32em] text-stone-400"
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
      </div>
    </section>
  );
}
