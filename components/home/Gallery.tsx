'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { SectionTitle } from '@/components/primitives/SectionTitle';
import { placeholderBlurDataUri } from '@/lib/utils/placeholders';

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  hue: string;
  span?: string;
}

const GALLERY: ReadonlyArray<GalleryItem> = [
  { id: 'g04', src: '/images/gallery/g04.jpg', alt: 'Terraza al atardecer con vistas a la ría', hue: '#A8854F', span: 'row-span-2' },
  { id: 'g06', src: '/images/gallery/g06.jpg', alt: 'Cuenco con marisco, arroz y caldo de pimentón', hue: '#0FA493' },
  { id: 'g03', src: '/images/gallery/g03.jpg', alt: 'Comedor interior con mesas y luz cálida', hue: '#5B5347' },
  { id: 'g01', src: '/images/gallery/g01.jpg', alt: 'Hamburguesa con patatas sobre tabla, fondo oscuro', hue: '#523913', span: 'row-span-2' },
  { id: 'g08', src: '/images/gallery/g08.jpg', alt: 'Pescado a la plancha con tartar de verduras', hue: '#0A8478' },
  { id: 'g02', src: '/images/gallery/g02.jpg', alt: 'Cuenco de ensalada con verduras frescas y huevo', hue: '#C8AA82' },
  { id: 'g05', src: '/images/gallery/g05.jpg', alt: 'Cocinero emplata con detalle sobre plato blanco', hue: '#B43F18' },
  { id: 'g07', src: '/images/gallery/g07.jpg', alt: 'Mesa servida con copa de vino y plato emplatado', hue: '#BFF1EA', span: 'row-span-2' },
  { id: 'g09', src: '/images/gallery/g09.jpg', alt: 'Comensales disfrutando del menú en la mesa', hue: '#8A6730' },
];

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
              className={`group relative overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--color-border-subtle)] transition-[border-color] hover:border-[color:var(--color-border-strong)] ${item.span ?? ''}`}
              aria-label={`Abrir imagen: ${item.alt}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                placeholder="blur"
                blurDataURL={placeholderBlurDataUri(item.hue)}
                className="object-cover transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:scale-[1.06]"
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
            className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-[color:var(--color-bg-deep)]/85 p-6 backdrop-blur-2xl"
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
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[80vh] w-full max-w-[1200px]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeItem.src}
                alt={activeItem.alt}
                fill
                sizes="100vw"
                className="rounded-[var(--radius-lg)] object-contain shadow-[var(--shadow-lg)]"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
