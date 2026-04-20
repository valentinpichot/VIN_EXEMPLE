<!--
  HeroWidget.vue — Carte principale du Domaine de Valdor
  Design neumorphique avec image vignoble, badge glassmorphique,
  panneau d'informations et bouton de réservation animé GSAP.
-->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import vineyardHero from '@/assets/vineyard-hero.png'

// --- Références template pour les animations GSAP ---
const heroCard = ref<HTMLElement | null>(null)
const heroImage = ref<HTMLElement | null>(null)
const heroOverlay = ref<HTMLElement | null>(null)
const badge = ref<HTMLElement | null>(null)
const titleBlock = ref<HTMLElement | null>(null)
const statsItems = ref<HTMLElement[]>([])
const reserveButton = ref<HTMLElement | null>(null)

// --- État du bouton réserver ---
const isButtonPressed = ref(false)

/**
 * Gère l'animation du bouton au survol (effet enfoncé)
 */
const handleButtonEnter = () => {
  isButtonPressed.value = true
  gsap.to(reserveButton.value, {
    scale: 0.93,
    duration: 0.2,
    ease: 'power2.out',
  })
}

const handleButtonLeave = () => {
  isButtonPressed.value = false
  gsap.to(reserveButton.value, {
    scale: 1,
    duration: 0.3,
    ease: 'elastic.out(1, 0.4)',
  })
}

/**
 * Animation d'entrée GSAP au montage du composant
 */
onMounted(() => {
  // Timeline principale de montage
  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
  })

  // 1. La carte globale apparaît (fade + scale)
  tl.fromTo(
    heroCard.value,
    { opacity: 0, scale: 0.95, y: 30 },
    { opacity: 1, scale: 1, y: 0, duration: 0.8 }
  )

    // 2. L'image se révèle avec un léger zoom
    .fromTo(
      heroImage.value,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 0.7 },
      '-=0.4'
    )

    // 2b. L'overlay s'anime doucement (fade-in)
    .fromTo(
      heroOverlay.value,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: 'power2.inOut' },
      '-=0.4'
    )

    // 3. Le badge apparaît en glissant
    .fromTo(
      badge.value,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.5 },
      '-=0.3'
    )

    // 4. Le bloc titre apparaît
    .fromTo(
      '.hero-widget__overlay-content',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(
      ['.hero-widget__appellation', '.hero-widget__separator', '.hero-widget__title', '.hero-widget__tagline'],
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
      '-=0.6'
    )

    // 5. Les statistiques apparaissent en stagger
    .fromTo(
      statsItems.value,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.12 },
      '-=0.2'
    )

    // 6. Le bouton réserver apparaît avec un rebond
    .fromTo(
      reserveButton.value,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' },
      '-=0.2'
    )
})

/**
 * Collecte les refs des éléments de stats pour l'animation stagger
 */
const setStatsRef = (el: any, index: number) => {
  if (el) statsItems.value[index] = el
}
</script>

