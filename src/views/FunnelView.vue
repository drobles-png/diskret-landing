<script setup lang="ts">
// Landing (/). Todo el texto sale de LANDING en src/content/copy.ts.
// Cada botón que abre el registro lleva data-cta="registro" (lo usa el e2e).
// Dirección: editorial de lujo (serif grande, mucho aire, Michelle protagonista) + recursos de
// arquitectura propios de DISKRET: la línea bronce del logo, la retícula de plano y el cajetín.
import { onBeforeUnmount, onMounted, ref, type Directive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BrandLogo from '@/components/BrandLogo.vue'
import RegistrationModal from '@/components/RegistrationModal.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import WeekCountdown from '@/components/WeekCountdown.vue'
import { IS_LOCAL, PERSON_NAME, STORAGE_PREFIX } from '@/config/funnel'
import { LANDING } from '@/content/copy'
import { captureFbParams } from '@/utils/fbclid'

const route = useRoute()
const router = useRouter()
const modalOpen = ref(false)
const showSticky = ref(false)

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

// Aparición suave al entrar en pantalla (una sola vez; sin desplazamiento si reduce-motion)
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
        { rootMargin: '0px 0px -8% 0px' },
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

const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <div class="landing">
    <header class="topbar">
      <div class="wrap topbar__inner">
        <BrandLogo />
        <WeekCountdown />
      </div>
    </header>

    <!-- HERO: titular editorial + Michelle como portada del video -->
    <section class="hero" aria-labelledby="hero-title">
      <div class="wrap hero__inner">
        <div class="hero__copy">
          <p class="eyebrow">{{ LANDING.topbarTag }}</p>
          <h1 id="hero-title" class="hero__title">
            {{ LANDING.headline }}
            <em class="hero__accent">{{ LANDING.headlineAccent }}</em>
          </h1>
          <p class="hero__sub">{{ LANDING.sub }}</p>
          <div class="hero__cta">
            <button type="button" class="btn btn--lg" data-cta="registro" @click="openModal">
              <i class="fa-solid fa-play" aria-hidden="true"></i> {{ LANDING.cta }}
            </button>
            <p class="hero__note">{{ LANDING.ctaNote }}</p>
          </div>
        </div>

        <div class="hero__media">
          <button type="button" class="portrait" data-cta="registro" aria-label="Ver el video completo" @click="openModal">
            <img
              class="portrait__img"
              :src="LANDING.about.photo"
              alt=""
              width="1080"
              height="1080"
              fetchpriority="high"
              decoding="async"
            />
            <span class="portrait__play">
              <span class="portrait__icon" aria-hidden="true"><i class="fa-solid fa-play"></i></span>
              <span class="portrait__label">
                <strong>Mira el video</strong>
                <span>{{ PERSON_NAME }} · Arquitecta</span>
              </span>
            </span>
          </button>
        </div>
      </div>

      <div class="wrap">
        <ul class="hero__audience" role="list">
          <li v-for="a in LANDING.audience" :key="a">{{ a }}</li>
        </ul>
      </div>
    </section>

    <!-- BANDA: el método en seis verbos -->
    <section class="band" aria-label="El Método Diskret en seis pasos">
      <p class="wrap band__words">
        <template v-for="(w, i) in LANDING.methodWords" :key="w">
          <span>{{ w }}</span><span v-if="i < LANDING.methodWords.length - 1" class="band__sep" aria-hidden="true"></span>
        </template>
      </p>
    </section>

    <!-- EL PROBLEMA: la frase de Michelle en grande -->
    <section class="problem" aria-labelledby="pains-title">
      <div class="wrap">
        <p v-reveal class="eyebrow">{{ LANDING.pains.eyebrow }}</p>
        <h2 id="pains-title" v-reveal class="problem__quote">“{{ LANDING.pains.quote }}”</h2>
        <p v-reveal class="problem__lead">{{ LANDING.pains.title }}.</p>
        <ol class="fears" role="list">
          <li v-for="(p, i) in LANDING.pains.items" :key="p.title" v-reveal class="fears__item">
            <span class="fears__num" aria-hidden="true">{{ pad(i + 1) }}</span>
            <h3 class="fears__title">{{ p.title }}</h3>
            <p class="fears__text">{{ p.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- MÉTODO: plano oscuro, título fijo a la izquierda y pasos a la derecha -->
    <section class="method" aria-labelledby="steps-title">
      <div class="wrap method__inner">
        <div class="method__aside">
          <div v-reveal>
            <p class="eyebrow eyebrow--light">{{ LANDING.steps.eyebrow }}</p>
            <h2 id="steps-title" class="method__title">{{ LANDING.steps.title }}</h2>
            <p class="method__statement">{{ LANDING.steps.statement }}</p>
            <button type="button" class="btn btn--light method__cta" data-cta="registro" @click="openModal">
              {{ LANDING.steps.cta }} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <ol class="method__steps" role="list">
          <li v-for="(s, i) in LANDING.steps.items" :key="s.title" v-reveal class="step">
            <span class="step__num" aria-hidden="true">{{ pad(i + 1) }}</span>
            <div>
              <h3 class="step__title">{{ s.title }}</h3>
              <p class="step__text">{{ s.text }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- CIFRAS -->
    <section class="facts" aria-label="DISKRET en cifras">
      <ul class="wrap facts__grid" role="list">
        <li v-for="f in LANDING.facts" :key="f.label" v-reveal class="facts__item">
          <span class="facts__value">{{ f.value }}</span>
          <span class="facts__label">{{ f.label }}</span>
        </li>
      </ul>
    </section>

    <!-- PROYECTOS: láminas con cajetín -->
    <section class="projects" aria-labelledby="projects-title">
      <div class="wrap">
        <div v-reveal class="projects__head">
          <p class="eyebrow">{{ LANDING.projects.eyebrow }}</p>
          <h2 id="projects-title" class="display">{{ LANDING.projects.title }}</h2>
        </div>
        <div class="projects__grid">
          <article v-for="(p, i) in LANDING.projects.items" :key="p.code" v-reveal class="sheet">
            <header class="sheet__head">
              <span class="sheet__code">{{ p.code.replace('Proyecto ', '') }}</span>
              <span class="sheet__place">
                <span>Ubicación</span>
                <strong>{{ p.place }}</strong>
              </span>
            </header>
            <div class="sheet__dim" aria-hidden="true"><span>{{ p.scope }}</span></div>
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
              <caption class="sr-only">Ficha del {{ p.code }}</caption>
              <tbody>
                <tr>
                  <th scope="row">Proyecto</th>
                  <td>{{ p.code }}</td>
                  <th scope="row">Lámina</th>
                  <td>{{ pad(i + 1) }}/{{ pad(LANDING.projects.items.length) }}</td>
                </tr>
                <tr>
                  <th scope="row">Ubicación</th>
                  <td>{{ p.place }}</td>
                  <th scope="row">Estudio</th>
                  <td>DISKRET</td>
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
        <div v-reveal class="about__intro">
          <p class="eyebrow">{{ LANDING.about.eyebrow }}</p>
          <h2 id="about-title" class="display">{{ LANDING.about.title }}</h2>
          <p class="about__text">{{ LANDING.about.text }}</p>
          <p class="about__sign">{{ LANDING.about.sign }}</p>
        </div>

        <div v-reveal class="fit">
          <h3 class="fit__title">{{ LANDING.fit.title }}</h3>
          <ul class="fit__list" role="list">
            <li v-for="(f, i) in LANDING.fit.items" :key="i" :class="{ 'is-no': !f.yes }">
              <span class="fit__mark" aria-hidden="true">{{ f.yes ? 'Sí' : 'No' }}</span>
              <span>
                <span class="sr-only">{{ f.yes ? 'Sí es para ti:' : 'No es para ti:' }}</span>
                {{ f.text }}
              </span>
            </li>
          </ul>
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
        <div class="closing__timer"><WeekCountdown /></div>
      </div>
    </section>

    <SiteFooter :disclaimer="LANDING.disclaimer" />

    <!-- CTA fijo -->
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
$bronze-light: #c9ad8f; // bronce sobre fondos oscuros (7.4:1 sobre $surface-dark)

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
  transform: translateY(16px);
  transition:
    opacity 800ms $ease-out,
    transform 800ms $ease-out;

  &.is-in {
    opacity: 1;
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    transform: none;
    transition: opacity 400ms ease;
  }
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: '';
    width: 32px;
    height: 1px;
    background: currentColor;
    opacity: 0.6;
  }

  &--light {
    color: $bronze-light;
  }
}

// Números en serif con cifras alineadas (Cormorant usa cifras antiguas por defecto)
.step__num,
.facts__value,
.sheet__code {
  font-variant-numeric: lining-nums;
}

.display {
  max-width: 760px;
  margin-top: 18px;
  font-family: $font-serif;
  font-size: clamp(2.2rem, 5.2vw, 3.6rem);
  font-weight: 500;
  line-height: 1.04;
  letter-spacing: -0.01em;
}

// ── Encabezado ────────────────────────────────────────────────────────────────
.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid rgba($line, 0.8);
  background: rgba($surface, 0.86);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 68px;
  }

  @media (max-width: 400px) {
    :deep(.logo) {
      width: 116px;
    }
  }
}

