import { cn } from '@/lib/utils/cn';

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <span
        aria-hidden
        className="relative grid h-9 w-9 place-items-center rounded-full bg-turquoise-500/15 ring-1 ring-turquoise-500/30"
      >
        <span className="font-display text-lg leading-none text-turquoise-200">R</span>
        <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-turquoise-300/20" />
      </span>
      {showWordmark ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-base font-medium tracking-tight text-[color:var(--color-text-primary)]">
            El Refugio
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-stone-300">
            de A Cabana
          </span>
        </span>
      ) : null}
    </span>
  );
}
