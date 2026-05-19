'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X, Smartphone } from 'lucide-react';
import { useMagnetic } from '@/lib/hooks/useMagnetic';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const DISMISSED_KEY = 'refugio:install-dismissed';

export function InstallPrompt() {
  const [visible, setVisible] = useState(false);
  const deferredRef = useRef<BeforeInstallPromptEvent | null>(null);
  const { ref: btnRef, innerRef } = useMagnetic<HTMLButtonElement, HTMLSpanElement>({
    strength: 0.2,
    radius: 70,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleBeforeInstall = (event: Event) => {
      if (window.localStorage.getItem(DISMISSED_KEY) === '1') return;
      if (window.matchMedia('(display-mode: standalone)').matches) return;
      event.preventDefault();
      deferredRef.current = event as BeforeInstallPromptEvent;
      setVisible(true);
    };

    const handleInstalled = () => {
      deferredRef.current = null;
      window.localStorage.setItem(DISMISSED_KEY, '1');
      setVisible(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  const handleInstall = async () => {
    const deferred = deferredRef.current;
    if (!deferred) return;
    try {
      await deferred.prompt();
      const { outcome } = await deferred.userChoice;
      if (outcome === 'accepted') {
        window.localStorage.setItem(DISMISSED_KEY, '1');
        setVisible(false);
      }
    } catch {
      // El navegador ya consumió el prompt o cerró la elección.
      setVisible(false);
    } finally {
      deferredRef.current = null;
    }
  };

  const handleDismiss = () => {
    window.localStorage.setItem(DISMISSED_KEY, '1');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="dialog"
          aria-label="Instalar El Refugio como aplicación"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 z-[var(--z-toast)] mx-auto max-w-md md:bottom-6 md:left-auto md:right-6 md:max-w-sm"
        >
          <div className="card-wood relative overflow-hidden rounded-[var(--radius-lg)] bg-[color:var(--color-bg-base)]/95 p-5 shadow-[var(--shadow-lg)] backdrop-blur-xl">
            {/* —— texturas sutiles —— */}
            <span
              aria-hidden
              className="texture-wood pointer-events-none absolute inset-0 opacity-[0.08]"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-wood-300/50 to-transparent"
            />

            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Cerrar invitación"
              data-cursor="grow"
              className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--color-border-subtle)] text-stone-200 transition-colors hover:border-turquoise-400 hover:text-turquoise-200"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            <div className="relative flex items-start gap-4 pr-8">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-turquoise-500/15 text-turquoise-200 ring-1 ring-turquoise-500/30">
                <Smartphone className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-wood-200">
                  · acceso directo
                </p>
                <h3 className="mt-1.5 font-display text-xl leading-tight text-stone-100">
                  Instala El Refugio<br className="hidden md:block" />
                  <span className="italic text-stone-200">como app.</span>
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-stone-300">
                  Carta, horarios y reservas a un toque desde tu pantalla. Sin tienda.
                </p>
              </div>
            </div>

            <div className="relative mt-5 flex items-center gap-3">
              <button
                ref={btnRef}
                type="button"
                onClick={handleInstall}
                data-cursor="grow"
                className="group inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full bg-turquoise-500 px-4 text-sm font-medium text-[color:var(--color-text-on-turq)] shadow-[var(--shadow-glow-turq)] transition-colors hover:bg-turquoise-400"
              >
                <span ref={innerRef} className="inline-flex items-center gap-2 will-change-transform">
                  <Download className="h-4 w-4" />
                  Instalar app
                </span>
              </button>
              <button
                type="button"
                onClick={handleDismiss}
                className="inline-flex h-10 items-center justify-center rounded-full px-3 text-xs text-stone-300 transition-colors hover:text-stone-100"
              >
                Ahora no
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
