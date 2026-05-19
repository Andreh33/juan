# PLAN — El Refugio de A Cabana

Estado: en ejecución · v1.0.0

Cada fase termina con `pnpm build` verde, `pnpm lint` limpio y commit semántico.

---

## Fase 1 — Foundations ✓

- [x] Verificar entorno (Node 24, pnpm 10)
- [x] `pnpm create next-app` con TypeScript, Tailwind, App Router, ESLint
- [x] Next 16 + Tailwind 4 + React 19 confirmados
- [x] `tsconfig` strict (noUncheckedIndexedAccess)
- [x] ESLint flat + Prettier
- [x] `styles/tokens.css` con CSS vars completas
- [x] `next/font` con Fraunces (variable + axes SOFT/WONK/opsz), Inter, JetBrains Mono
- [x] Tailwind 4 `@theme inline` consumiendo tokens
- [x] Vercel Analytics + Speed Insights
- [x] Estructura de carpetas
- [x] `lib/data/restaurant.ts` con NAP, horarios, status helper
- [x] `pnpm build` verde

## Fase 2 — Design system primitives ✓

- [x] `<Button>` y `<ButtonLink>` con variants (primary, ghost, subtle) y magnetic
- [x] Underline animado (clase `.link-underline`)
- [x] `<Chip>` con tonos (default, turquoise, ember, wood)
- [x] `<SectionTitle>` con clip-reveal
- [x] `<Eyebrow>` mono
- [x] `<CustomCursor>` con variants y label flotante
- [x] `<LenisProvider>` smooth scroll
- [x] `useMagnetic`, `useTilt`, `useSheen`, `usePrefersReducedMotion`
- [x] `<GrainOverlay>` global
- [x] Variantes Motion centralizadas en `lib/motion/variants.ts`

## Fase 3 — Layout + Nav + Footer ✓

- [x] Root layout con LenisProvider + CustomCursor + GrainOverlay
- [x] Header sticky con scroll-state (smart hide al scrollear abajo)
- [x] Drawer mobile con focus trap + escape + restore focus
- [x] Toggle audio con persistencia localStorage (useSyncExternalStore)
- [x] Footer 4 columnas + OpenStatusBadge en vivo
- [x] Skip link al `<main>`
- [x] JSON-LD Restaurant schema global

## Fase 4 — Home ✓

- [x] Hero con plate ornament SVG (tilt 3D + rotación + humo)
- [x] Marquee infinito con mask y pause-on-hover
- [x] Strip de horarios live
- [x] Bento asimétrico con sheen y CTA reservas grande
- [x] Selección de carta horizontal scroll-snap (6 platos)
- [x] Storytelling pinneado con sticky media + 4 estados (sin GSAP, con `useScroll`)
- [x] Galería masonry + lightbox con keyboard nav
- [x] Testimonios carrusel con auto-advance + pausa hover
- [x] CTA reservas grande con magnetic buttons

## Fase 5 — Carta interactiva ✓

- [x] `lib/data/menu.ts` con 11 platos reales del brief
- [x] Placeholders SVG generados por hash + grain + monograma R
- [x] Página `/carta` con filtros sticky (categoría, tags, búsqueda)
- [x] Dish cards con tilt + sheen + tags chip
- [x] Modal con shared layout (layoutId animación de card → modal)
- [x] Buscador `name + galician + description`
- [x] Print stylesheet (oculta header/footer/grain)
- [x] Empty state amigable

## Fase 6 — Historia + Encuéntranos + Reservas ✓

- [x] `/nuestra-historia` con timeline animada (scrollYProgress fill)
- [x] Sección equipo en grid de 3
- [x] `/encuentranos` con MapPreview SVG estilizado (no requiere API key)
- [x] CopyAddress + deeplinks Google/Apple/Waze
- [x] `/reservas` con form en 3 pasos + `useActionState` + server action
- [x] Validación Zod server-side + honeypot
- [x] Confirmación visual + generación .ics inline (data URI)
- [x] Resend opcional (fallback: console.info de la reserva)

## Fase 7 — SEO + Schema + Performance ✓

- [x] Metadata por página (title template, descriptions, canonical)
- [x] OG image dinámica (edge runtime)
- [x] Sitemap + robots
- [x] Schema.org Restaurant JSON-LD (global)
- [x] Headers de seguridad (X-Content-Type-Options, Referrer-Policy, HSTS, Permissions-Policy)
- [x] PWA manifest
- [x] Icon dinámico
- [ ] Verificación Lighthouse (pendiente — requiere deploy en Vercel)

## Fase 8 — Accesibilidad + reduced motion ✓

- [x] `prefers-reduced-motion` respetado en Lenis, custom cursor, plate, tilt, magnetic
- [x] Focus trap en drawer mobile y modal de plato
- [x] Tab order coherente
- [x] Skip link
- [x] `aria-current="page"` en nav
- [x] Alt texts descriptivos en placeholders SVG
- [x] Targets ≥ 44px en mobile
- [x] `lang="es"` + `lang="gl"` en spans gallegos
- [x] `<html lang="es">`

## Fase 9 — Legales + Contenido ✓

- [x] `/aviso-legal` (LSSI-CE)
- [x] `/privacidad` (RGPD)
- [x] Sin lorem ipsum: copy completo del brief
- [x] Vercel Analytics no usa cookies → no banner requerido
- [x] Marcado `[POR CONFIRMAR]` en NIF/denominación legal

## Fase 10 — Testing + Deploy

- [x] Smoke test manual: 6 rutas devuelven 200
- [x] `pnpm build` verde con 14 rutas estáticas
- [x] `pnpm lint` limpio
- [x] `pnpm typecheck` limpio
- [x] Git inicializado con commit inicial
- [ ] Vitest + Playwright (no instalados; tareas reservadas para iteración futura)
- [ ] Deploy Vercel (pendiente de credenciales del cliente)
- [ ] Tag v1.0.0 (al primer deploy)
