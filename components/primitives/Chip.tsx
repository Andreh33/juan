import { cn } from '@/lib/utils/cn';

interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'default' | 'turquoise' | 'ember' | 'wood';
}

const toneStyles: Record<NonNullable<ChipProps['tone']>, string> = {
  default:
    'bg-[color:var(--color-bg-deep)]/70 text-stone-200 border-[color:var(--color-border-default)]',
  turquoise:
    'bg-turquoise-900/60 text-turquoise-200 border-turquoise-700/60',
  ember:
    'bg-[color:var(--color-ember-600)]/30 text-[color:var(--color-ember-500)] border-[color:var(--color-ember-600)]/40',
  wood: 'bg-wood-700/50 text-wood-200 border-wood-600/40',
};

export function Chip({ tone = 'default', className, children, ...rest }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide backdrop-blur-md',
        toneStyles[tone],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
