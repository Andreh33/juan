'use client';

/**
 * Decisión de producto: ignoramos `prefers-reduced-motion` para mantener
 * la estética cinematográfica del local. Se conserva la API para no romper
 * los consumidores existentes.
 */
export function usePrefersReducedMotion(): boolean {
  return false;
}
