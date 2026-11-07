<script setup lang="ts">
// Landing (/). Todo el texto sale de LANDING en src/content/copy.ts.
// Cada botón que abre el registro lleva data-cta="registro" (lo usa el e2e).
// Lenguaje visual de DISKRET: la línea bronce del logo (corchete), el plano y el cajetín de lámina.
import { onBeforeUnmount, onMounted, ref, type Directive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BrandLogo from '@/components/BrandLogo.vue'
import RegistrationModal from '@/components/RegistrationModal.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import WeekCountdown from '@/components/WeekCountdown.vue'
import {
  IS_LOCAL,
  PERSON_NAME,
  STORAGE_PREFIX,
  VSL_POSTER,
  VSL_POSTER_FALLBACK,
} from '@/config/funnel'
import { LANDING } from '@/content/copy'
import { captureFbParams } from '@/utils/fbclid'

const route = useRoute()
const router = useRouter()
const modalOpen = ref(false)
const showSticky = ref(false)

// Portada del video: Cloudinary → archivo local → recuadro oscuro
const poster = ref(VSL_POSTER || VSL_POSTER_FALLBACK)
function onPosterError() {
  poster.value = poster.value !== VSL_POSTER_FALLBACK ? VSL_POSTER_FALLBACK : ''
}

function openModal() {
  // Quien no calificó hace menos de 24 h vuelve a /sin-espacio
  if (!IS_LOCAL) {
    const disqAt = Number(localStorage.getItem(`${STORAGE_PREFIX}_disq_at`))
    if (disqAt && Date.now() - disqAt < 24 * 60 * 60 * 1000) {
      router.push('/sin-espacio')
      return
    }
  }
  modalOpen.value = true
}

// Aparición suave al entrar en pantalla (una sola vez; sin movimiento si reduce-motion)
const io =
  typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('is-in')
              io?.unobserve(e.target)
            }
          }),
        { rootMargin: '0px 0px -10% 0px' },
      )
    : null
const vReveal: Directive<HTMLElement> = {
  mounted(el) {
    if (!io) return
    el.classList.add('reveal')
    io.observe(el)
  },
}

const onScroll = () => (showSticky.value = window.scrollY > 700)

onMounted(() => {
  captureFbParams()
  window.addEventListener('scroll', onScroll, { passive: true })
  // /?editar=1 (desde "Corregir mis datos") reabre el registro con lo guardado
  if (route.query.editar) modalOpen.value = true
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  io?.disconnect()
})
</script>

