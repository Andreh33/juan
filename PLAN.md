# PLAN — El Refugio de A Cabana

Estado: en ejecución · v1.0.0

Cada fase termina con `pnpm build` verde, `pnpm lint` limpio y commit semántico.

---

## Fase 1 — Foundations

- [x] Verificar entorno (Node 24, pnpm 10)
- [ ] `pnpm create next-app` con TypeScript, Tailwind, App Router, ESLint
- [ ] Actualizar a Next 16 + Tailwind 4 + React 19
- [ ] Configurar `tsconfig` strict (noUncheckedIndexedAccess, etc.)
- [ ] Configurar ESLint flat + Prettier + Husky + lint-staged
- [ ] Crear `styles/tokens.css` con todas las CSS vars (sección 3.1)
- [ ] Integrar `next/font` (Fraunces + Inter + JetBrains Mono)
- [ ] Configurar Tailwind 4 `@theme` para leer tokens
- [ ] Setup Vercel Analytics + Speed Insights
- [ ] Estructura de carpetas (sección 0.3)
- [ ] `lib/data/restaurant.ts` con NAP y horarios
- [ ] Verificación: `pnpm dev` carga página base con tipografía y colores correctos

## Fase 2 — Design system primitives

- [ ] `<Button>` con variants (primary, ghost, magnetic) y sizes
- [ ] `<Link>` con underline animado
- [ ] `<Chip>` para tags
- [ ] `<SectionTitle>` con clip-reveal
- [ ] `<Eyebrow>` mono
- [ ] Custom cursor (client component)
- [ ] Smooth scroll Lenis setup
- [ ] Hook `useMagnetic`
- [ ] Hook `useTilt`
- [ ] Hook `useSheen`
- [ ] Hook `usePrefersReducedMotion`
- [ ] Grain overlay global
- [ ] Showcase de primitives en `/dev` (eliminar luego)

## Fase 3 — Layout + Nav + Footer

- [ ] Root layout con providers
- [ ] Header desktop con scroll-state (smart hide)
- [ ] Drawer mobile con focus trap
- [ ] Toggle audio con persistencia localStorage
- [ ] Footer completo
- [ ] Skip link
- [ ] Verificación A11y básica

## Fase 4 — Home

- [ ] Hero con WebGL plate (fallback estático)
- [ ] Marquee infinito
- [ ] Strip horarios live
- [ ] Bento "Lo que hacemos"
- [ ] Selección de carta horizontal scroll-snap
- [ ] Storytelling pinneado GSAP
- [ ] Galería masonry + lightbox
- [ ] Testimonios carrusel
- [ ] CTA reservas
- [ ] Verificación: Lighthouse Home ≥ 90 mobile

## Fase 5 — Carta interactiva

- [ ] `lib/data/menu.ts` con 10-12 platos
- [ ] Placeholders SVG generados
- [ ] Página `/carta` con filtros sticky
- [ ] Dish cards con tilt + sheen
- [ ] Modal con shared layout
- [ ] Buscador con highlight
- [ ] Print stylesheet
- [ ] Verificación: filtros animan suave, modal accesible

## Fase 6 — Historia + Encuéntranos + Reservas

- [ ] `/nuestra-historia` con timeline animada
- [ ] `/encuentranos` con MapLibre y pin custom
- [ ] `/reservas` con form en 3 pasos + server action
- [ ] Email de confirmación con Resend (fallback mailto)
- [ ] Generación .ics
- [ ] Verificación: reserva end-to-end funciona

## Fase 7 — SEO + Schema + Performance

- [ ] Metadata por página
- [ ] OG images dinámicas (`opengraph-image.tsx`)
- [ ] Sitemap + robots
- [ ] Schema.org Restaurant + Menu + Breadcrumbs
- [ ] Optimización imágenes (AVIF, sizes, priority)
- [ ] Bundle analysis y splitting
- [ ] CSP headers
- [ ] PWA manifest + offline page
- [ ] Verificación: Lighthouse ≥ 95 / 100 / 100 / 100

## Fase 8 — Accesibilidad + reduced motion

- [ ] Auditoría axe-core
- [ ] Tab navigation completa
- [ ] Reduced motion fallbacks
- [ ] Alt texts revisados
- [ ] Schema lang + hreflang
- [ ] Verificación: 0 errores serios pa11y

## Fase 9 — Legales + Contenido

- [ ] `/aviso-legal`
- [ ] `/privacidad`
- [ ] `/cookies` (si aplica)
- [ ] Copy revisado, cero lorem
- [ ] Imágenes descargadas y atribuidas
- [ ] `/creditos`

## Fase 10 — Testing + Deploy

- [ ] Vitest unit tests
- [ ] Playwright smoke tests
- [ ] CI GitHub Actions
- [ ] Vercel project setup
- [ ] Variables de entorno
- [ ] Deploy preview validado
- [ ] Deploy production
- [ ] Tag v1.0.0
