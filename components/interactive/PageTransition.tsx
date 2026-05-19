'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

/**
 * Cortina turquesa que entra desde abajo y sale por arriba al cambiar de ruta.
 * Mantiene la sensación cinemática entre páginas sin secuestrar el contenido.
 */
export function PageTransition() {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[var(--z-toast)] origin-bottom bg-[color:var(--color-turquoise-700)]"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
      />
    </AnimatePresence>
  );
}
