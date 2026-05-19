'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Flame, Heart } from 'lucide-react';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { SectionTitle } from '@/components/primitives/SectionTitle';
import { useSheen } from '@/lib/hooks/useSheen';
import { fadeUp, stagger, VIEWPORT_DEFAULT } from '@/lib/motion/variants';
import { MENU } from '@/lib/data/menu';
import { placeholderBlurDataUri } from '@/lib/utils/placeholders';

const FEATURED_ROTATION = ['pulpo-a-la-gallega', 'raxo-al-queso', 'helados-artesanos'];

export function Bento() {
  return (
    <section className="py-[var(--section-y)]">
      <div className="container-refugio">
        <div className="mb-12 flex flex-col gap-4">
          <Eyebrow>· lo que hacemos</Eyebrow>
          <SectionTitle as="h2" size="lg">
            Una cocina sencilla,<br />
            <span className="italic text-stone-200">hecha con tiempo.</span>
          </SectionTitle>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_DEFAULT}
          variants={stagger(0.08)}
          className="grid grid-cols-1 gap-5 md:grid-cols-6 md:grid-rows-2"
        >
          <ProductoDelDia className="md:col-span-4 md:row-span-2" />
          <BentoCard
            className="md:col-span-2"
            title="Cocina lenta"
            description="Sin atajos: adobos largos, fuegos templados, salsas reducidas con paciencia."
            kicker="02"
            icon={<Flame className="h-5 w-5" />}
          />
          <BentoCard
            className="md:col-span-2"
            title="Mesa de barrio"
            description="Familias, vecinos y trabajadores del puerto. Nos gusta saber el nombre de quien nos visita."
            kicker="03"
            icon={<Heart className="h-5 w-5" />}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_DEFAULT}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5"
        >
          <Link
            href="/reservas"
            data-cursor="grow"
            className="group sheen relative flex flex-col gap-3 overflow-hidden rounded-[var(--radius-lg)] bg-gradient-to-br from-turquoise-700/40 via-turquoise-900/60 to-[color:var(--color-bg-base)] p-8 md:flex-row md:items-center md:justify-between md:p-10"
          >
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-turquoise-200">
                · pasa la voz
              </p>
              <p className="mt-3 font-display text-[length:var(--fs-h2)] leading-tight">
                Reserva una mesa.<br className="hidden md:block" />
                <span className="italic text-stone-200">Te esperamos.</span>
              </p>
            </div>
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-turquoise-400 text-[color:var(--color-text-on-turq)] transition-transform duration-500 group-hover:translate-x-1">
              <ArrowRight className="h-5 w-5" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ProductoDelDia({ className }: { className?: string }) {
  const sheenRef = useSheen<HTMLDivElement>();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % FEATURED_ROTATION.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, []);

  const dish = MENU.find((d) => d.id === FEATURED_ROTATION[index]);

  return (
    <motion.div variants={fadeUp} className={className}>
      <div
        ref={sheenRef}
        className="sheen group relative isolate h-full overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-base)] transition-colors hover:border-[color:var(--color-border-strong)]"
      >
        <div className="absolute inset-0 -z-10">
          <AnimatePresence mode="sync">
            <motion.div
              key={dish?.id}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              {dish ? (
                <Image
                  src={dish.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  placeholder="blur"
                  blurDataURL={placeholderBlurDataUri(dish.hue)}
                  className="object-cover"
                />
              ) : null}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(7,17,26,0.35) 0%, rgba(7,17,26,0.85) 75%, #07111a 100%), radial-gradient(circle at 30% 30%, rgba(15,164,147,0.18), transparent 55%)',
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative flex h-full min-h-[360px] flex-col justify-between p-6 md:min-h-[460px] md:p-10">
          <div className="flex items-center justify-between text-stone-200">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-turquoise-200">
              · 01 · producto del día
            </span>
            <div className="flex items-center gap-1.5">
              {FEATURED_ROTATION.map((id, i) => (
                <span
                  key={id}
                  aria-hidden
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === index ? 'w-6 bg-turquoise-400' : 'w-2 bg-stone-400/40'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="max-w-md">
            <AnimatePresence mode="wait">
              <motion.h3
                key={dish?.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[length:var(--fs-h2)] leading-tight"
              >
                {dish?.name}
                {dish?.galician ? (
                  <span className="mt-1 block font-display text-base italic font-light text-stone-200" lang="gl">
                    {dish.galician}
                  </span>
                ) : null}
              </motion.h3>
            </AnimatePresence>
            <p className="mt-4 text-sm leading-relaxed text-stone-200 md:text-base">
              Compramos cerca y cocinamos lo que está en su mejor momento. Lo que ves en la carta es lo que entra cada mañana.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface CardProps {
  title: string;
  description: string;
  kicker: string;
  icon?: React.ReactNode;
  className?: string;
}

function BentoCard({ title, description, kicker, icon, className }: CardProps) {
  const sheenRef = useSheen<HTMLDivElement>();
  return (
    <motion.div variants={fadeUp} className={className}>
      <div
        ref={sheenRef}
        className="sheen group relative flex h-full flex-col justify-between overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-base)] p-6 transition-colors hover:border-[color:var(--color-border-strong)] md:p-8"
      >
        <div className="flex items-center justify-between text-stone-300">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-turquoise-200/80">
            · {kicker}
          </span>
          {icon ? (
            <span className="grid h-9 w-9 place-items-center rounded-full bg-turquoise-500/10 text-turquoise-300">
              {icon}
            </span>
          ) : null}
        </div>
        <div className="mt-12">
          <h3 className="font-display text-[length:var(--fs-h3)] leading-tight">{title}</h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-300 md:text-base">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