<template>
  <section class="hero-widget" ref="heroCard">
    <!-- ===== PARTIE SUPÉRIEURE : Image vignoble + overlay ===== -->
    <div class="hero-widget__image-container" ref="heroImage">
      <img :src="vineyardHero" alt="Vignoble du Domaine de Valdor à Saint-Émilion" class="hero-widget__image" />
      <!-- Overlay gradient sombre -->
      <div class="hero-widget__overlay" ref="heroOverlay"></div>

      <!-- Contenu textuel sur l'image (Magnifié) -->
      <div class="hero-widget__overlay-content">
        <p class="hero-widget__appellation">
          <span class="hero-widget__dot"></span>
          AOC Saint-Émilion Grand Cru
          <span class="hero-widget__dot"></span>
        </p>

        <div class="hero-widget__separator">
          <span class="hero-widget__line"></span>
          <span class="hero-widget__diamond">◆</span>
          <span class="hero-widget__line"></span>
        </div>

        <h1 class="hero-widget__title">Domaine de Valdor</h1>
        <p class="hero-widget__tagline">L'excellence en héritage depuis 1952</p>
      </div>

      <!-- Badge prix flottant glassmorphique (Magnifié) -->
      <div class="hero-widget__badge" ref="badge">
        <div class="hero-widget__badge-shine"></div>
        <span class="hero-widget__badge-label">Dégustation Prestige</span>
        <span class="hero-widget__badge-price">120€</span>
        <div class="hero-widget__badge-stars">
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
        <span class="hero-widget__badge-note">Sélection 2024</span>
      </div>
    </div>

    <!-- ===== PARTIE INFÉRIEURE : Informations + Statistiques ===== -->
    <div class="hero-widget__info" ref="titleBlock">
      <div class="hero-widget__info-header">
        <div class="hero-widget__info-title-block">
          <h2 class="hero-widget__info-title">Vignoble de Saint-Émilion</h2>
          <p class="hero-widget__info-location">
            <!-- Icône localisation SVG -->
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Gironde, Nouvelle-Aquitaine, France
          </p>
          <p class="hero-widget__info-desc">
            Découvrez un Grand Cru Classé d'exception. Notre domaine familial préserve l'héritage d'un terroir unique,
            où l'élégance du Merlot s'exprime avec finesse et caractère.
          </p>
          <div class="hero-widget__info-tags">
            <span class="hero-widget__info-tag">🏡 Domaine Familial</span>
            <span class="hero-widget__info-tag">🍃 Agriculture Biologique</span>
            <span class="hero-widget__info-tag">🍷 Dégustation sur place</span>
          </div>
        </div>
      </div>

      <!-- Statistiques en 3 colonnes -->
      <div class="hero-widget__stats">
        <div class="hero-widget__stat" :ref="(el) => setStatsRef(el, 0)">
          <span class="hero-widget__stat-icon">🍇</span>
          <span class="hero-widget__stat-value">45 ans</span>
          <span class="hero-widget__stat-label">Vignes</span>
        </div>

        <div class="hero-widget__stat-divider"></div>

        <div class="hero-widget__stat" :ref="(el) => setStatsRef(el, 1)">
          <span class="hero-widget__stat-icon">🌿</span>
          <span class="hero-widget__stat-value">Merlot</span>
          <span class="hero-widget__stat-label">Cabernet Franc</span>
        </div>

        <div class="hero-widget__stat-divider"></div>

        <div class="hero-widget__stat" :ref="(el) => setStatsRef(el, 2)">
          <span class="hero-widget__stat-icon">📐</span>
          <span class="hero-widget__stat-value">12 Ha</span>
          <span class="hero-widget__stat-label">Superficie</span>
        </div>
      </div>
    </div>

    <!-- Bouton Réserver (neumorphique rond) -->
    <button class="hero-widget__reserve-btn" :class="{ 'hero-widget__reserve-btn--pressed': isButtonPressed }"
      ref="reserveButton" @mouseenter="handleButtonEnter" @mouseleave="handleButtonLeave"
      aria-label="Réserver une dégustation">
      <!-- SVG verre de vin -->
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 2h8l-2 9H10L8 2z" />
        <path d="M12 11v8" />
        <path d="M8 22h8" />
        <path d="M7 11h10" />
      </svg>
    </button>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

// ============================================
// HeroWidget — Style neumorphique principal
// ============================================

