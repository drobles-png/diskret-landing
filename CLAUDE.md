# DISKRET — funnel VSL (Michelle Rodríguez, arquitecta)

Creado con la skill `landings-vsl` desde `drobles-png/landings-vsl`. Repo: `drobles-png/diskret-landing`.
Cliente: DISKRET · "Vida para tus espacios" · IG @diskretbymr · FB diskretarqmichellerodriguez.
Oferta: asesoría de diseño con Michelle (diseño + remodelación + decoración + muebles de taller propio).

## Flujo (agenda, sin pago)
`/` → registro (nombre, apellido, email, WhatsApp, **ciudad**) → `/ver-video` → cualificación →
califica: `/agendar` (calendario GHL) → `/cita-confirmada` · no califica: `/sin-espacio` (24 h).
`PAYMENT_ENABLED = false`.

## Config usada (`src/config/funnel.ts`)
`CLIENT` lleno · `ASK_CITY = true` · `DEFAULT_COUNTRY = 'EC'` · `STORAGE_PREFIX = 'dk'` ·
`FUNNEL_TAG = 'funnel-diskret'` · `VSL_POSTER_FALLBACK = '/vsl-poster.webp'` · `SITE_URL` vacío (URL de Vercel).

## Landing (FunnelView.vue) — 6 bloques
Hero (video enmarcado con el corchete bronce del logo) → Problema (cita + 3 miedos) → Método Diskret
(sección oscura con retícula de plano, 6 pasos) → Proyectos MC y JR (láminas con cajetín de plano) →
Michelle + ¿Es para ti? → Cierre. Sin testimonios ni FAQ. Todo el copy sale del VSL (`src/content/copy.ts`).
Temporizador en el encabezado (`src/components/WeekCountdown.vue`): cuenta hasta el domingo 23:59 hora
de Ecuador y se reinicia cada semana; texto en `LANDING.timer`.

## Cualificación (`src/utils/qualification.ts`)
Preguntas: `momento` (casa_nueva, no_representa, remodelar, solo_info) · `alcance` (casa_completa,
un_espacio, un_mueble) · `prioridad` (una_vision, sin_desgaste, mas_barato) · abierta `objetivo`.
**No califica** si: `momento = solo_info` o `alcance = un_mueble` o `prioridad = mas_barato`
(del VSL: "si buscas cambiar un solo mueble rápido, o la opción más barata… no somos para ti").

## Marca
Tokens en `src/styles/tokens.scss`: azul pizarra `#34485a` (wordmark), bronce `#9a7d5f` (línea del
logo), marfil `#f7f3ee`. Tipografía Jost (+ Cormorant Garamond itálica para acentos).
Logo redibujado en SVG en `src/components/BrandLogo.vue`; favicon en `public/favicon.svg`.

## Pendientes
- `WISTIA_MEDIA_ID` (video del VSL) — lo manda Bakano/cliente.
- `GHL_CONTACT_WEBHOOK`, `GHL_QUALIFICATION_WEBHOOK` — crear en la subcuenta de GHL de Diskret.
- `GHL_BOOKING_CALENDAR` + `GHL_BOOKING_FRAME_ID` — código de inserción del calendario.
- `META_PIXEL_ID` + `META_CAPI_TOKEN` (este solo en Vercel/.env.local).
- `LEGAL` (razón social, RUC, ciudad, correo): hoy las páginas legales muestran "[Pendiente]". No pautar así.
- `og:image` en `index.html` es relativa: poner URL absoluta al publicar.
- Confirmar con Michelle la regla de cualificación (¿presupuesto mínimo?, ¿ciudades que atienden?).
- Fotos o renders de los proyectos MC y JR (hoy la sección va solo con texto).
