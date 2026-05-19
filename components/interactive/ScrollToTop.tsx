'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useMagnetic } from '@/lib/hooks/useMagnetic';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { ref, innerRef } = useMagnetic<HTMLButtonElement, HTMLSpanElement>({
    strength: 0.2,
    radius: 80,
  });

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          ref={ref}
          type="button"
          onClick={handleClick}
          aria-label="Volver arriba"
          data-cursor="grow"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-[var(--z-toast)] inline-flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg-deep)]/85 text-stone-100 backdrop-blur-xl transition-colors hover:border-turquoise-400 hover:text-turquoise-200 md:bottom-10 md:right-10 md:h-14 md:w-14"
        >
          <span ref={innerRef} className="inline-flex will-change-transform">
            <ArrowUp className="h-4 w-4 md:h-5 md:w-5" />
          </span>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