// ── Hero ──────────────────────────────────────────────────────────────────────
.hero {
  padding: 40px 0 0;

  @media (min-width: 960px) {
    padding: 64px 0 0;
  }

  &__inner {
    display: grid;
    gap: 36px;

    @media (min-width: 960px) {
      grid-template-columns: 1.1fr 0.9fr;
      gap: 64px;
      align-items: center;
    }
  }

  &__title {
    margin-top: 22px;
    font-family: $font-serif;
    font-size: clamp(2.7rem, 7.4vw, 5.4rem);
    font-weight: 500;
    line-height: 0.98;
    letter-spacing: -0.02em;
  }

  &__accent {
    display: block;
    margin-top: 0.35em;
    max-width: 16em;
    color: $accent-text;
    font-family: $font-serif;
    font-size: 0.6em;

    @media (min-width: 960px) {
      font-size: 0.48em;
    }
    font-style: italic;
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: 0;
  }

  &__sub {
    max-width: 520px;
    margin-top: 26px;
    color: $ink-muted;
    font-size: 1.06rem;
  }

  &__cta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 14px 20px;
    margin-top: 32px;
  }

  &__note {
    color: $ink-muted;
    font-size: 0.85rem;
  }

  // En celular el retrato va primero que el texto largo: titular → foto → texto → CTA
  @media (max-width: 959px) {
    &__inner {
      display: flex;
      flex-direction: column;
    }
    &__copy {
      display: contents;
    }
    .eyebrow {
      order: 1;
    }
    &__title {
      order: 2;
      margin-top: -14px;
    }
    &__media {
      order: 3;
    }
    &__sub {
      order: 4;
      margin-top: -8px;
    }
    &__cta {
      order: 5;
      margin-top: -12px;

      .btn {
        width: 100%;
      }
    }
  }

  &__audience {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 28px;
    margin-top: 48px;
    padding-top: 22px;
    padding-bottom: 28px;
    border-top: 1px solid $line;
    padding-left: 0;
    list-style: none;

    li {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      color: $ink;
      font-size: 0.92rem;

      &::before {
        content: '';
        width: 6px;
        height: 6px;
        border: 1px solid $accent;
        transform: rotate(45deg);
      }
    }

    @media (min-width: 960px) {
      margin-top: 72px;
    }
  }
}

