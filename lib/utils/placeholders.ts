/**
 * Genera placeholders artísticos SVG únicos por plato.
 * Composición: gradiente piedra → círculo en color del plato → texturas orgánicas.
 */

function hash(input: string): number {
  let h = 5381;
  for (let i = 0; i < input.length; i++) {
    h = (h * 33) ^ input.charCodeAt(i);
  }
  return h >>> 0;
}

function rand(seed: number) {
  let state = seed || 1;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return ((state >>> 0) % 10000) / 10000;
  };
}

export function generateDishPlaceholder(id: string, hue: string): string {
  const r = rand(hash(id));
  const w = 800;
  const h = 1000;
  const cx = 400 + Math.floor((r() - 0.5) * 120);
  const cy = 500 + Math.floor((r() - 0.5) * 120);
  const radius = 240 + Math.floor(r() * 80);
  const blobs = Array.from({ length: 5 }, () => ({
    x: Math.floor(r() * w),
    y: Math.floor(r() * h),
    rx: 18 + Math.floor(r() * 38),
    ry: 14 + Math.floor(r() * 26),
    rot: Math.floor(r() * 360),
    opacity: 0.08 + r() * 0.18,
  }));

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="80%">
      <stop offset="0%" stop-color="#112432"/>
      <stop offset="100%" stop-color="#07111A"/>
    </radialGradient>
    <radialGradient id="dish" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${hue}" stop-opacity="0.85"/>
      <stop offset="70%" stop-color="${hue}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${hue}" stop-opacity="0"/>
    </radialGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2"/>
      <feColorMatrix values="0 0 0 0 0.94, 0 0 0 0 0.93, 0 0 0 0 0.9, 0 0 0 0.18 0"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <circle cx="${cx}" cy="${cy}" r="${radius}" fill="url(#dish)"/>
  <g opacity="0.7">
    ${blobs
      .map(
        (b) =>
          `<ellipse cx="${b.x}" cy="${b.y}" rx="${b.rx}" ry="${b.ry}" fill="${hue}" opacity="${b.opacity.toFixed(2)}" transform="rotate(${b.rot} ${b.x} ${b.y})"/>`,
      )
      .join('')}
  </g>
  <rect width="100%" height="100%" filter="url(#grain)" opacity="0.35"/>
  <g transform="translate(${w - 80} ${h - 80})" opacity="0.4">
    <circle r="22" fill="none" stroke="#4ED1C2" stroke-width="1.2"/>
    <text text-anchor="middle" dominant-baseline="central" font-family="Georgia, serif" font-size="22" fill="#4ED1C2">R</text>
  </g>
</svg>`.trim();
}

export function placeholderDataUri(id: string, hue: string): string {
  const svg = generateDishPlaceholder(id, hue);
  const b64 = typeof Buffer !== 'undefined'
    ? Buffer.from(svg).toString('base64')
    : btoa(unescape(encodeURIComponent(svg)));
  return `data:image/svg+xml;base64,${b64}`;
}

/** Versión blur (10x12) muy pequeña para usar como blurDataURL. */
export function placeholderBlurDataUri(hue: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 12"><rect width="10" height="12" fill="#0B1A24"/><circle cx="5" cy="6" r="4" fill="${hue}" opacity="0.7"/></svg>`;
  const b64 = typeof Buffer !== 'undefined'
    ? Buffer.from(svg).toString('base64')
    : btoa(unescape(encodeURIComponent(svg)));
  return `data:image/svg+xml;base64,${b64}`;
}
