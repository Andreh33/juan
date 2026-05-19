'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

const TRIGGER = 'polbo';

/**
 * Easter egg: al teclear "polbo" en cualquier momento, cae una nube de pimentón
 * sobre la pantalla durante 2.4s. One-time per session.
 */
export function PolboEasterEgg() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(false);
  const usedRef = useRef(false);

  useEffect(() => {
    if (reduced) return;
    if (typeof window === 'undefined') return;
    usedRef.current = window.sessionStorage.getItem('refugio:polbo') === '1';

    let buffer = '';
    const onKey = (e: KeyboardEvent) => {
      if (usedRef.current) return;
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || target?.isContentEditable) return;
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-TRIGGER.length);
      if (buffer === TRIGGER) {
        setActive(true);
        usedRef.current = true;
        window.sessionStorage.setItem('refugio:polbo', '1');
        window.setTimeout(() => setActive(false), 2400);
        if (process.env.NODE_ENV !== 'production') {
          console.log(
            '%c · polbo á feira · ',
            'background: #D9582A; color: #07111A; padding: 6px 12px; font-family: serif; border-radius: 999px;',
          );
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [reduced]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none fixed inset-0 z-[var(--z-toast)] overflow-hidden"
        >
          {Array.from({ length: 60 }, (_, i) => (
            <Speck key={i} index={i} />
          ))}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-12 -translate-x-1/2 rounded-full bg-[color:var(--color-bg-deep)]/85 px-5 py-2 font-display italic text-stone-100 backdrop-blur"
          >
            polbo á feira ·  con pimentón de la Vera
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Speck({ index }: { index: number }) {
  const left = ((index * 73) % 100) + (((index * 31) % 7) - 3) * 0.6;
  const size = 4 + ((index * 13) % 6);
  const delay = ((index * 17) % 800) / 1000;
  const duration = 1.4 + ((index * 7) % 9) / 10;
  const tone = index % 4 === 0 ? '#B43F18' : index % 3 === 0 ? '#D9582A' : '#8A6730';
  return (
    <motion.span
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: '110vh', opacity: [0, 0.9, 0.9, 0] }}
      transition={{ duration, delay, ease: 'easeIn' }}
      className="absolute rounded-full"
      style={{
        left: `${left}%`,
        width: size,
        height: size,
        background: tone,
        filter: 'blur(0.5px)',
      }}
    />
  );
}
