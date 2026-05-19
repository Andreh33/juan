'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, ArrowRight } from 'lucide-react';
import { DishImage } from './DishImage';
import { Chip } from '@/components/primitives/Chip';
import {
  ALLERGEN_LABELS,
  TAG_LABELS,
  type Dish,
} from '@/lib/data/menu';
import { formatPrice } from '@/lib/utils/format';
import { RESTAURANT } from '@/lib/data/restaurant';

interface Props {
  dish: Dish | null;
  onClose: () => void;
}

export function DishModal({ dish, onClose }: Props) {
  useEffect(() => {
    if (!dish) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [dish, onClose]);

  return (
    <AnimatePresence>
      {dish ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`dish-title-${dish.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-[color:var(--color-bg-deep)]/85 p-4 backdrop-blur-2xl md:p-8"
          onClick={onClose}
        >
          <motion.article
            layoutId={`dish-${dish.id}`}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative grid w-full max-w-5xl grid-cols-1 gap-0 overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg-base)] shadow-[var(--shadow-lg)] md:grid-cols-[60%_40%]"
          >
            <button
              type="button"
              onClick={onClose}
              autoFocus
              aria-label="Cerrar plato"
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--color-bg-deep)]/70 text-stone-200 backdrop-blur hover:bg-[color:var(--color-bg-deep)]"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div layoutId={`dish-image-${dish.id}`} className="relative aspect-[4/5] md:aspect-auto">
              <DishImage id={dish.id} hue={dish.hue} alt={dish.name} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--color-bg-base)]/40 via-transparent to-transparent md:bg-gradient-to-r" />
            </motion.div>

            <div className="flex flex-col gap-5 p-6 md:p-10">
              <div className="flex flex-wrap gap-1.5">
                {dish.tags.map((t) => (
                  <Chip
                    key={t}
                    tone={t === 'recomendado' ? 'turquoise' : t === 'picante' ? 'ember' : 'default'}
                  >
                    {TAG_LABELS[t]}
                  </Chip>
                ))}
              </div>
              <header>
                <h2
                  id={`dish-title-${dish.id}`}
                  className="font-display text-[length:var(--fs-display-lg)] leading-[1.05]"
                >
                  {dish.name}
                </h2>
                {dish.galician ? (
                  <p className="mt-2 font-display text-base italic text-stone-300" lang="gl">
                    {dish.galician}
                  </p>
                ) : null}
              </header>
              <p className="text-stone-200">
                {dish.longDescription ?? dish.description}
              </p>

              {dish.pairing ? (
                <div className="rounded-[var(--radius-md)] border border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-hollow)] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-turquoise-200">
                    · va de cine con
                  </p>
                  <p className="mt-1 text-sm text-stone-200">{dish.pairing}</p>
                </div>
              ) : null}

              {dish.allergens.length > 0 ? (
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-stone-300">
                    Alérgenos
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {dish.allergens.map((a) => (
                      <li key={a}>
                        <Chip tone="wood">{ALLERGEN_LABELS[a]}</Chip>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="mt-2 flex items-baseline justify-between border-t border-[color:var(--color-border-subtle)] pt-5">
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-stone-300">
                  Precio
                </span>
                <span className="font-mono text-xl tabular text-turquoise-200">
                  {dish.price > 0 ? formatPrice(dish.price) : 'S/M'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/reservas"
                  className="inline-flex items-center gap-2 rounded-full bg-turquoise-500 px-5 py-3 text-sm font-medium text-[color:var(--color-text-on-turq)] hover:bg-turquoise-400"
                >
                  Reservar mesa
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={RESTAURANT.phone.tel}
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-strong)] px-5 py-3 text-sm hover:border-turquoise-400 hover:text-turquoise-200"
                >
                  <Phone className="h-4 w-4" />
                  Llamar
                </a>
              </div>
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
