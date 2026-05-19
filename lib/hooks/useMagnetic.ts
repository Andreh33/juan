'use client';

import { useEffect, useRef } from 'react';
import { animate } from 'motion';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface Options {
  strength?: number;
  innerStrength?: number;
  radius?: number;
}

export function useMagnetic<T extends HTMLElement, I extends HTMLElement = HTMLElement>({
  strength = 0.25,
  innerStrength = 0.15,
  radius = 96,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const innerRef = useRef<I | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > radius) return;
      animate(
        el,
        { x: dx * strength, y: dy * strength },
        { type: 'spring', stiffness: 240, damping: 22 },
      );
      const inner = innerRef.current;
      if (inner) {
        animate(
          inner,
          { x: dx * innerStrength, y: dy * innerStrength },
          { type: 'spring', stiffness: 260, damping: 24 },
        );
      }
    };

    const onLeave = () => {
      animate(el, { x: 0, y: 0 }, { type: 'spring', stiffness: 180, damping: 18 });
      const inner = innerRef.current;
      if (inner) {
        animate(inner, { x: 0, y: 0 }, { type: 'spring', stiffness: 200, damping: 20 });
      }
    };

    window.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [reduced, strength, innerStrength, radius]);

  return { ref, innerRef };
}
