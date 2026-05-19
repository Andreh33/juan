'use client';

import { useEffect, useState } from 'react';
import { getOpenStatus, type OpenStatus } from '@/lib/data/restaurant';
import { cn } from '@/lib/utils/cn';

interface Props {
  compact?: boolean;
  className?: string;
}

export function OpenStatusBadge({ compact = false, className }: Props) {
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpenStatus());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (!status) {
    return (
      <span
        suppressHydrationWarning
        className={cn(
          'inline-flex items-center gap-2 text-xs text-stone-400',
          className,
        )}
      >
        <span className="h-2 w-2 rounded-full bg-stone-500" />
        Cargando horario…
      </span>
    );
  }

  const message = status.nextChange
    ? `${status.nextChange.label} ${status.nextChange.at}`
    : 'Consulta horarios';

  return (
    <span
      suppressHydrationWarning
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-default)] px-3 py-1.5 text-xs',
        compact ? 'bg-transparent' : 'bg-[color:var(--color-bg-base)]',
        className,
      )}
    >
      <span
        className={cn(
          'h-2 w-2 rounded-full',
          status.open ? 'bg-turquoise-400 pulse-dot' : 'bg-stone-500',
        )}
      />
      <span className={status.open ? 'text-turquoise-200' : 'text-stone-300'}>
        {status.open ? 'Abierto ahora' : 'Cerrado'}
      </span>
      <span className="text-stone-400">·</span>
      <span className="text-stone-300">{message}</span>
    </span>
  );
}
