# El Refugio de A Cabana

Sitio web del restaurante **El Refugio de A Cabana** — Calle Pilar 5, A Cabana, Ferrol.

Cocina gallega de barrio. Diseño cuidado, oscuro, con micro-interacciones y storytelling pinneado.

---

## Stack

- **Next.js 16** (App Router, RSC, Server Actions)
- **React 19**
- **TypeScript 5** (strict, `noUncheckedIndexedAccess`)
- **Tailwind CSS 4** (configuración CSS-first vía `@theme`)
- **Motion 12** (animaciones UI)
- **Lenis** (smooth scroll, respeta `prefers-reduced-motion`)
- **GSAP** (timelines avanzadas)
- **Zod** (validación de formularios)
- **Resend** opcional (emails de reserva)

---

## Quick start

```bash
pnpm install
cp .env.example .env.local
pnpm dev
# → http://localhost:3000
```

## Scripts

| Comando | Acción |
|---|---|
| `pnpm dev` | Servidor de desarrollo (Turbopack) |
| `pnpm build` | Build de producción |
| `pnpm start` | Sirve el build de producción |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm format` | Prettier write |

---

## Estructura

```
app/
  (legal)/                    Aviso legal, privacidad
  carta/                      Carta interactiva
  encuentranos/               Mapa + datos de contacto
  nuestra-historia/           Timeline + equipo
  reservas/                   Formulario 3 pasos + server action
  icon.tsx, opengraph-image.tsx
  sitemap.ts, robots.ts, manifest.ts
  layout.tsx, page.tsx, globals.css
components/
  primitives/                 Button, ButtonLink, Chip, Eyebrow, SectionTitle
  composed/                   Logo, Marquee, OpenStatusBadge
  interactive/                CustomCursor, LenisProvider, GrainOverlay, PlateOrnament
  nav/                        Header, Footer, MobileDrawer, AudioToggle
  home/                       Hero, Bento, DishSelection, Storytelling, Gallery, Testimonials, CtaReservas, HoursStrip
  menu/                       DishCard, DishImage, DishModal, MenuClient, MenuFilters
  historia/                   Timeline, Team
  encuentranos/               MapPreview (SVG), CopyAddress
  reservas/                   ReservaForm
  seo/                        RestaurantSchema (JSON-LD)
lib/
  data/                       restaurant.ts (NAP, horarios), menu.ts (carta)
  hooks/                      usePrefersReducedMotion, useMagnetic, useTilt, useSheen
  motion/                     variants.ts (Motion)
  reservations/               schema.ts (Zod)
  utils/                      cn, format, placeholders (SVG artísticos)
styles/
  tokens.css                  Variables CSS (paleta, escala, etc.)
```

---

## Variables de entorno

| Variable | Necesaria | Uso |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Sí | URL absoluta del sitio (canonical, OG, sitemap). |
| `NEXT_PUBLIC_PHONE` | Recomendada | Teléfono internacional para enlaces `tel:`. |
| `RESEND_API_KEY` | Opcional | Clave Resend para confirmaciones de reserva. |
| `RESERVAS_EMAIL_TO` | Opcional | Destinatario de las reservas. |
| `NEXT_PUBLIC_MAPTILER_KEY` | Opcional | Sustituir el mapa SVG por MapLibre real. |

Sin `RESEND_API_KEY`, las reservas se loguean en consola y muestran confirmación al usuario. El operador debe revisarlas manualmente.

---

## Editar contenido

- **Carta** → `lib/data/menu.ts`. Cada plato tiene `name`, `description`, `price`, `tags`, `allergens`, `hue` (color base del placeholder).
- **NAP y horarios** → `lib/data/restaurant.ts`. Cambiar aquí actualiza footer, schema.org, página `/encuentranos` y badge "Abierto ahora".
- **Imágenes** → actualmente todas las fotos son placeholders SVG generados por hash del id del plato. Cuando haya fotos reales, sustituir `<DishImage />` por `<Image src=... />` y borrar los placeholders.
- **Testimonios** → `components/home/Testimonials.tsx` (marcados como `_demo`).
- **Historia** → `components/historia/Timeline.tsx` y `components/historia/Team.tsx`.

---

## Pendientes del cliente

1. **NIF y denominación fiscal** → `lib/data/restaurant.ts` y páginas legales.
2. **Horarios definitivos** → confirmar `RESTAURANT.hours`.
3. **Fotos reales** → sustituir placeholders SVG por imágenes optimizadas (AVIF/WebP) en `public/images/`.
4. **Redes sociales** → completar `RESTAURANT.social.instagram` y `.facebook`.
5. **Resend** → crear cuenta, verificar dominio, generar API key.
6. **Google Business Profile + Apple Business Connect + Bing Places** → registrar el negocio.

---

## Deploy a Vercel

```bash
vercel --prod
```

Variables a configurar en el dashboard de Vercel:

- `NEXT_PUBLIC_SITE_URL` = `https://elrefugiodeacabana.com`
- `RESEND_API_KEY` (si se usa)
- `RESERVAS_EMAIL_TO` (si se usa)

La región recomendada es `fra1` (Frankfurt) por proximidad a España.

---

## Accesibilidad y rendimiento

- WCAG 2.2 AA objetivo.
- `prefers-reduced-motion`: desactiva cursor custom, Lenis, plate parallax, tilt, scroll-linked.
- Custom cursor solo en pointer fino (desktop).
- Focus trap en drawer mobile y modal de plato.
- Skip link al `<main>`.
- Schema.org `Restaurant` JSON-LD global.

---

## Licencia

Todos los derechos reservados — El Refugio de A Cabana, 2026.
