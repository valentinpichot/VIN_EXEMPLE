<!--
  VideoSection.vue — Section vidéo de présentation (Placeholder)
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import vineyardSunset from '@/assets/vineyard_sunset.png'

gsap.registerPlugin(ScrollTrigger)

const videoContainer = ref<HTMLElement | null>(null)
const playButton = ref<HTMLElement | null>(null)

onMounted(() => {
  setTimeout(() => {
    // Effet "Pin & Scale" : 
    // Au Scroll au niveau de la vidéo, le bloc se "plante" au milieu de l'écran (pin),
    // et dézoome depuis scale: 2 jusqu'à scale: 1 progressivement en scrollant (scrub).
    gsap.fromTo(
      videoContainer.value,
      { 
        scale: 2, 
        transformOrigin: 'center center'
      },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: videoContainer.value,
          start: 'center center', // On pin la vidéo quand elle arrive au centre de l'écran
          end: '+=150%',          // La durée du scroll (l'effet dure sur 1.5x la hauteur d'écran)
          pin: true,              // Fige la section le temps de descendre
          scrub: 1,               // Le scale suit le scroll avec 1 seconde de lissage (smooth)
          // Apparition du bouton lecture à la fin de l'animation de dézoom
          onLeave: () => {
             gsap.to(playButton.value, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' })
          },
          onEnterBack: () => {
             gsap.to(playButton.value, { opacity: 0, scale: 0.5, duration: 0.3 })
          }
        }
      }
    )
    
    // Initialise le bouton en petit et transparent
    gsap.set(playButton.value, { opacity: 0, scale: 0.5 })
  }, 100)
})
</script>

<template>
  <section class="video-section">
    <div class="video-section__header" ref="header">
      <h2 class="video-section__title">Au cœur du Domaine</h2>
      <p class="video-section__subtitle">Découvrez notre processus de vinification en vidéo</p>
    </div>

    <div class="video-section__container" ref="videoContainer">
      <!-- Faux lecteur vidéo (placeholder) avec vidéo légère -->
      <div class="video-section__placeholder">
        <video 
          class="video-section__video"
          src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" 
          :poster="vineyardSunset"
          autoplay 
          loop 
          muted 
          playsinline
        ></video>
        <div class="video-section__overlay"></div>
        <div class="video-section__content">
          <button class="video-section__play-btn" ref="playButton" aria-label="Lancer la vidéo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
          <span class="video-section__duration">03:42</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.video-section {
  max-width: 1000px;
  margin: 0 auto $spacing-3xl;
  padding: 0 $spacing-md;

  &__header {
    text-align: center;
    margin-bottom: $spacing-xl;
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
  }

  &__container {
    @include neumorphism('out', 8px, 16px);
    border-radius: $radius-lg;
    padding: $spacing-xl $spacing-md $spacing-md; // Agrandissement du padding-top
    position: relative;

    @include respond-to('md') {
      padding: $spacing-md $spacing-sm $spacing-sm;
    }
  }

  &__placeholder {
    position: relative;
    width: 100%;
    height: 500px;
    background: $color-shadow-dark;
    border-radius: $radius-md;
    overflow: hidden;

    @include respond-to('md') {
      height: 550px; // Format Portrait sur mobile
    }
  }

  &__video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }


  &__overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    transition: background $transition-base;
    z-index: 2;
  }

  // Effet hover sur tout le lecteur pour simuler l'interactivité
  &__container:hover &__overlay {
    background: rgba(0, 0, 0, 0.4);
  }

  &__content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 3;
  }

  &__play-btn {
    @include neumorphism('out', 6px, 12px);
    width: 80px;
    height: 80px;
    border-radius: $radius-round;
    border: none;
    cursor: pointer;
    background: $bg-color;
    color: $color-primary;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform $transition-fast, box-shadow $transition-fast;

    svg {
      margin-left: 6px; // Centrage visuel du triangle
      transition: color $transition-base;
    }

    &:hover {
      transform: scale(1.05);
      svg {
        color: $color-primary-light;
      }
    }

    &:active {
      @include neumorphism('in', 4px, 8px);
      transform: scale(0.95);
    }
  }

  &__duration {
    position: absolute;
    bottom: $spacing-md;
    right: $spacing-md;
    @include glassmorphism();
    padding: 4px 10px;
    font-family: $font-sans;
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    color: $color-white;
  }
}
</style>
