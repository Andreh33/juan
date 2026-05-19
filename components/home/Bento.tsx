'use client';

import { motion } from 'motion/react';
import { ArrowRight, Flame, Heart } from 'lucide-react';
import Link from 'next/link';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { SectionTitle } from '@/components/primitives/SectionTitle';
import { useSheen } from '@/lib/hooks/useSheen';
import { fadeUp, stagger, VIEWPORT_DEFAULT } from '@/lib/motion/variants';

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
          <BentoCard
            className="md:col-span-4 md:row-span-2"
            featured
            title="Producto del día"
            description="Compramos cerca y cocinamos lo que está en su mejor momento. Lo que ves en la carta es lo que entra cada mañana."
            kicker="01"
          />
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
            className="sheen relative flex flex-col gap-3 overflow-hidden rounded-[var(--radius-lg)] bg-gradient-to-br from-turquoise-700/40 via-turquoise-900/60 to-[color:var(--color-bg-base)] p-8 md:flex-row md:items-center md:justify-between md:p-10"
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
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-turquoise-400 text-[color:var(--color-text-on-turq)] transition-transform group-hover:translate-x-1">
              <ArrowRight className="h-5 w-5" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

interface CardProps {
  title: string;
  description: string;
  kicker: string;
  icon?: React.ReactNode;
  className?: string;
  featured?: boolean;
}

function BentoCard({ title, description, kicker, icon, className, featured }: CardProps) {
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
        {featured ? (
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-50 transition-opacity duration-700 group-hover:opacity-80"
            style={{
              background:
                'radial-gradient(ellipse at 70% 30%, rgba(15,164,147,0.25), transparent 60%), radial-gradient(ellipse at 20% 90%, rgba(168,133,79,0.2), transparent 55%)',
            }}
          />
        ) : null}
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
