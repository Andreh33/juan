'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { SectionTitle } from '@/components/primitives/SectionTitle';

/**
 * Testimonios: ficticios, marcados con _demo. El cliente sustituirá por reseñas reales.
 */
const TESTIMONIALS = [
  {
    quote:
      'El pulpo está como mandan los cánones. Volvemos cada quince días desde Narón y siempre hay sitio en la barra para charlar mientras esperamos.',
    author: 'María & Tino',
    location: 'Narón',
    _demo: true,
  },
  {
    quote:
      'Vine por casualidad andando del puerto y me pedí una zorza. Llevo dos años viniendo. La hamburguesa también es del nivel.',
    author: 'Pablo',
    location: 'Ferrol',
    _demo: true,
  },
  {
    quote:
      'No tienen carta de tres páginas y se nota. Lo que sirven, sirve. Tortilla jugosa, raxo al queso, casa.',
    author: 'Lucía',
    location: 'Fene',
    _demo: true,
  },
] as const;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), []);
  const prev = () =>
    setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(next, 7000);
    return () => window.clearInterval(id);
  }, [paused, next]);

  const current = TESTIMONIALS[index];
  if (!current) return null;

  return (
    <section
      className="bg-[color:var(--color-bg-base)] py-[var(--section-y)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-refugio">
        <div className="flex flex-col gap-4">
          <Eyebrow>· de la mesa</Eyebrow>
          <SectionTitle as="h2" size="lg">
            Quien nos visita,<br />
            <span className="italic text-stone-200">vuelve.</span>
          </SectionTitle>
        </div>

        <div className="relative mt-12 min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <p className="font-display text-[length:var(--fs-display-lg)] italic leading-[1.15] text-stone-100">
                «{current.quote}»
              </p>
              <footer className="mt-6 font-mono text-xs uppercase tracking-[0.24em] text-stone-300">
                {current.author} · {current.location}
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Anterior testimonio"
            data-cursor="grow"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-border-default)] hover:border-turquoise-400"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Siguiente testimonio"
            data-cursor="grow"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-border-default)] hover:border-turquoise-400"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="ml-3 flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ir al testimonio ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-8 bg-turquoise-400' : 'w-3 bg-stone-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
