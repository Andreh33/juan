import type { Variants } from 'motion/react';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;
const EASE_IN_OUT_QUINT = [0.83, 0, 0.17, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT_QUART } },
};

export const stagger = (delay = 0.08): Variants => ({
  visible: { transition: { staggerChildren: delay, delayChildren: 0.1 } },
});

export const clipRevealH: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 1.1, ease: EASE_IN_OUT_QUINT },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

export const slideUpLetter: Variants = {
  hidden: { y: '110%' },
  visible: (i: number) => ({
    y: '0%',
    transition: { duration: 0.85, ease: EASE_OUT_EXPO, delay: 0.05 * i },
  }),
};

export const VIEWPORT_DEFAULT = { once: true, margin: '-10% 0px' } as const;
