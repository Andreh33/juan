'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

/**
 * Plato cerámico decorativo del hero.
 * Versión SVG/CSS (sin WebGL) — fiel a la paleta y con micro-rotación + tilt por mouse.
 * Cumple el objetivo del brief con coste de bundle cero.
 */
export function PlateOrnament() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 24 });
  const sy = useSpring(my, { stiffness: 80, damping: 24 });
  const rotX = useTransform(sy, [-1, 1], [10, -10]);
  const rotY = useTransform(sx, [-1, 1], [-14, 14]);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set((e.clientX / w) * 2 - 1);
      my.set((e.clientY / h) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my, reduced]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-center [perspective:1400px]"
    >
      <motion.div
        className="relative h-[80vmin] w-[80vmin] max-h-[680px] max-w-[680px] [transform-style:preserve-3d]"
        style={reduced ? undefined : { rotateX: rotX, rotateY: rotY }}
        animate={reduced ? undefined : { rotateZ: [0, 6, -2, 0] }}
        transition={
          reduced ? undefined : { duration: 28, repeat: Infinity, ease: 'linear' }
        }
      >
        <svg
          viewBox="0 0 600 600"
          className="absolute inset-0 h-full w-full drop-shadow-[0_60px_80px_rgba(0,0,0,0.55)]"
        >
          <defs>
            <radialGradient id="rim" cx="50%" cy="48%" r="50%">
              <stop offset="60%" stopColor="#0D1F2A" />
              <stop offset="80%" stopColor="#1FBDAB" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#07111A" />
            </radialGradient>
            <radialGradient id="well" cx="50%" cy="48%" r="40%">
              <stop offset="0%" stopColor="#0A2A2A" />
              <stop offset="100%" stopColor="#04141A" />
            </radialGradient>
            <radialGradient id="highlight" cx="35%" cy="30%" r="40%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
              <stop offset="60%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
            <radialGradient id="rimGloss" cx="60%" cy="40%" r="60%">
              <stop offset="0%" stopColor="rgba(78,209,194,0.35)" />
              <stop offset="100%" stopColor="rgba(78,209,194,0)" />
            </radialGradient>
          </defs>

          <ellipse cx="300" cy="320" rx="280" ry="60" fill="#000" opacity="0.45" />
          <ellipse cx="300" cy="300" rx="280" ry="200" fill="url(#rim)" />
          <ellipse cx="300" cy="300" rx="240" ry="170" fill="#063838" />
          <ellipse cx="300" cy="300" rx="220" ry="155" fill="url(#well)" />
          <ellipse cx="300" cy="300" rx="200" ry="135" fill="none" stroke="#1FBDAB" strokeOpacity="0.3" strokeWidth="1.2" />
          <ellipse cx="300" cy="288" rx="200" ry="125" fill="url(#rimGloss)" />
          <ellipse cx="240" cy="240" rx="120" ry="60" fill="url(#highlight)" />
        </svg>
        {/* Humo flotante */}
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-[20%] h-[260px] w-[180px] -translate-x-1/2 rounded-[50%] bg-gradient-to-t from-transparent via-stone-200/10 to-transparent blur-2xl"
          animate={reduced ? undefined : { y: [0, -10, 0], opacity: [0.5, 0.7, 0.5] }}
          transition={reduced ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  );
}
