import { cn } from '@/lib/utils/cn';

interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: keyof React.JSX.IntrinsicElements;
}

export function Eyebrow({ as = 'span', className, children, ...rest }: EyebrowProps) {
  const Tag = as as React.ElementType;
  return (
    <Tag
      className={cn(
        'inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-stone-300',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