.hero-widget {
  @include neumorphism('out', 10px, 20px);
  border-radius: $radius-xl;
  overflow: hidden;
  position: relative;
  width: 100%;
  margin: 2rem auto $spacing-3xl;

  // --- Image vignoble ---
  &__image-container {
    position: relative;
    width: 100%;
    height: 85vh; // Prend beaucoup plus de hauteur
    min-height: 600px;
    overflow: hidden;

    @include respond-to('md') {
      height: 70vh;
      min-height: 500px;
    }
  }

  @keyframes heroZoomInOut {
    0% {
      transform: scale(1);
    }

    100% {
      transform: scale(1.08);
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    animation: heroZoomInOut 10s ease-in-out infinite alternate;
  }

  // Overlay gradient sombre sur l'image
  &__overlay {
    position: absolute;
    inset: 0;
    // Un dégradé qui commence sombre plus tôt pour prendre "plus de place"
    background: linear-gradient(to bottom,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0.6) 50%,
        rgba(0, 0, 0, 0.8) 100%);
    z-index: 1;
  }

  // Contenu textuel au-dessus de l'image (Stylisé Prestige)
  &__overlay-content {
    position: absolute;
    bottom: $spacing-2xl;
    left: $spacing-xl;
    z-index: 2;
    color: $color-white;
    max-width: 500px;
    padding: $spacing-lg;
    
    // Voile glassmorphique localisé pour la lisibilité
    @include glassmorphism();
    background: rgba(0, 0, 0, 0.1); 
    border: none;
    border-radius: $radius-lg;

    @include respond-to('md') {
      bottom: $spacing-lg;
      left: $spacing-lg;
      padding: $spacing-md;
    }
  }

  &__appellation {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    font-family: $font-sans;
    font-size: 0.65rem;
    font-weight: $font-weight-medium;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #d4af7a; // Or Heritage
    margin-bottom: $spacing-sm;
  }

  &__dot {
    width: 4px;
    height: 4px;
    background: #d4af7a;
    border-radius: 50%;
    opacity: 0.8;
  }

  &__separator {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    margin-bottom: $spacing-md;
    opacity: 0.6;
  }

  &__line {
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, #d4af7a, transparent);
    
    &:last-child {
      background: linear-gradient(to left, #d4af7a, transparent);
    }
  }

  &__diamond {
    font-size: 0.5rem;
    color: #d4af7a;
  }

  &__title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.5rem, 5vw, 3.8rem);
    font-weight: $font-weight-bold;
    color: $color-white;
    line-height: 1.1;
    margin-bottom: $spacing-sm;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);

    @include respond-to('md') {
      font-size: 2.2rem;
    }
  }

  &__tagline {
    font-family: $font-serif;
    font-style: italic;
    font-size: $font-size-sm;
    opacity: 0.8;
    font-weight: $font-weight-light;
  }

  // --- Badge glassmorphique flottant (Style Médaille) ---
  &__badge {
    position: absolute;
    bottom: $spacing-lg;
    right: $spacing-lg;
    z-index: 5;
    padding: $spacing-md $spacing-lg;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    color: $color-white;
    
    // Background prestige (Bordeaux dépoli)
    @include glassmorphism();
    background: rgba(114, 47, 55, 0.45);
    border: 1px solid rgba(212, 175, 122, 0.4);
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.3),
      inset 0 0 10px rgba(212, 175, 122, 0.1);
    
    border-radius: $radius-md;
    overflow: hidden;
    min-width: 150px;

    @include respond-to('md') {
      bottom: $spacing-md;
      right: $spacing-md;
      padding: $spacing-sm $spacing-md;
      min-width: 130px;
    }
  }

  &__badge-shine {
    position: absolute;
    top: -100%;
    left: -100%;
    width: 300%;
    height: 300%;
    background: linear-gradient(
      45deg,
      transparent 45%,
      rgba(255, 255, 255, 0.25) 50%,
      transparent 55%
    );
    animation: badgeShine 6s infinite ease-in-out;
    pointer-events: none;
  }

  @keyframes badgeShine {
    0% { transform: translate(-30%, -30%) rotate(0deg); }
    20%, 100% { transform: translate(30%, 30%) rotate(0deg); }
  }

  &__badge-label {
    font-family: $font-sans;
    font-size: 0.6rem;
    font-weight: $font-weight-medium;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #d4af7a;
  }

  &__badge-price {
    font-family: 'Playfair Display', serif;
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    line-height: 1.1;
  }

  &__badge-stars {
    display: flex;
    gap: 2px;
    color: #d4af7a;
    font-size: 0.7rem;
    margin: 2px 0;
  }

  &__badge-note {
    font-family: $font-sans;
    font-size: 0.55rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.7;
    color: $color-white;
  }

  // --- Panneau d'informations ---
  &__info {
    padding: $spacing-xl $spacing-xl $spacing-lg;
    background: $bg-color;

    @include respond-to('md') {
      padding: $spacing-lg $spacing-lg $spacing-md;
    }
  }

  &__info-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: $spacing-lg;
  }

  &__info-title {
    font-family: $font-serif;
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: $text-dark;
    margin-bottom: $spacing-xs;

    @include respond-to('md') {
      font-size: $font-size-md;
    }
  }

  &__info-location {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    font-family: $font-sans;
    font-size: $font-size-sm;
    color: $text-medium;
    font-weight: $font-weight-light;

    svg {
      color: $color-primary;
      flex-shrink: 0;
    }
  }

  &__info-desc {
    font-family: $font-sans;
    font-size: $font-size-sm;
    color: $text-medium;
    line-height: 1.6;
    margin-top: $spacing-md;
    margin-bottom: $spacing-sm;
    max-width: 90%;
  }

  &__info-tags {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-sm;
    margin-top: $spacing-sm;
    margin-bottom: $spacing-md;
  }

  &__info-tag {
    font-family: $font-sans;
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    color: $color-primary;
    padding: 6px 12px;
    border-radius: $radius-lg;
    @include neumorphism('out', 3px, 6px);
  }

  // --- Statistiques (3 colonnes) ---
  &__stats {
    display: flex;
    align-items: center;
    justify-content: space-around;
    @include neumorphism('in', 5px, 10px);
    border-radius: $radius-md;
    padding: $spacing-lg $spacing-md;

    @include respond-to('sm') {
      flex-direction: column;
      gap: $spacing-md;
    }
  }

  &__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-xs;
    flex: 1;
    text-align: center;
  }

  &__stat-icon {
    font-size: $font-size-lg;
    margin-bottom: 2px;
  }

  &__stat-value {
    font-family: $font-serif;
    font-size: $font-size-md;
    font-weight: $font-weight-semibold;
    color: $text-dark;
  }

  &__stat-label {
    font-family: $font-sans;
    font-size: $font-size-xs;
    color: $text-medium;
    font-weight: $font-weight-light;
    letter-spacing: 0.5px;
  }

  &__stat-divider {
    width: 1px;
    height: 50px;
    background: $color-divider;
    flex-shrink: 0;

    @include respond-to('sm') {
      width: 80%;
      height: 1px;
    }
  }

  // --- Bouton Réserver (rond, neumorphique) ---
  &__reserve-btn {
    @include neumorphic-button(64px);
    position: absolute;
    bottom: 90px;
    right: $spacing-xl;
    z-index: 5;
    color: $color-primary;
    background: $bg-color;

    svg {
      transition: transform $transition-base, color $transition-base;
    }

    &:hover svg {
      color: $color-primary-dark;
      transform: rotate(-8deg);
    }

    // État enfoncé (survol)
    &--pressed {
      @include neumorphism('in', 4px, 8px);
      border-radius: $radius-round;
    }

    @include respond-to('md') {
      width: 54px;
      height: 54px;
      bottom: 80px;
      right: $spacing-lg;
    }
  }
}
</style>