// Retrato = portada del video, con el corchete del logo detrás
.hero__media {
  position: relative;
  padding: 0 14px 14px 0;

  &::before {
    content: '';
    position: absolute;
    top: 14px;
    right: 0;
    bottom: 0;
    left: 14px;
    border: 1px solid $accent;
    pointer-events: none;
  }
}

.portrait {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  aspect-ratio: 4 / 5;
  max-height: 640px;
  padding: 0;
  border: 0;
  background: $surface-dark;
  cursor: pointer;
  font: inherit;
  overflow: hidden;

  @media (max-width: 959px) {
    aspect-ratio: 1;
  }

  &__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 22% 30%;
    transition: transform 1200ms $ease-out;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba($surface-dark, 0.75), transparent 42%);
  }

  &__play {
    position: absolute;
    z-index: 1;
    right: 20px;
    bottom: 20px;
    left: 20px;
    display: flex;
    align-items: center;
    gap: 14px;
    color: $ink-on-dark;
    text-align: left;
  }

  &__icon {
    display: grid;
    flex: none;
    place-items: center;
    width: 60px;
    height: 60px;
    padding-left: 3px;
    border-radius: 50%;
    background: $raised;
    color: $primary;
    font-size: 1.05rem;
    box-shadow: 0 0 0 8px rgba($raised, 0.2);
    transition: transform 200ms $ease-out;
  }

  &__label {
    display: flex;
    flex-direction: column;
    font-size: 0.82rem;
    color: $ink-on-dark-muted;

    strong {
      color: $ink-on-dark;
      font-family: $font-serif;
      font-size: 1.45rem;
      font-weight: 500;
      line-height: 1.1;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover .portrait__img {
      transform: scale(1.03);
    }
    &:hover .portrait__icon {
      transform: scale(1.06);
    }
  }
  &:active .portrait__icon {
    transform: scale(0.96);
  }
}

