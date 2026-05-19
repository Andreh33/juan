'use client';

import { motion } from 'motion/react';
import { useTilt } from '@/lib/hooks/useTilt';
import { useSheen } from '@/lib/hooks/useSheen';
import { Chip } from '@/components/primitives/Chip';
import { DishImage } from './DishImage';
import { TAG_LABELS, type Dish } from '@/lib/data/menu';
import { formatPrice } from '@/lib/utils/format';

interface Props {
  dish: Dish;
  onOpen: (id: string) => void;
}

export function DishCard({ dish, onOpen }: Props) {
  const tiltRef = useTilt<HTMLButtonElement>(5);
  const sheenRef = useSheen<HTMLDivElement>();

  return (
    <motion.button
      layout
      layoutId={`dish-${dish.id}`}
      ref={tiltRef}
      data-cursor="grow"
      onClick={() => onOpen(dish.id)}
      className="group relative isolate flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-base)] text-left transition-colors duration-300 hover:border-[color:var(--color-border-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-400"
      transition={{ layout: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
    >
      <div ref={sheenRef} className="sheen relative aspect-[4/5] overflow-hidden">
        <motion.div layoutId={`dish-image-${dish.id}`} className="absolute inset-0">
          <DishImage src={dish.image} alt={dish.alt} hue={dish.hue} />
        </motion.div>
        <div className="absolute right-3 top-3 z-10 flex flex-wrap justify-end gap-1.5">
          {dish.tags.map((t) => (
            <Chip key={t} tone={t === 'recomendado' ? 'turquoise' : t === 'picante' ? 'ember' : 'default'}>
              {TAG_LABELS[t]}
            </Chip>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--color-bg-deep)]/85 via-transparent to-transparent" />
      </div>

      <div
        className="flex flex-1 flex-col gap-2 p-5"
        style={{ transform: 'translateZ(20px)' }}
      >
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-[length:var(--fs-h3)] leading-none">{dish.name}</h3>
          <span className="font-mono text-base tabular text-turquoise-200">
            {dish.price > 0 ? formatPrice(dish.price) : 'S/M'}
          </span>
        </div>
        {dish.galician ? (
          <p className="font-display text-sm italic text-stone-300" lang="gl">
            {dish.galician}
          </p>
        ) : null}
        <p className="line-clamp-2 text-sm leading-relaxed text-stone-300">
          {dish.description}
        </p>
      </div>
    </motion.button>
  );
}
