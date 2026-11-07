<script setup lang="ts">
// Temporizador del encabezado: ciclos de 12 h. Al llegar a 0 vuelve a empezar solo.
// Los ciclos van anclados al reloj (00:00 y 12:00 hora de Ecuador), así todos los visitantes ven
// la misma cuenta y recargar la página no la reinicia. Texto en LANDING.timer (src/content/copy.ts).
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { LANDING } from '@/content/copy'

const CYCLE_MS = 12 * 60 * 60 * 1000
const EC_OFFSET_MS = -5 * 60 * 60 * 1000 // Ecuador: UTC-5 sin horario de verano

function msLeft(now: number): number {
  const elapsed = (((now + EC_OFFSET_MS) % CYCLE_MS) + CYCLE_MS) % CYCLE_MS
  return CYCLE_MS - elapsed
}

const now = ref(Date.now())
let timer: number | undefined

onMounted(() => {
  timer = window.setInterval(() => (now.value = Date.now()), 1000)
})
onBeforeUnmount(() => window.clearInterval(timer))

const parts = computed(() => {
  const s = Math.floor(msLeft(now.value) / 1000)
  const pad = (n: number) => String(n).padStart(2, '0')
  return [
    { v: pad(Math.floor(s / 3600)), u: 'h' },
    { v: pad(Math.floor((s % 3600) / 60)), u: 'm' },
    { v: pad(s % 60), u: 's' },
  ]
})

const label = computed(() => parts.value.map((p) => `${p.v}${p.u}`).join(' '))
</script>

<template>
  <div class="countdown" role="timer" :aria-label="`${LANDING.timer.label}: ${LANDING.timer.prefix.toLowerCase()} ${label}`">
    <span class="countdown__label" aria-hidden="true">
      <span class="countdown__what">{{ LANDING.timer.label }}</span>
      <small>{{ LANDING.timer.prefix }}</small>
    </span>
    <span class="countdown__time" aria-hidden="true">
      <span v-for="p in parts" :key="p.u" class="countdown__unit">
        <b>{{ p.v }}</b><i>{{ p.u }}</i>
      </span>
    </span>
  </div>
</template>

<style scoped lang="scss">
.countdown {
  display: flex;
  align-items: center;
  gap: 14px;

  &__label {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    @include eyebrow;
    font-size: 0.66rem;
    color: $ink-muted;
    line-height: 1.5;

    small {
      color: $accent-text;
      white-space: nowrap;
      font-size: inherit;
    }

  }

  &__what {
    @media (max-width: 560px) {
      display: none;
    }
  }

  @media (max-width: 560px) {
    gap: 8px;
  }

  &__time {
    display: flex;
    gap: 2px;
    padding: 6px 10px;
    border: 1px solid $line;
    border-bottom-color: $accent;
    border-radius: $radius-sm;
    background: $raised;
  }

  &__unit {
    display: inline-flex;
    align-items: baseline;
    padding: 0 3px;

    b {
      min-width: 2ch;
      color: $primary;
      font-weight: 500;
      font-size: 1rem;
      font-variant-numeric: tabular-nums;
      text-align: right;
    }
    i {
      margin-left: 1px;
      color: $ink-muted;
      font-style: normal;
      font-size: 0.68rem;
    }

  }
}
</style>
