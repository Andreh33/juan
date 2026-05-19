'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { NAV_ITEMS } from './nav-items';
import { Logo } from '@/components/composed/Logo';
import { RESTAURANT } from '@/lib/data/restaurant';

interface Props {
  open: boolean;
  onClose: () => void;
  pathname: string;
}

export function MobileDrawer({ open, onClose, pathname }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const node = ref.current;
    node?.querySelector<HTMLElement>('[data-autofocus]')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && node) {
        const focusables = node.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.aside
          ref={ref}
          key="drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Menú principal"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[var(--z-drawer)] flex flex-col bg-[color:var(--color-bg-deep)]"
        >
          <div className="flex items-center justify-between px-[var(--gutter)] py-6">
            <Logo />
            <button
              type="button"
              data-autofocus
              onClick={onClose}
              aria-label="Cerrar menú"
              data-cursor="grow"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-border-default)] hover:border-turquoise-400"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center px-[var(--gutter)]">
            <ul className="flex flex-col gap-4">
              {NAV_ITEMS.map((item, i) => {
                const active = pathname === item.href;
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block font-display text-[length:var(--fs-display-lg)] leading-tight transition-colors hover:text-turquoise-200"
                      aria-current={active ? 'page' : undefined}
                    >
                      <span className="inline-flex items-baseline gap-3">
                        {active ? <span className="text-turquoise-400">·</span> : null}
                        {item.label}
                      </span>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-[color:var(--color-border-subtle)] px-[var(--gutter)] py-6">
            <a
              href={RESTAURANT.phone.tel}
              className="font-mono text-sm tracking-[0.18em] text-stone-300 hover:text-turquoise-200"
            >
              {RESTAURANT.phone.display}
            </a>
            <p className="mt-1 text-xs text-stone-400">{RESTAURANT.address.full}</p>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