<template>
  <div class="landing">
    <header class="topbar">
      <div class="wrap topbar__inner">
        <BrandLogo />
        <WeekCountdown />
      </div>
    </header>

    <!-- HERO -->
    <section class="hero" aria-labelledby="hero-title">
      <div class="wrap hero__inner">
        <p class="hero__kicker">{{ LANDING.topbarTag }}</p>
        <h1 id="hero-title" class="hero__title">
          {{ LANDING.headline }} <span class="accent">{{ LANDING.headlineAccent }}</span>
        </h1>
        <p class="hero__sub">{{ LANDING.sub }}</p>

        <div class="frame">
          <button type="button" class="vsl" data-cta="registro" aria-label="Ver el video completo" @click="openModal">
            <img
              v-if="poster"
              class="vsl__poster"
              :src="poster"
              alt=""
              width="1080"
              height="608"
              fetchpriority="high"
              decoding="async"
              @error="onPosterError"
            />
            <span class="vsl__play" aria-hidden="true"><i class="fa-solid fa-play"></i></span>
            <span class="vsl__caption">
              <strong>{{ PERSON_NAME }}</strong>
              <span>{{ LANDING.videoCaption }}</span>
            </span>
          </button>
        </div>

        <ul class="hero__audience" role="list">
          <li v-for="a in LANDING.audience" :key="a">{{ a }}</li>
        </ul>

        <button type="button" class="btn btn--lg" data-cta="registro" @click="openModal">
          <i class="fa-solid fa-play" aria-hidden="true"></i> {{ LANDING.cta }}
        </button>
        <p class="hero__note">{{ LANDING.ctaNote }}</p>
      </div>
    </section>

    <!-- EL PROBLEMA: cita grande + los 3 miedos, sin tarjetas -->
    <section class="problem" aria-labelledby="pains-title">
      <div class="wrap problem__inner">
        <div v-reveal class="problem__head">
          <p class="eyebrow">{{ LANDING.pains.eyebrow }}</p>
          <h2 id="pains-title" class="section__title">{{ LANDING.pains.title }}</h2>
          <blockquote class="problem__quote">“{{ LANDING.pains.quote }}”</blockquote>
        </div>
        <ol class="fears" role="list">
          <li v-for="(p, i) in LANDING.pains.items" :key="p.title" v-reveal class="fears__item">
            <span class="fears__num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
            <div>
              <h3 class="fears__title">{{ p.title }}</h3>
              <p class="fears__text">{{ p.text }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- MÉTODO DISKRET: sección oscura con retícula de plano -->
    <section class="method" aria-labelledby="steps-title">
      <div class="wrap">
        <div v-reveal class="method__head">
          <p class="eyebrow eyebrow--light">{{ LANDING.steps.eyebrow }}</p>
          <h2 id="steps-title" class="section__title">{{ LANDING.steps.title }}</h2>
        </div>
        <ol class="method__steps" role="list">
          <li v-for="(s, i) in LANDING.steps.items" :key="s.title" v-reveal class="step">
            <span class="step__num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="step__title">{{ s.title }}</h3>
            <p class="step__text">{{ s.text }}</p>
          </li>
        </ol>
        <p v-reveal class="method__statement">{{ LANDING.steps.statement }}</p>
      </div>
    </section>

    <!-- PROYECTOS: cada uno como una lámina con su cajetín -->
    <section class="projects" aria-labelledby="projects-title">
      <div class="wrap">
        <div v-reveal class="projects__head">
          <p class="eyebrow">{{ LANDING.projects.eyebrow }}</p>
          <h2 id="projects-title" class="section__title">{{ LANDING.projects.title }}</h2>
        </div>
        <div class="projects__grid">
          <article v-for="(p, i) in LANDING.projects.items" :key="p.code" v-reveal class="sheet">
            <div class="sheet__dim" aria-hidden="true">
              <span>{{ p.scope }}</span>
            </div>
            <dl class="sheet__body">
              <div>
                <dt>El reto</dt>
                <dd>{{ p.before }}</dd>
              </div>
              <div>
                <dt>Lo que hicimos</dt>
                <dd>{{ p.what }}</dd>
              </div>
            </dl>
            <p class="sheet__after">{{ p.after }}</p>
            <table class="sheet__block">
              <caption class="sr-only">{{ p.code }}</caption>
              <tbody>
                <tr>
                  <th scope="row">Proyecto</th>
                  <td class="sheet__code">{{ p.code.replace('Proyecto ', '') }}</td>
                  <th scope="row">Lámina</th>
                  <td>{{ String(i + 1).padStart(2, '0') }}/{{ String(LANDING.projects.items.length).padStart(2, '0') }}</td>
                </tr>
                <tr>
                  <th scope="row">Ubicación</th>
                  <td>{{ p.place }}</td>
                  <th scope="row">Alcance</th>
                  <td>{{ p.scope }}</td>
                </tr>
              </tbody>
            </table>
          </article>
        </div>
      </div>
    </section>

    <!-- MICHELLE + ¿ES PARA TI? -->
    <section class="about" aria-labelledby="about-title">
      <div class="wrap about__inner">
        <figure v-reveal class="about__figure">
          <img
            :src="LANDING.about.photo"
            :alt="PERSON_NAME"
            width="1080"
            height="1080"
            loading="lazy"
            decoding="async"
          />
          <figcaption>{{ PERSON_NAME }} · Arquitecta</figcaption>
        </figure>
        <div class="about__copy">
          <div v-reveal>
            <p class="eyebrow">{{ LANDING.about.eyebrow }}</p>
            <h2 id="about-title" class="section__title">{{ LANDING.about.title }}</h2>
            <p class="about__text">{{ LANDING.about.text }}</p>
          </div>

          <div v-reveal class="fit" aria-labelledby="fit-title">
            <h3 id="fit-title" class="fit__title">{{ LANDING.fit.title }}</h3>
            <ul class="fit__list" role="list">
              <li v-for="(f, i) in LANDING.fit.items" :key="i" :class="{ 'is-no': !f.yes }">
                <i :class="['fa-solid', f.yes ? 'fa-check' : 'fa-xmark']" aria-hidden="true"></i>
                <span>
                  <span class="sr-only">{{ f.yes ? 'Sí es para ti:' : 'No es para ti:' }}</span>
                  {{ f.text }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- CIERRE -->
    <section class="closing" aria-labelledby="closing-title">
      <div class="wrap closing__inner">
        <p class="eyebrow eyebrow--light">{{ LANDING.closing.eyebrow }}</p>
        <h2 id="closing-title" class="closing__title">{{ LANDING.closing.title }}</h2>
        <p class="closing__sub">{{ LANDING.closing.sub }}</p>
        <button type="button" class="btn btn--lg btn--light" data-cta="registro" @click="openModal">
          <i class="fa-solid fa-play" aria-hidden="true"></i> {{ LANDING.closing.cta }}
        </button>
      </div>
    </section>

    <SiteFooter :disclaimer="LANDING.disclaimer" />

    <!-- CTA fijo en celular -->
    <Transition name="sticky">
      <div v-if="showSticky && !modalOpen" class="sticky" role="region" aria-label="Ver el video">
        <div class="sticky__copy">
          <strong>{{ LANDING.sticky.title }}</strong>
          <span>{{ LANDING.sticky.sub }}</span>
        </div>
        <button type="button" class="btn" data-cta="registro" @click="openModal">
          {{ LANDING.sticky.cta }} <i class="fa-solid fa-play" aria-hidden="true"></i>
        </button>
      </div>
    </Transition>

    <RegistrationModal :open="modalOpen" @close="modalOpen = false" />
  </div>
</template>

<style scoped lang="scss">
// ── Recursos de marca ─────────────────────────────────────────────────────────
// Corchete bronce del logo: líneas a los lados y abajo, abierto arriba.
@mixin bracket($h: 18px, $color: $accent) {
  content: '';
  position: absolute;
  height: $h;
  border: 1px solid $color;
  border-top: 0;
  pointer-events: none;
}

.reveal {
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity 700ms $ease-out,
    transform 700ms $ease-out;

  &.is-in {
    opacity: 1;
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    transform: none;
    transition: opacity 400ms ease;
  }
}

.section__title {
  max-width: 680px;
  margin: 14px 0 0;
  font-size: clamp(1.75rem, 4.4vw, 2.6rem);
  font-weight: 300;
  line-height: 1.12;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: '';
    width: 28px;
    height: 1px;
    background: $accent;
  }

  &--light {
    color: #c9ad8f;
  }
}

// ── Encabezado ────────────────────────────────────────────────────────────────
.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid $line;
  background: rgba($surface, 0.88);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 68px;
  }

  @media (max-width: 400px) {
    :deep(.logo) {
      width: 118px;
    }
  }
}

