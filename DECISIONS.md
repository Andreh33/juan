# DECISIONS — El Refugio de A Cabana

Registro de decisiones técnicas relevantes con razonamiento.

---

## D-001 · Scaffolding manual sobre `create-next-app`

**Fecha:** 2026-05-19
**Contexto:** El brief pide Next 16 + Tailwind 4 + React 19. `create-next-app@latest` ya entrega ese stack, pero genera ficheros base que vamos a reemplazar al 100% (estructura `app/(marketing)/...`, tokens propios, fonts personalizadas, etc.).
**Decisión:** Generar `package.json`, `tsconfig.json`, `next.config.ts`, etc. manualmente con las versiones objetivo, e instalar dependencias en bloque. Esto reduce el ruido inicial y garantiza versiones exactas.
**Trade-off:** Hay que mantener manualmente cosas que `create-next-app` automatizaría (next-env.d.ts, postcss). Se asume.

## D-002 · Motion (motion/react) en lugar de framer-motion

**Fecha:** 2026-05-19
**Contexto:** El paquete `framer-motion` se renombró a `motion` (v12+). El brief lo menciona como `motion/react`.
**Decisión:** Usar `motion` v12 con imports desde `motion/react`. Misma API.

## D-003 · Tailwind CSS 4 con configuración CSS-first (@theme)

**Fecha:** 2026-05-19
**Contexto:** Tailwind 4 cambia el modelo de configuración: en lugar de `tailwind.config.ts`, se usa `@theme` dentro del CSS para declarar tokens.
**Decisión:** Sin `tailwind.config.ts`. Toda la configuración en `app/globals.css` vía `@theme inline` que consume las CSS vars de `styles/tokens.css`. Mantenemos `@tailwindcss/postcss` como única dependencia de build.

## D-004 · Lenis (no @studio-freight/lenis)

**Fecha:** 2026-05-19
**Contexto:** El paquete se renombró de `@studio-freight/lenis` a `lenis` en v1.0.20.
**Decisión:** Usar `lenis` directamente.

## D-005 · Pendiente — Confirmación legal del cliente

**Estado:** abierto
**Contexto:** NIF, denominación fiscal, email definitivo y horarios reales requieren confirmación del cliente.
**Plan:** Marcar con `[POR CONFIRMAR]` en datos y documentar en README.
