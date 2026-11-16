# DISKRET — funnel VSL (Michelle Rodríguez, arquitecta)

Creado con la skill `landings-vsl` desde `drobles-png/landings-vsl`. Repo: `BAKANO-PROJECTS/diskret-landing` (privado; remoto `personal` = drobles-png). Vercel: equipo `bakano-proyects`, proyecto `diskret-landing` → https://diskret-landing.vercel.app (deploy por CLI: `vercel deploy --prod --scope bakano-proyects`; Hobby no conecta repos privados de organización).
Cliente: DISKRET · "Vida para tus espacios" · IG @diskretbymr · FB diskretarqmichellerodriguez.
Oferta: asesoría de diseño con Michelle (diseño + remodelación + decoración + muebles de taller propio).

## Flujo (agenda, sin pago)
`/` → registro (nombre, apellido, email, WhatsApp, **ciudad**) → `/ver-video` → cualificación →
califica: `/agendar` (calendario GHL) → `/cita-confirmada` · no califica: `/sin-espacio` (24 h).
`PAYMENT_ENABLED = false`.

## Config usada (`src/config/funnel.ts`)
`CLIENT` lleno · `ASK_CITY = true` · `DEFAULT_COUNTRY = 'EC'` · `STORAGE_PREFIX = 'dk'` ·
`FUNNEL_TAG = 'funnel-diskret'` · `VSL_POSTER_FALLBACK = '/vsl-poster.webp'` · `SITE_URL` vacío (URL de Vercel).

## Landing (FunnelView.vue)
Dirección: editorial de lujo ("Exaggerated Minimalism", ui-ux-pro-max): titulares grandes en
Cormorant Garamond, mucho aire, Michelle protagonista, recursos de arquitectura propios.
Bloques (4): Hero (titular + retrato de Michelle como portada del video) → Banda con los 6 verbos del
método → Método (plano oscuro, línea de tiempo de 6 pasos) → Michelle (foto + presentación + cifras + CTA).
Sin problema/miedos, proyectos, ¿Es para ti?, cierre, testimonios ni FAQ (pedido de Bakano). Todo el copy sale del VSL (`src/content/copy.ts`).
Temporizador (`src/components/CountdownTimer.vue`): ciclos de 12 h anclados a las 00:00 y 12:00 hora
de Ecuador; al llegar a 0 se reinicia solo y todos los visitantes ven la misma cuenta. Texto en `LANDING.timer`.

## Cualificación (`src/utils/qualification.ts`)
Preguntas: `momento` (casa_nueva, no_representa, remodelar, solo_info) · `alcance` (casa_completa,
un_espacio, un_mueble) · `prioridad` (una_vision, sin_desgaste, mas_barato) · abierta `objetivo`.
**No califica** si: `momento = solo_info` o `alcance = un_mueble` o `prioridad = mas_barato`
(del VSL: "si buscas cambiar un solo mueble rápido, o la opción más barata… no somos para ti").

## Marca
Tokens en `src/styles/tokens.scss`: azul pizarra `#34485a` (wordmark), bronce `#9a7d5f` (línea del
logo), marfil `#f7f3ee`. Títulos (h1/h2) en Cormorant Garamond 500; textos y botones en Jost.
Logo redibujado en SVG en `src/components/BrandLogo.vue`; favicon en `public/favicon.svg`.

## Pendientes
- `WISTIA_MEDIA_ID` (video del VSL) — lo manda Bakano/cliente.
- Calendario GHL "Asesoría de diseño con Michelle" (`qLyHPUXeUKuIDfrwModv`, 60 min, Lun–Vie 9–17, Google Meet): Michelle debe conectar su Google Calendar en GHL para que se cree el link de Meet.
- Meta: Pixel en `funnel.ts` y `META_PIXEL_ID` + `META_CAPI_TOKEN` en Vercel (production). `META_CAPI_TEST_EVENT_CODE` puesto en Vercel para el Probador: QUITARLO y redeploy antes de pautar. Modo landing: GHL sin acción de Meta en los flujos del funnel.
- `LEGAL` (razón social, RUC, ciudad, correo): hoy las páginas legales muestran "[Pendiente]". No pautar así.
- Confirmar con Michelle la regla de cualificación (¿presupuesto mínimo?, ¿ciudades que atienden?).
