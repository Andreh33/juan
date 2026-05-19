import { cn } from '@/lib/utils/cn';

interface MarqueeProps {
  items: ReadonlyArray<string>;
  className?: string;
}

export function Marquee({ items, className }: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div
      className={cn('marquee-mask overflow-hidden py-6', className)}
      aria-hidden
    >
      <div className="marquee-track gap-12 font-display text-[length:var(--fs-h3)] italic text-stone-300/70">
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="inline-flex items-center gap-12">
            <span>{item}</span>
            <span className="text-turquoise-500">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
