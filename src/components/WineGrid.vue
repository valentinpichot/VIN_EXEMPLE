<!--
  WineGrid.vue — Grille de cartes de vins
  Design neumorphique avec images bouteilles, infos et animations GSAP ScrollTrigger.
-->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { wines, type Wine } from '@/data/wines'

// Import des images de bouteilles
import bottleRed from '@/assets/wine-bottle-red.png'
import bottleWhite from '@/assets/wine-bottle-white.png'
import bottleRose from '@/assets/wine-bottle-rose.png'

// Enregistrement du plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

// --- Références template ---
const wineCards = ref<HTMLElement[]>([])

/**
 * Retourne l'image de bouteille appropriée selon l'identifiant du vin
 */
const getBottleImage = (wine: Wine): string => {
  // Le Blanc de Valdor → bouteille blanche
  if (wine.id === 4) return bottleWhite
  // Le Rosé d'Été → bouteille rosé
  if (wine.id === 5) return bottleRose
  // Tous les autres → bouteille rouge
  return bottleRed
}

/**
 * Formate le prix avec le symbole €
 */
const formatPrice = (price: number): string => {
  return `${price}€`
}

/**
 * Animations GSAP au montage avec ScrollTrigger
 */
onMounted(() => {
  // Attend un tick pour que les refs soient montées
  setTimeout(() => {
    // Animation d'apparition des cartes avec stagger via ScrollTrigger
    wineCards.value.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 40,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            end: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })
  }, 100)
})
</script>

<template>
  <section class="wine-grid" ref="gridSection">
    <!-- Titre de la section -->
    <div class="wine-grid__header">
      <h2 class="wine-grid__title">Nos Cuvées</h2>
      <p class="wine-grid__subtitle">Découvrez notre sélection de vins d'exception</p>
    </div>

    <!-- Grille CSS Grid -->
    <div class="wine-grid__container">
      <article
        v-for="wine in wines"
        :key="wine.id"
        class="wine-card"
        ref="wineCards"
      >
        <!-- Zone image bouteille -->
        <div class="wine-card__image-wrapper">
          <div
            class="wine-card__image-bg"
            :style="{ background: `linear-gradient(135deg, ${wine.accentColor}15, ${wine.accentColor}08)` }"
          ></div>
          <img
            :src="getBottleImage(wine)"
            :alt="`Bouteille de ${wine.name}`"
            class="wine-card__image"
          />
          <!-- Badge notation -->
          <div class="wine-card__rating">
            <span class="wine-card__rating-score">{{ wine.rating }}</span>
            <span class="wine-card__rating-max">/100</span>
          </div>
        </div>

        <!-- Informations du vin -->
        <div class="wine-card__content">
          <div class="wine-card__icon">{{ wine.icon }}</div>
          <h3 class="wine-card__name">{{ wine.name }}</h3>
          <p class="wine-card__region">{{ wine.region }}</p>

          <!-- Cépages -->
          <div class="wine-card__tags">
            <span
              v-for="cepage in wine.cepages"
              :key="cepage"
              class="wine-card__tag"
            >
              {{ cepage }}
            </span>
          </div>

          <!-- Pied de carte : millésime + prix -->
          <div class="wine-card__footer">
            <span class="wine-card__vintage">{{ wine.vintage }}</span>
            <span
              class="wine-card__price"
              :style="{ color: wine.accentColor }"
            >
              {{ formatPrice(wine.price) }}
            </span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

// ============================================
// WineGrid — Grille de cartes neumorphiques
// ============================================

.wine-grid {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;

  // --- En-tête de section ---
  &__header {
    text-align: center;
    margin-bottom: $spacing-2xl;
  }

  &__title {
    font-family: $font-serif;
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $text-dark;
    margin-bottom: $spacing-xs;
  }

  &__subtitle {
    font-family: $font-sans;
    font-size: $font-size-sm;
    color: $text-medium;
    font-weight: $font-weight-light;
    letter-spacing: 0.5px;
  }

  // --- Conteneur grille CSS Grid ---
  &__container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-2xl;
    
    // Ajout du style container "vitrine"
    padding: $spacing-3xl;
    @include neumorphism('in', 6px, 12px);
    border-radius: $radius-xl;
    border: 1px solid rgba(255, 255, 255, 0.5); // Bordure lumineuse subtile
    background: $bg-color-light;

    @include respond-to('lg') {
      grid-template-columns: repeat(2, 1fr);
      padding: $spacing-2xl;
    }

    @include respond-to('sm') {
      grid-template-columns: 1fr;
      gap: $spacing-xl;
      padding: $spacing-lg;
    }
  }
}

// ============================================
// WineCard — Carte individuelle neumorphique
// ============================================

.wine-card {
  @include neumorphism('out', 6px, 12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: $radius-lg;
  overflow: hidden;
  cursor: pointer;
  transition: transform $transition-base, box-shadow $transition-base;

  // Survol : légère élévation
  &:hover {
    transform: translateY(-4px);
    box-shadow:
      12px 12px 24px $color-shadow-dark,
      -12px -12px 24px $color-shadow-light;
  }

  // --- Zone image ---
  &__image-wrapper {
    position: relative;
    height: 200px;
    @include flex-center();
    overflow: hidden;
    padding: $spacing-md;
  }

  &__image-bg {
    position: absolute;
    inset: 0;
    border-radius: 0;
  }

  &__image {
    position: relative;
    z-index: 1;
    height: 170px;
    width: auto;
    object-fit: contain;
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
    transition: transform $transition-base;
  }

  &:hover &__image {
    transform: scale(1.05) rotate(-2deg);
  }

  // Badge notation (coin supérieur droit)
  &__rating {
    position: absolute;
    top: $spacing-sm;
    right: $spacing-sm;
    z-index: 2;
    @include neumorphism('flat', 3px, 6px);
    border-radius: $radius-sm;
    padding: 4px 8px;
    display: flex;
    align-items: baseline;
    gap: 1px;
  }

  &__rating-score {
    font-family: $font-serif;
    font-size: $font-size-sm;
    font-weight: $font-weight-bold;
    color: $color-primary;
  }

  &__rating-max {
    font-family: $font-sans;
    font-size: $font-size-xs;
    color: $text-light;
    font-weight: $font-weight-light;
  }

  // --- Contenu texte ---
  &__content {
    padding: $spacing-md $spacing-lg $spacing-lg;
    background: $bg-color;
  }

  &__icon {
    font-size: $font-size-md;
    margin-bottom: $spacing-xs;
  }

  &__name {
    font-family: $font-serif;
    font-size: $font-size-md;
    font-weight: $font-weight-semibold;
    color: $text-dark;
    margin-bottom: 4px;
    line-height: 1.3;
  }

  &__region {
    font-family: $font-sans;
    font-size: $font-size-xs;
    color: $text-medium;
    font-weight: $font-weight-light;
    letter-spacing: 0.3px;
    margin-bottom: $spacing-sm;
  }

  // Tags cépages
  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-xs;
    margin-bottom: $spacing-md;
  }

  &__tag {
    @include neumorphism('in', 3px, 6px);
    border-radius: 20px;
    padding: 3px 10px;
    font-family: $font-sans;
    font-size: 0.65rem;
    color: $text-medium;
    font-weight: $font-weight-medium;
    letter-spacing: 0.3px;
  }

  // Pied de carte
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: $spacing-sm;
    border-top: 1px solid $color-divider;
  }

  &__vintage {
    font-family: $font-serif;
    font-size: $font-size-sm;
    color: $text-light;
    font-weight: $font-weight-medium;
  }

  &__price {
    font-family: $font-serif;
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
  }
}
</style>
