'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function CopyAddress({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore — clipboard may be unavailable
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      data-cursor="grow"
      className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-default)] px-4 py-2 text-xs text-stone-200 hover:border-turquoise-400 hover:text-turquoise-200"
      aria-live="polite"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-turquoise-300" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? 'Copiado' : 'Copiar dirección'}
    </button>
  );
}