// ── Banda del método ──────────────────────────────────────────────────────────
.band {
  padding: 26px 0;
  background: $primary;
  color: $ink-on-dark;

  &__words {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 6px 22px;
    font-family: $font-serif;
    font-size: clamp(1.3rem, 3.2vw, 2rem);
    font-style: italic;
    line-height: 1.2;
  }

  &__sep {
    width: 6px;
    height: 6px;
    border: 1px solid $bronze-light;
    transform: rotate(45deg);
  }
}

// ── Problema ──────────────────────────────────────────────────────────────────
.problem {
  padding: 80px 0 72px;

  @media (min-width: 960px) {
    padding: 128px 0 112px;
  }

  &__quote {
    max-width: 1000px;
    margin-top: 26px;
    font-family: $font-serif;
    font-size: clamp(2rem, 5.4vw, 4rem);
    font-weight: 500;
    line-height: 1.06;
    letter-spacing: -0.01em;
  }

  &__lead {
    max-width: 560px;
    margin-top: 26px;
    color: $ink-muted;
    font-size: 1.1rem;
  }
}

.fears {
  display: grid;
  gap: 0 40px;
  margin: 56px 0 0;
  padding: 0;
  list-style: none;

  @media (min-width: 860px) {
    grid-template-columns: repeat(3, 1fr);
    margin-top: 80px;
  }

  &__item {
    position: relative;
    padding: 26px 0 30px;
    border-top: 1px solid $ink;
  }

  &__num {
    display: block;
    color: $accent-text;
    @include eyebrow;
  }

  &__title {
    margin-top: 16px;
    font-family: $font-serif;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 1.15;
  }

  &__text {
    margin-top: 10px;
    color: $ink-muted;
  }
}