// ── Hero ──────────────────────────────────────────────────────────────────────
.hero {
  padding: 48px 0 40px;

  @media (min-width: 900px) {
    padding: 72px 0 64px;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  &__kicker {
    @include eyebrow;
    color: $ink-muted;
  }

  &__title {
    max-width: 860px;
    margin-top: 18px;
    font-size: clamp(2.1rem, 6.4vw, 3.6rem);
    font-weight: 300;
    letter-spacing: -0.02em;
    line-height: 1.08;
  }

  &__sub {
    max-width: 600px;
    margin: 22px 0 36px;
    color: $ink-muted;
    font-size: 1.05rem;
  }

  &__audience {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 6px 18px;
    margin: 28px 0 22px;
    padding: 0;
    list-style: none;

    li {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: $ink;
      font-size: 0.92rem;

      &::before {
        content: '';
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: $accent;
      }
    }
  }

  &__note {
    margin-top: 12px;
    color: $ink-muted;
    font-size: 0.85rem;
  }
}

.accent {
  display: block;
  margin-top: 0.3em;
  color: $accent-text;
  font-family: $font-serif;
  font-style: italic;
  font-weight: 500;
  font-size: 0.8em;
  letter-spacing: 0;
}

// Video enmarcado con el corchete del logo
.frame {
  position: relative;
  width: 100%;
  max-width: 820px;
  padding-bottom: 14px;

  &::after {
    @include bracket(48px);
    right: -14px;
    bottom: 0;
    left: -14px;

    @media (max-width: 600px) {
      right: -8px;
      left: -8px;
    }
  }
}

.vsl {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 16 / 9;
  padding: 0;
  border: 0;
  border-radius: $radius-sm;
  background: $surface-dark;
  color: $ink-on-dark;
  cursor: pointer;
  font: inherit;
  overflow: hidden;
  box-shadow: 0 30px 60px -30px rgba($surface-dark, 0.45);

  &__poster {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 30% 35%;
    transition: transform 900ms $ease-out;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba($surface-dark, 0.72), transparent 50%);
    pointer-events: none;
  }

  &__play {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    width: 78px;
    height: 78px;
    padding-left: 4px;
    border-radius: 50%;
    background: rgba($raised, 0.94);
    color: $primary;
    font-size: 1.35rem;
    box-shadow: 0 0 0 1px rgba($raised, 0.5), 0 0 0 12px rgba($raised, 0.18);
    transition: transform 200ms $ease-out;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover .vsl__play {
      transform: scale(1.06);
    }
    &:hover .vsl__poster {
      transform: scale(1.02);
    }
  }
  &:active .vsl__play {
    transform: scale(0.96);
  }

  &__caption {
    position: absolute;
    z-index: 1;
    left: 20px;
    bottom: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: $ink-on-dark-muted;
    font-size: 0.8rem;
    text-align: left;

    strong {
      color: $ink-on-dark;
      font-weight: 500;
      font-size: 0.98rem;
    }
  }
}

