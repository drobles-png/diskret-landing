<script setup lang="ts">
// Logo DISKRET redibujado en SVG (wordmark Jost + "VIDA PARA TUS ESPACIOS" + línea bronce),
// para que se vea nítido y cambie de color sobre fondos oscuros (light).
import { BRAND_NAME } from '@/config/funnel'

defineProps<{ light?: boolean }>()
</script>

<template>
  <svg
    class="logo"
    :class="{ 'logo--light': light }"
    viewBox="0 0 300 74"
    role="img"
    :aria-label="`${BRAND_NAME} · Vida para tus espacios`"
  >
    <text class="logo__word" x="150" y="40" text-anchor="middle" textLength="296" lengthAdjust="spacing">DISKRET</text>
    <text class="logo__tag" x="150" y="58" text-anchor="middle" textLength="214" lengthAdjust="spacing">
      VIDA PARA TUS ESPACIOS
    </text>
    <polyline class="logo__line" points="34,42 34,70 270,70 270,42" />
  </svg>
</template>

<style scoped lang="scss">
.logo {
  display: block;
  width: 148px;
  height: auto;
  overflow: visible;

  &__word {
    fill: $primary;
    font-family: $font-sans;
    font-size: 48px;
    font-weight: 400;
  }
  &__tag {
    fill: $ink-muted;
    font-family: $font-sans;
    font-size: 10.5px;
    font-weight: 400;
  }
  &__line {
    fill: none;
    stroke: $accent;
    stroke-width: 1.2;
  }

  &--light {
    .logo__word {
      fill: $ink-on-dark;
    }
    .logo__tag {
      fill: $ink-on-dark-muted;
    }
  }
}
</style>
