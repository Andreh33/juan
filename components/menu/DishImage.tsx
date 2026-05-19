import Image from 'next/image';
import { placeholderBlurDataUri } from '@/lib/utils/placeholders';
import { cn } from '@/lib/utils/cn';

interface Props {
  src: string;
  alt: string;
  hue: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

export function DishImage({ src, alt, hue, sizes, priority, className }: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes ?? '(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 30vw'}
      priority={priority}
      placeholder="blur"
      blurDataURL={placeholderBlurDataUri(hue)}
      className={cn(
        'object-cover transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:scale-[1.06]',
        className,
      )}
    />
  );
}
