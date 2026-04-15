<!--
  App.vue — Composant racine de la SPA Domaine de Valdor
  Orchestration du HeroWidget + WineGrid avec import global SCSS.
-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import HeroWidget from '@/components/HeroWidget.vue'
import AboutSection from '@/components/AboutSection.vue'
import VideoSection from '@/components/VideoSection.vue'
import WineGrid from '@/components/WineGrid.vue'
import FooterSection from '@/components/FooterSection.vue'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="app">
    <!-- En-tête -->
    <header class="app__header" :class="{ 'app__header--scrolled': isScrolled }">
      <p class="app__logo">Domaine de Valdor</p>
      <p class="app__subtitle">Vignoble d'exception · Saint-Émilion</p>
    </header>

    <!-- Contenu principal -->
    <main>
      <!-- Widget héro principal -->
      <HeroWidget />

      <!-- Séparateur élégant -->
      <hr class="app__divider" />

      <!-- Section À propos (Exemple additionnel) -->
      <AboutSection />

      <!-- Séparateur élégant -->
      <hr class="app__divider" />

      <!-- Section Vidéo -->
      <VideoSection />

      <!-- Séparateur élégant -->
      <hr class="app__divider" />

      <!-- Grille des vins -->
      <WineGrid />
    </main>

    <!-- Pied de page complet Neumorphique -->
    <FooterSection />
  </div>
</template>

<style lang="scss">
// Import du design system global (non scopé pour les styles de base)
@use '@/styles/main';
</style>