// ── Método (plano) ────────────────────────────────────────────────────────────
.method {
  padding: 80px 0;
  background-color: $surface-dark;
  background-image:
    linear-gradient(rgba(#fff, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(#fff, 0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  color: $ink-on-dark;

  @media (min-width: 960px) {
    padding: 128px 0;
  }

  &__inner {
    display: grid;
    gap: 48px;

    @media (min-width: 960px) {
      grid-template-columns: 0.9fr 1.1fr;
      gap: 96px;
      align-items: start;
    }
  }

  &__aside {
    @media (min-width: 960px) {
      position: sticky;
      top: 120px;
    }
  }

  &__title {
    margin-top: 18px;
    font-family: $font-serif;
    font-size: clamp(2.2rem, 5vw, 3.4rem);
    font-weight: 500;
    line-height: 1.04;
  }

  &__statement {
    position: relative;
    margin-top: 32px;
    padding: 0 0 18px;
    color: $bronze-light;
    font-family: $font-serif;
    font-style: italic;
    font-size: 1.5rem;
    line-height: 1.25;

    &::after {
      @include bracket(14px, rgba($bronze-light, 0.7));
      right: 0;
      bottom: 0;
      left: 0;
    }
  }

  &__cta {
    margin-top: 32px;
  }

  &__steps {
    margin: 0;
    padding: 0;
    list-style: none;
  }
}

.step {
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 8px;
  padding: 28px 0;
  border-top: 1px solid rgba($ink-on-dark, 0.14);

  &:last-child {
    border-bottom: 1px solid rgba($ink-on-dark, 0.14);
  }

  @media (min-width: 960px) {
    grid-template-columns: 96px 1fr;
    padding: 34px 0;
  }

  &__num {
    color: $bronze-light;
    font-family: $font-serif;
    font-size: 2.2rem;
    line-height: 1;

    @media (min-width: 960px) {
      font-size: 3rem;
    }
  }

  &__title {
    font-family: $font-serif;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 1.15;
  }

  &__text {
    margin-top: 8px;
    color: $ink-on-dark-muted;
  }
}

// ── Cifras ────────────────────────────────────────────────────────────────────
.facts {
  border-bottom: 1px solid $line;
  background: $raised;

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    list-style: none;

    @media (min-width: 860px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 36px 16px 36px 0;
    border-bottom: 1px solid $line;

    &:nth-last-child(-n + 2) {
      border-bottom: 0;
    }

    @media (min-width: 860px) {
      padding: 48px 24px;
      border-bottom: 0;
      border-left: 1px solid $line;

      &:first-child {
        padding-left: 0;
        border-left: 0;
      }
    }
  }

  &__value {
    color: $primary;
    font-family: $font-serif;
    font-size: clamp(2.6rem, 6vw, 3.8rem);
    font-weight: 500;
    line-height: 1;
  }

  &__label {
    max-width: 220px;
    color: $ink-muted;
    font-size: 0.92rem;
  }
}

// ── Proyectos (láminas) ───────────────────────────────────────────────────────
.projects {
  padding: 80px 0;

  @media (min-width: 960px) {
    padding: 128px 0;
  }

  &__grid {
    display: grid;
    gap: 32px;
    margin-top: 56px;

    @media (min-width: 900px) {
      grid-template-columns: 1fr 1fr;
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
  outline-offset: 7px;

  @media (min-width: 600px) {
    padding: 40px 40px 0;
  }

  &__head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
  }

  &__code {
    color: $primary;
    font-family: $font-serif;
    font-size: clamp(4rem, 9vw, 5.6rem);
    font-weight: 500;
    line-height: 0.8;
    letter-spacing: -0.02em;
  }

  &__place {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    text-align: right;

    strong {
      font-family: $font-serif;
      font-size: 1.4rem;
      font-weight: 500;
    }
    span {
      @include eyebrow;
      color: $ink-muted;
      font-size: 0.62rem;
    }
  }

  // Línea de cota |←── alcance ──→|
  &__dim {
    position: relative;
    display: flex;
    justify-content: center;
    height: 14px;
    margin: 30px 0;
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
      font-size: 0.62rem;
      line-height: 14px;
    }
  }

  &__body {
    display: grid;
    gap: 18px;
    margin: 0;

    dt {
      @include eyebrow;
      color: $accent-text;
      font-size: 0.64rem;
    }
    dd {
      margin: 6px 0 0;
      color: $ink-muted;
    }
  }

  &__after {
    margin: 28px 0 32px;
    padding-left: 18px;
    border-left: 1px solid $accent;
    color: $ink;
    font-family: $font-serif;
    font-style: italic;
    font-size: 1.45rem;
    line-height: 1.28;
  }

  // Cajetín de plano
  &__block {
    width: calc(100% + 48px);
    margin: auto -24px 0;
    border-collapse: collapse;
    border-top: 1px solid $ink;
    font-size: 0.84rem;

    @media (min-width: 600px) {
      width: calc(100% + 80px);
      margin: auto -40px 0;
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
      font-size: 0.58rem;
      white-space: nowrap;
    }
  }
}

// ── Michelle + ¿Es para ti? ───────────────────────────────────────────────────
.about {
  padding: 80px 0;
  border-top: 1px solid $line;
  background: $raised;

  @media (min-width: 960px) {
    padding: 128px 0;
  }

  &__inner {
    display: grid;
    gap: 56px;

    @media (min-width: 960px) {
      grid-template-columns: 1fr 1fr;
      gap: 96px;
    }
  }

  &__text {
    max-width: 520px;
    margin-top: 24px;
    color: $ink-muted;
    font-size: 1.1rem;
  }

  &__sign {
    margin-top: 28px;
    color: $accent-text;
    font-family: $font-serif;
    font-size: 2rem;
    font-style: italic;
  }
}

.fit {
  &__title {
    font-family: $font-serif;
    font-size: 2rem;
    font-weight: 500;
  }

  &__list {
    margin: 20px 0 0;
    padding: 0;
    list-style: none;

    li {
      display: grid;
      grid-template-columns: 44px 1fr;
      gap: 8px;
      align-items: baseline;
      padding: 18px 0;
      border-top: 1px solid $line;
      color: $ink;
      font-size: 1.02rem;

      &:last-child {
        border-bottom: 1px solid $line;
      }

      &.is-no {
        color: $ink-muted;
      }
    }
  }

  &__mark {
    color: $accent-text;
    font-family: $font-serif;
    font-size: 1.15rem;
    font-style: italic;

    .is-no & {
      color: $ink-muted;
    }
  }
}

// ── Cierre ────────────────────────────────────────────────────────────────────
.closing {
  padding: 88px 0;
  background: $surface-dark;
  color: $ink-on-dark;

  @media (min-width: 960px) {
    padding: 136px 0;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  &__title {
    max-width: 820px;
    margin: 22px 0 18px;
    font-family: $font-serif;
    font-size: clamp(2.6rem, 7vw, 4.6rem);
    font-weight: 500;
    line-height: 1;
  }

  &__sub {
    max-width: 520px;
    margin-bottom: 36px;
    color: $ink-on-dark-muted;
  }

  &__timer {
    margin-top: 28px;

    :deep(.countdown__label) {
      color: $ink-on-dark-muted;
    }
    :deep(.countdown__label small) {
      color: $bronze-light;
    }
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
      font-family: $font-serif;
      font-weight: 500;
      font-size: 1.1rem;
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
