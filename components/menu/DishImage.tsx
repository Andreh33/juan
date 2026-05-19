import { placeholderDataUri } from '@/lib/utils/placeholders';
import { cn } from '@/lib/utils/cn';

interface Props {
  id: string;
  hue: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

/**
 * Imagen de plato — placeholder SVG artístico generado por hash del id.
 * Cliente: sustituir por <Image src=... /> con foto real cuando esté disponible.
 */
export function DishImage({ id, hue, alt, className }: Props) {
  const src = placeholderDataUri(id, hue);
  return (
    <picture className={cn('block h-full w-full', className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:scale-[1.06]"
      />
    </picture>
  );
}
