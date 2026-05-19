'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { MENU } from '@/lib/data/menu';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { SectionTitle } from '@/components/primitives/SectionTitle';
import { DishImage } from '@/components/menu/DishImage';
import { Chip } from '@/components/primitives/Chip';
import { formatPrice } from '@/lib/utils/format';
import { VIEWPORT_DEFAULT } from '@/lib/motion/variants';

const FEATURED_IDS = [
  'pulpo-a-la-gallega',
  'raxo-al-queso',
  'zorza',
  'tortilla-de-patata',
  'combinado-clasico',
  'helados-artesanos',
];

export function DishSelection() {
  const dishes = FEATURED_IDS.map((id) => MENU.find((d) => d.id === id)).filter(
    (d): d is NonNullable<typeof d> => Boolean(d),
  );

  return (
    <section className="py-[var(--section-y)]">
      <div className="container-refugio">
        <div className="flex flex-col gap-4">
          <Eyebrow>· la casa en seis platos</Eyebrow>
          <SectionTitle as="h2" size="xl">
            La casa, en seis platos.
          </SectionTitle>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT_DEFAULT}
        transition={{ duration: 0.6 }}
        className="mt-12"
      >
        <ul className="flex gap-5 overflow-x-auto px-[var(--gutter)] pb-8 [scrollbar-width:thin] [scroll-snap-type:x_mandatory] md:gap-7">
          {dishes.map((dish, i) => (
            <motion.li
              key={dish.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_DEFAULT}
              transition={{ duration: 0.7, delay: 0.04 * i, ease: [0.16, 1, 0.3, 1] }}
              className="shrink-0 [scroll-snap-align:start] w-[80vw] max-w-[360px] sm:w-[44vw] md:w-[34vw] lg:w-[26rem]"
            >
              <Link
                href={`/carta#${dish.id}`}
                className="group relative block overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-base)] transition-colors hover:border-[color:var(--color-border-strong)]"
                data-cursor="grow"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <DishImage id={dish.id} hue={dish.hue} alt={dish.name} />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[color:var(--color-bg-deep)]/90 via-transparent to-transparent" />
                  {dish.tags.includes('recomendado') ? (
                    <div className="absolute right-3 top-3">
                      <Chip tone="turquoise">Recomendado</Chip>
                    </div>
                  ) : null}
                </div>
                <div className="flex items-baseline justify-between gap-4 px-5 py-5">
                  <div>
                    <h3 className="font-display text-[length:var(--fs-h3)] leading-tight">
                      {dish.name}
                    </h3>
                    {dish.galician ? (
                      <p className="mt-1 font-display text-sm italic text-stone-300" lang="gl">
                        {dish.galician}
                      </p>
                    ) : null}
                  </div>
                  <span className="font-mono text-base tabular text-turquoise-200">
                    {dish.price > 0 ? formatPrice(dish.price) : 'S/M'}
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <div className="container-refugio mt-6 flex justify-end">
        <Link
          href="/carta"
          className="link-underline inline-flex items-center gap-2 text-sm text-stone-200"
          data-cursor="grow"
        >
          Ver la carta completa
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
