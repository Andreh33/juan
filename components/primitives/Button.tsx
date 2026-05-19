'use client';

import { forwardRef } from 'react';
import { useMagnetic } from '@/lib/hooks/useMagnetic';
import { cn } from '@/lib/utils/cn';

type Variant = 'primary' | 'ghost' | 'subtle';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-turquoise-500 text-[color:var(--color-text-on-turq)] hover:bg-turquoise-400 shadow-[var(--shadow-glow-turq)] active:bg-turquoise-600',
  ghost:
    'bg-transparent text-[color:var(--color-text-primary)] border border-[color:var(--color-border-strong)] hover:border-turquoise-400 hover:text-turquoise-200',
  subtle:
    'bg-[color:var(--color-bg-raised)] text-[color:var(--color-text-primary)] hover:bg-[color:var(--color-bg-base)]',
};

const sizeStyles: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-base',
  lg: 'h-14 px-8 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', magnetic = false, iconLeft, iconRight, className, children, ...rest },
  forwardedRef,
) {
  const { ref, innerRef } = useMagnetic<HTMLButtonElement, HTMLSpanElement>();
  const finalRef = magnetic ? ref : forwardedRef;

  return (
    <button
      ref={finalRef as React.RefObject<HTMLButtonElement>}
      data-cursor="grow"
      className={cn(
        'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight',
        'transition-[background,color,box-shadow,border-color] duration-300 ease-[var(--ease-out-quart)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-bg-deep)]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...rest}
    >
      <span
        ref={magnetic ? innerRef : undefined}
        className="inline-flex items-center gap-2 will-change-transform"
      >
        {iconLeft}
        <span>{children}</span>
        {iconRight}
      </span>
    </button>
  );
});
