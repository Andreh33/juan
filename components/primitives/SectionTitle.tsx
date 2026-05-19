'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils/cn';
import { clipRevealH, VIEWPORT_DEFAULT } from '@/lib/motion/variants';

interface SectionTitleProps {
  as?: 'h1' | 'h2' | 'h3';
  size?: 'xl' | 'lg' | 'md';
  className?: string;
  children: React.ReactNode;
  italic?: boolean;
}

const sizeStyles = {
  xl: 'text-[length:var(--fs-display-xl)]',
  lg: 'text-[length:var(--fs-display-lg)]',
  md: 'text-[length:var(--fs-h2)]',
};

export function SectionTitle({
  as: Tag = 'h2',
  size = 'lg',
  className,
  children,
  italic,
}: SectionTitleProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_DEFAULT}
      variants={clipRevealH}
      className="overflow-hidden"
    >
      <Tag
        className={cn(
          'font-display font-normal leading-[1.04]',
          sizeStyles[size],
          italic && 'italic',
          className,
        )}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
