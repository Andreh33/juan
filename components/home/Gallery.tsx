'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { SectionTitle } from '@/components/primitives/SectionTitle';
import { placeholderDataUri } from '@/lib/utils/placeholders';

const GALLERY = [
  { id: 'g1', alt: 'Comedor en luz dorada', hue: '#A8854F', span: 'row-span-2' },
  { id: 'g2', alt: 'Pulpo emplatado', hue: '#0FA493', span: '' },
  { id: 'g3', alt: 'Detalle de mantel', hue: '#5B5347', span: '' },
  { id: 'g4', alt: 'Cocina al servicio', hue: '#D9582A', span: 'row-span-2' },
  { id: 'g5', alt: 'Mesa con copa', hue: '#0A8478', span: '' },
  { id: 'g6', alt: 'Pan crujiente', hue: '#C8AA82', span: '' },
  { id: 'g7', alt: 'Brasa al fondo', hue: '#B43F18', span: '' },
  { id: 'g8', alt: 'Helado en plato', hue: '#BFF1EA', span: 'row-span-2' },
  { id: 'g9', alt: 'Tortilla recién hecha', hue: '#8A6730', span: '' },
] as const;

export function Gallery() {
  const [active, setActive] = useState<string | null>(null);
  const activeItem = GALLERY.find((g) => g.id === active);

  return (
    <section className="py-[var(--section-y)]">
      <div className="container-refugio">
        <div className="flex flex-col gap-4">
          <Eyebrow>· la casa por dentro</Eyebrow>
          <SectionTitle as="h2" size="lg">
            Pequeños momentos<br />
            <span className="italic text-stone-200">en A Cabana.</span>
          </SectionTitle>
        </div>

        <div className="mt-12 grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[180px] sm:grid-cols-3 md:auto-rows-[220px] md:grid-cols-4">
          {GALLERY.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item.id)}
              data-cursor="grow"
              className={`group relative overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--color-border-subtle)] transition-[border-color] hover:border-[color:var(--color-border-strong)] ${item.span}`}
              aria-label={`Abrir imagen: ${item.alt}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- placeholder SVG inline; sustituir por <Image /> al disponer de fotos reales */}
              <img
                src={placeholderDataUri(item.id, item.hue)}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:scale-[1.06]"
              />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeItem ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-[color:var(--color-bg-deep)]/85 backdrop-blur-2xl p-6"
            onClick={() => setActive(null)}
          >
            <motion.button
              type="button"
              onClick={() => setActive(null)}
              autoFocus
              aria-label="Cerrar imagen"
              className="absolute right-6 top-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-border-strong)] text-stone-200 hover:border-turquoise-400"
            >
              <X className="h-5 w-5" />
            </motion.button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              src={placeholderDataUri(activeItem.id, activeItem.hue)}
              alt={activeItem.alt}
              className="max-h-[80vh] max-w-[1200px] rounded-[var(--radius-lg)] object-contain shadow-[var(--shadow-lg)]"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
