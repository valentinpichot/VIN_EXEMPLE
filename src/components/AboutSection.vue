<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import vineyardSunset from '@/assets/vineyard_sunset.png'

gsap.registerPlugin(ScrollTrigger)

const aboutSection = ref<HTMLElement | null>(null)
const floatingImage = ref<HTMLElement | null>(null)
const textBlocks = ref<HTMLElement[]>([])

const setTextRef = (el: any, index: number) => {
  if (el) textBlocks.value[index] = el
}

onMounted(() => {
  setTimeout(() => {
    // Animation d'apparition des blocs de texte (Staggered)
    textBlocks.value.forEach((block, index) => {
      gsap.fromTo(
        block,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    // Effet de Parallaxe subtil sur l'image flottante
    if (floatingImage.value) {
      gsap.to(floatingImage.value, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: aboutSection.value,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }
  }, 100)
})
</script>

<template>
  <section class="about-section" ref="aboutSection">
    <div class="about-grid">
      <!-- Bloc Principal : Histoire -->
      <div class="about-card about-story" :ref="(el) => setTextRef(el, 0)">
        <!-- Image flottante décorative -->
        <div class="about-story__floating-card" ref="floatingImage">
          <img :src="vineyardSunset" alt="Vignoble Detail" class="about-story__img" />
        </div>

        <div class="about-story__header">
          <h2 class="about-story__title">
            <span class="about-story__title-light">L'Héritage d'un</span>
            <span class="about-story__title-bold">Terroir</span>
          </h2>
          <h3 class="about-story__subtitle">Depuis 1952, l'excellence de Saint-Émilion</h3>
        </div>
        
        <div class="about-story__text">
          <p>
            Niché au cœur de l'appellation prestigieuse de Saint-Émilion, le <strong>Domaine de Valdor</strong> cultive
            l'excellence à travers les générations. Notre famille perpétue un savoir-faire ancestral, alliant une
            tradition viticole stricte et des méthodes douces d'innovation pour créer des vins d'une finesse
            incomparable.
          </p>
          <p style="margin-top: 1.5rem;">
            Nos vignes bénéficient d'un microclimat exceptionnel et d'un sol argilo-calcaire unique. Ces conditions
            idéales offrent à nos cépages — le Merlot majoritaire et le Cabernet Franc — la possibilité d'exprimer la
            quintessence de la minéralité et du fruit de notre terroir.
          </p>
        </div>
      </div>

      <!-- Bloc Citation -->
      <div class="about-card about-quote" :ref="(el) => setTextRef(el, 1)">
        <div class="about-quote__decoration">
          <svg class="about-quote__icon" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>
        <blockquote class="about-quote__text">
          "Le grand vin n'est pas l'œuvre d'un seul homme, mais le dialogue intime entre un terroir, le temps et notre
          passion."
        </blockquote>
        <div class="about-quote__footer">
          <div class="about-quote__info">
            <cite class="about-quote__author">Jean-Marc Valdor</cite>
            <span class="about-quote__role">Maître de Chai</span>
          </div>
          <div class="about-quote__signature">Valdor</div>
        </div>
      </div>

      <!-- Blocs Valeurs -->
      <div class="about-card about-value" :ref="(el) => setTextRef(el, 2)">
        <div class="about-value__badge">
          <span class="about-value__icon">⏳</span>
        </div>
        <h4 class="about-value__title">Savoir-faire</h4>
        <p class="about-value__desc">+70 ans d'expertise</p>
      </div>

      <div class="about-card about-value" :ref="(el) => setTextRef(el, 3)">
        <div class="about-value__badge">
          <span class="about-value__icon">🌱</span>
        </div>
        <h4 class="about-value__title">Bio-dynamie</h4>
        <p class="about-value__desc">Respect de la terre</p>
      </div>

      <div class="about-card about-value" :ref="(el) => setTextRef(el, 4)">
        <div class="about-value__badge">
          <span class="about-value__icon">🍷</span>
        </div>
        <h4 class="about-value__title">Élégance</h4>
        <p class="about-value__desc">Grands Crus classés</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.about-section {
  width: 100%;
  max-width: 1200px;
  margin: $spacing-3xl * 1.5 auto $spacing-3xl * 3;
  padding: 0 $spacing-xl;

  @include respond-to('md') {
    margin: $spacing-xl auto $spacing-2xl;
    padding: 0 $spacing-md;
  }
}

.about-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(auto, auto);
  gap: $spacing-xl;

  @include respond-to('lg') {
    grid-template-columns: 1fr 1fr;
  }

  @include respond-to('md') {
    grid-template-columns: 1fr;
    gap: $spacing-lg;
  }
}

.about-card {
  @include neumorphism('out', 8px, 16px);
  border-radius: $radius-xl;
  padding: $spacing-2xl;
  display: flex;
  flex-direction: column;
  position: relative;

  @include respond-to('md') {
    padding: $spacing-xl $spacing-lg;
    border-radius: $radius-lg;
  }
}

// --- Bloc Histoire Principale (Gros bloc de gauche) ---
.about-story {
  grid-column: span 2;
  overflow: visible; // Pour laisser déborder la carte flottante

  &__floating-card {
    position: absolute;
    top: -40px;
    right: -20px;
    width: 220px;
    height: 280px;
    @include neumorphism('out', 10px, 20px);
    border-radius: $radius-lg;
    padding: $spacing-sm;
    z-index: 10;
    transform: rotate(3deg);
    display: flex;
    overflow: hidden;

    @include respond-to('lg') {
      right: 0;
      width: 180px;
      height: 240px;
    }

    @include respond-to('md') {
      position: relative;
      top: 0;
      right: 0;
      width: 100%;
      height: 200px;
      transform: none;
      margin-bottom: $spacing-lg;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: $radius-md;
  }

  &__header {
    margin-bottom: $spacing-xl;
    position: relative;
    z-index: 2;
  }

  &__title {
    font-family: $font-serif;
    font-size: $font-size-3xl;
    line-height: 1.1;
    margin-bottom: $spacing-sm;
    display: flex;
    flex-direction: column;

    &-light {
      font-weight: $font-weight-light;
      color: $color-primary-light;
      font-style: italic;
    }

    &-bold {
      font-weight: $font-weight-bold;
      color: $color-primary;
      font-size: 1.25em;
      margin-top: -5px;
    }

    @include respond-to('md') {
      font-size: $font-size-xl;
    }
  }

  &__subtitle {
    font-family: $font-sans;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $text-medium;
    text-transform: uppercase;
    letter-spacing: 4px;
    margin-top: $spacing-sm;
  }

  &__text {
    @include neumorphism('in', 6px, 12px);
    padding: $spacing-xl;
    border-radius: $radius-lg;
    font-family: $font-sans;
    font-size: $font-size-md;
    color: $text-medium;
    line-height: 1.9;
    position: relative;
    z-index: 2;

    strong {
      color: $color-primary;
      font-weight: $font-weight-semibold;
    }
  }

  @include respond-to('md') {
    grid-column: span 1;
    padding: $spacing-xl;

    &__text {
      padding: $spacing-md;
    }
  }
}

// --- Bloc Citation (Colonne de droite) ---
// Note: Utilisé comme classe utilitaire sur un .about-card
.about-quote {
  justify-content: space-between;
  text-align: left;
  overflow: hidden;
  // Neumorphism 'in' supprimé pour suivre la demande d'utiliser .about-card (qui est 'out')

  &__decoration {
    margin-bottom: $spacing-md;
  }

  &__icon {
    color: $color-primary;
    opacity: 0.15;
  }

  &__text {
    font-family: $font-serif;
    font-size: $font-size-lg;
    font-style: italic;
    color: $color-primary;
    line-height: 1.6;
    margin-bottom: $spacing-xl;
    position: relative;
    z-index: 1;

    &::before {
      content: '';
      position: absolute;
      left: -15px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: $color-primary-light;
      opacity: 0.3;
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: auto;
  }

  &__info {
    display: flex;
    flex-direction: column;
  }

  &__author {
    font-family: $font-serif;
    font-size: $font-size-md;
    font-weight: $font-weight-bold;
    color: $text-dark;
    font-style: normal;
  }

  &__role {
    font-family: $font-sans;
    font-size: $font-size-xs;
    color: $text-light;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 2px;
  }

  &__signature {
    font-family: 'Playfair Display', serif;
    font-size: $font-size-2xl;
    font-style: italic;
    color: $color-primary-light;
    opacity: 0.4;
    transform: rotate(-10deg);
    user-select: none;
  }

  @include respond-to('lg') {
    grid-column: span 2;
  }

  @include respond-to('md') {
    grid-column: span 1;
  }
}

// --- Blocs Valeurs ---
.about-value {
  grid-column: span 1;
  align-items: center;
  text-align: center;
  justify-content: center;
  transition: transform $transition-base, box-shadow $transition-base;

  &:hover {
    transform: translateY(-5px);

    .about-value__badge {
      @include neumorphism('in', 4px, 10px);
      transform: scale(0.95);
    }
  }

  &__badge {
    width: 70px;
    height: 70px;
    border-radius: $radius-round;
    @include neumorphism('out', 6px, 12px);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: $spacing-lg;
    transition: all $transition-fast;
    background: $bg-color;
  }

  &__icon {
    font-size: $font-size-2xl;
  }

  &__title {
    font-family: $font-sans;
    font-size: $font-size-md;
    font-weight: $font-weight-bold;
    color: $color-primary;
    margin-bottom: $spacing-xs;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  &__desc {
    font-family: $font-sans;
    font-size: $font-size-sm;
    color: $text-medium;
    max-width: 140px;
  }
}
</style>
