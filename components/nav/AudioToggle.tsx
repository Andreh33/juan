'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const STORAGE_KEY = 'refugio:audio';

function subscribeStorage(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function readStoredAudio() {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(STORAGE_KEY) === 'on';
}

export function AudioToggle({ className }: { className?: string }) {
  const stored = useSyncExternalStore(subscribeStorage, readStoredAudio, () => false);
  const [enabled, setEnabled] = useState(stored);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off');
  }, [enabled]);

  return (
    <button
      type="button"
      aria-pressed={enabled}
      aria-label={enabled ? 'Silenciar ambiente sonoro' : 'Activar ambiente sonoro'}
      data-cursor="grow"
      onClick={() => setEnabled((v) => !v)}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border-default)] text-stone-200 transition-colors hover:border-turquoise-400 hover:text-turquoise-200',
        className,
      )}
    >
      {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  );
}