// ── Problema ──────────────────────────────────────────────────────────────────
.problem {
  padding: 64px 0;
  border-top: 1px solid $line;

  @media (min-width: 900px) {
    padding: 104px 0;
  }

  &__inner {
    display: grid;
    gap: 40px;

    @media (min-width: 900px) {
      grid-template-columns: 1fr 1fr;
      gap: 80px;
    }
  }

  &__quote {
    margin: 32px 0 0;
    padding-left: 20px;
    border-left: 1px solid $accent;
    color: $ink;
    font-family: $font-serif;
    font-style: italic;
    font-size: clamp(1.35rem, 3vw, 1.65rem);
    line-height: 1.35;
  }
}

.fears {
  margin: 0;
  padding: 0;
  list-style: none;

  &__item {
    display: grid;
    grid-template-columns: 56px 1fr;
    gap: 8px;
    padding: 26px 0;
    border-top: 1px solid $line;

    &:last-child {
      border-bottom: 1px solid $line;
    }
  }

  &__num {
    color: $accent-text;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 1;
  }

  &__title {
    font-size: 1.2rem;
    font-weight: 400;
  }

  &__text {
    margin-top: 6px;
    color: $ink-muted;
  }
}

// ── Método (plano) ────────────────────────────────────────────────────────────
.method {
  position: relative;
  padding: 72px 0;
  background-color: $surface-dark;
  background-image:
    linear-gradient(rgba(#fff, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(#fff, 0.035) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center top;
  color: $ink-on-dark;

  @media (min-width: 900px) {
    padding: 112px 0;
  }

  &__steps {
    display: grid;
    gap: 0 48px;
    margin: 48px 0 0;
    padding: 0;
    list-style: none;

    @media (min-width: 700px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 1000px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__statement {
    position: relative;
    max-width: 760px;
    margin: 56px auto 0;
    padding: 0 8px 22px;
    color: $ink-on-dark;
    font-family: $font-serif;
    font-style: italic;
    font-size: clamp(1.6rem, 4.2vw, 2.4rem);
    line-height: 1.2;
    text-align: center;

    &::after {
      @include bracket(26px, #c9ad8f);
      right: 0;
      bottom: 0;
      left: 0;
    }
  }
}

.step {
  padding: 28px 0 32px;
  border-top: 1px solid rgba($ink-on-dark, 0.14);

  // En celular: número a la izquierda, más compacto
  @media (max-width: 699px) {
    display: grid;
    grid-template-columns: 52px 1fr;
    column-gap: 4px;
    padding: 22px 0;

    .step__num {
      grid-row: span 2;
      font-size: 1.9rem;
    }
    .step__title {
      margin-top: 2px;
    }
  }

  &__num {
    display: block;
    color: #c9ad8f;
    font-weight: 200;
    font-size: 2.6rem;
    line-height: 1;
    letter-spacing: -0.02em;
  }

  &__title {
    margin-top: 18px;
    font-size: 1.2rem;
    font-weight: 400;
  }

  &__text {
    margin-top: 8px;
    color: $ink-on-dark-muted;
    font-size: 0.95rem;
  }
}

// ── Proyectos (láminas con cajetín) ───────────────────────────────────────────
.projects {
  padding: 64px 0;

  @media (min-width: 900px) {
    padding: 104px 0;
  }

  &__grid {
    display: grid;
    gap: 24px;
    margin-top: 44px;

    @media (min-width: 860px) {
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }
  }
}

.sheet {
  display: flex;
  flex-direction: column;
  padding: 28px 24px 0;
  border: 1px solid $ink;
  background: $raised;
  outline: 1px solid $line;
  outline-offset: 6px;

  @media (min-width: 600px) {
    padding: 36px 36px 0;
  }

  // Línea de cota: |←── alcance ──→|
  &__dim {
    position: relative;
    display: flex;
    justify-content: center;
    height: 14px;
    margin-bottom: 30px;
    border-inline: 1px solid $accent;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      right: 0;
      left: 0;
      height: 1px;
      background: $accent;
    }

    span {
      position: relative;
      top: -2px;
      padding: 0 10px;
      background: $raised;
      color: $accent-text;
      @include eyebrow;
      font-size: 0.66rem;
      line-height: 14px;
    }
  }

  &__body {
    display: grid;
    gap: 18px;
    margin: 0;

    dt {
      @include eyebrow;
      color: $ink-muted;
      font-size: 0.66rem;
    }
    dd {
      margin: 6px 0 0;
      color: $ink-muted;
    }
  }

  &__after {
    margin: 26px 0 30px;
    color: $ink;
    font-family: $font-serif;
    font-style: italic;
    font-size: 1.4rem;
    line-height: 1.3;
  }

  // Cajetín de plano
  &__block {
    width: calc(100% + 48px);
    margin: auto -24px 0;
    border-collapse: collapse;
    border-top: 1px solid $ink;
    font-size: 0.85rem;

    @media (min-width: 600px) {
      width: calc(100% + 72px);
      margin: auto -36px 0;
    }

    th,
    td {
      padding: 9px 12px;
      border: 1px solid $line;
      text-align: left;
      vertical-align: top;
    }
    tr:first-child > * {
      border-top: 0;
    }
    tr > :first-child {
      border-left: 0;
    }
    tr > :last-child {
      border-right: 0;
    }
    tr:last-child > * {
      border-bottom: 0;
    }

    th {
      width: 1%;
      color: $ink-muted;
      @include eyebrow;
      font-size: 0.6rem;
      white-space: nowrap;
    }
    td {
      color: $ink;
    }
  }

  &__code {
    font-weight: 500;
    letter-spacing: 0.08em;
  }
}

// ── Michelle + ¿Es para ti? ───────────────────────────────────────────────────
.about {
  padding: 64px 0 72px;
  border-top: 1px solid $line;
  background: $raised;

  @media (min-width: 900px) {
    padding: 104px 0;
  }

  &__inner {
    display: grid;
    gap: 44px;

    @media (min-width: 900px) {
      grid-template-columns: 5fr 6fr;
      gap: 72px;
      align-items: start;
    }
  }

  &__figure {
    position: relative;
    margin: 0 0 0 0;
    padding-bottom: 14px;

    img {
      position: relative;
      z-index: 1;
      display: block;
      width: 100%;
      height: auto;
      aspect-ratio: 4 / 5;
      object-fit: cover;
      object-position: 22% center;
      border-radius: $radius-sm;
    }

    &::after {
      @include bracket(60px);
      right: -12px;
      bottom: 0;
      left: -12px;
    }

    figcaption {
      position: absolute;
      z-index: 2;
      left: 16px;
      bottom: 30px;
      padding: 6px 10px;
      background: rgba($raised, 0.92);
      color: $ink;
      @include eyebrow;
      font-size: 0.62rem;
    }

    @media (min-width: 900px) {
      position: sticky;
      top: 100px;
    }
  }

  &__text {
    margin-top: 20px;
    color: $ink-muted;
    font-size: 1.08rem;
  }
}

.fit {
  margin-top: 44px;
  padding-top: 32px;
  border-top: 1px solid $line;

  &__title {
    font-size: 1.5rem;
    font-weight: 300;
  }

  &__list {
    margin: 20px 0 0;
    padding: 0;
    list-style: none;

    li {
      display: grid;
      grid-template-columns: 28px 1fr;
      gap: 8px;
      padding: 14px 0;
      border-bottom: 1px solid $line;
      color: $ink;

      i {
        margin-top: 5px;
        color: $accent;
        font-size: 0.9rem;
      }

      &.is-no {
        color: $ink-muted;

        i {
          color: $ink-muted;
        }
      }
    }
  }
}

// ── Cierre ────────────────────────────────────────────────────────────────────
.closing {
  padding: 80px 0;
  background: $surface-dark;
  color: $ink-on-dark;

  @media (min-width: 900px) {
    padding: 112px 0;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  &__title {
    max-width: 680px;
    margin: 16px 0 14px;
    font-size: clamp(2rem, 5.4vw, 3rem);
    font-weight: 300;
  }

  &__sub {
    max-width: 540px;
    margin-bottom: 32px;
    color: $ink-on-dark-muted;
  }
}

.btn--light {
  background: $raised;
  color: $primary;

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      background: $ink-on-dark;
    }
  }
}

// ── CTA fijo ──────────────────────────────────────────────────────────────────
.sticky {
  position: fixed;
  right: 12px;
  bottom: calc(12px + env(safe-area-inset-bottom));
  left: 12px;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 10px 10px 16px;
  border: 1px solid $line;
  border-radius: $radius-md;
  background: $raised;
  box-shadow: $shadow-modal;

  &__copy {
    display: flex;
    flex-direction: column;
    min-width: 0;
    color: $ink-muted;
    font-size: 0.8rem;

    strong {
      overflow: hidden;
      color: $ink;
      font-weight: 500;
      font-size: 0.92rem;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .btn {
    flex: none;
  }

  @media (min-width: 900px) {
    right: auto;
    left: 50%;
    width: 560px;
    transform: translateX(-50%);
  }
}

.sticky-enter-active,
.sticky-leave-active {
  transition:
    opacity 0.2s ease,
    translate 0.25s $ease-out;
}
.sticky-enter-from,
.sticky-leave-to {
  opacity: 0;
  translate: 0 12px;
}
</style>
