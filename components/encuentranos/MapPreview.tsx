'use client';

import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { RESTAURANT } from '@/lib/data/restaurant';

/**
 * Mapa estilizado (SVG) — no requiere claves de terceros.
 * Cliente puede cambiarlo por MapLibre real añadiendo NEXT_PUBLIC_MAPTILER_KEY
 * y reemplazando este componente por uno con `maplibre-gl`.
 */
export function MapPreview() {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-base)]">
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0B1A24" />
            <stop offset="100%" stopColor="#0a1620" />
          </linearGradient>
          <linearGradient id="water" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#06303B" />
            <stop offset="100%" stopColor="#042129" />
          </linearGradient>
        </defs>
        <rect width="800" height="600" fill="url(#land)" />
        {/* Río / ría */}
        <path
          d="M0 420 C 150 360, 280 460, 460 380 S 720 420, 800 360 L 800 600 L 0 600 Z"
          fill="url(#water)"
        />
        {/* Calles principales */}
        <g stroke="#5b5347" strokeWidth="2.5" fill="none" opacity="0.6">
          <path d="M0 280 L 800 240" />
          <path d="M120 0 L 200 600" />
          <path d="M540 0 L 480 600" />
          <path d="M0 160 L 800 200" />
        </g>
        {/* Avenida */}
        <g stroke="#8a6730" strokeWidth="4" fill="none" opacity="0.6">
          <path d="M0 340 L 800 320" />
        </g>
        {/* Edificios sutiles */}
        <g fill="#112432" opacity="0.65">
          <rect x="160" y="180" width="50" height="40" />
          <rect x="240" y="200" width="40" height="50" />
          <rect x="320" y="180" width="36" height="36" />
          <rect x="120" y="380" width="60" height="40" />
          <rect x="540" y="220" width="50" height="60" />
          <rect x="620" y="180" width="40" height="50" />
        </g>
        {/* Etiqueta de barrio */}
        <text x="60" y="80" fill="#bdb6a6" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="4" opacity="0.6">
          A CABANA · FERROL
        </text>
        <text x="60" y="540" fill="#4ED1C2" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="4" opacity="0.5">
          RÍA DE FERROL
        </text>
      </svg>

      {/* Pin animado */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-full"
      >
        <span className="absolute inset-0 -z-10 h-12 w-12 -translate-x-1/2 -translate-y-1/3 rounded-full bg-turquoise-400/40 pulse-dot" />
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-turquoise-500 text-[color:var(--color-text-on-turq)] shadow-[var(--shadow-glow-turq)]">
          <MapPin className="h-5 w-5" />
        </span>
      </motion.div>

      <div className="absolute bottom-4 left-4 right-4 rounded-[var(--radius-md)] border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg-deep)]/85 p-4 backdrop-blur-xl">
        <p className="font-display text-base leading-tight">{RESTAURANT.name}</p>
        <p className="mt-1 text-xs text-stone-300">{RESTAURANT.address.full}</p>
      </div>
    </div>
  );
}
