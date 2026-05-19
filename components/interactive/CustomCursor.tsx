'use client';

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

type CursorVariant = 'default' | 'grow' | 'text' | 'reserve';

const FINE_QUERY = '(pointer: fine) and (hover: hover)';

function subscribeMatchMedia(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mql = window.matchMedia(FINE_QUERY);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function readFinePointer() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(FINE_QUERY).matches;
}

export function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const isFine = useSyncExternalStore(subscribeMatchMedia, readFinePointer, () => false);
  const enabled = !reduced && isFine;
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [label, setLabel] = useState('');
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const sx = useSpring(mx, { stiffness: 220, damping: 22, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 220, damping: 22, mass: 0.4 });

  const handleMove = useCallback(
    (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      const target = e.target as HTMLElement | null;
      const node = target?.closest('[data-cursor]');
      const v = (node?.getAttribute('data-cursor') ?? 'default') as CursorVariant;
      setVariant(v);
      setLabel(node?.getAttribute('data-cursor-label') ?? '');
    },
    [mx, my],
  );

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-custom-cursor');
    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [enabled, handleMove]);

  if (!enabled) return null;

  const ringWidth = variant === 'grow' ? 80 : variant === 'text' ? 4 : 36;
  const ringHeight = variant === 'grow' ? 80 : variant === 'text' ? 32 : 36;
  const ringRadius = variant === 'text' ? 2 : 9999;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2"
        style={{ x: mx, y: my, zIndex: 9999 }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-turquoise-400" />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2"
        style={{ x: sx, y: sy, zIndex: 9998 }}
      >
        <motion.div
          className="border border-turquoise-400/40"
          animate={{ width: ringWidth, height: ringHeight, borderRadius: ringRadius }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        />
        {label ? (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-turquoise-500 px-3 py-1 text-xs font-medium text-[color:var(--color-text-on-turq)]"
          >
            {label}
          </motion.span>
        ) : null}
      </motion.div>
    </>
  );
}
