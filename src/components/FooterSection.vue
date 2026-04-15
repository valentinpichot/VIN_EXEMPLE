<!--
  FooterSection.vue — Footer complet Neumorphique
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const footerContainer = ref<HTMLElement | null>(null)
const columns = ref<HTMLElement[]>([])

const setColumnRef = (el: any, index: number) => {
  if (el) columns.value[index] = el
}

onMounted(() => {
  setTimeout(() => {
    // Animation d'apparition du footer avec stagger pour les colonnes
    gsap.fromTo(
      footerContainer.value,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerContainer.value,
          start: 'top 95%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    columns.value.forEach((col, index) => {
      gsap.fromTo(
        col,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.3 + index * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerContainer.value,
            start: 'top 95%',
          },
        }
      )
    })
  }, 100)
})
</script>

<template>
  <footer class="footer-section" ref="footerContainer">
    <div class="footer-section__inner">
      <div class="footer-section__grid">
        <!-- Colonne 1 : À propos -->
        <div class="footer-section__col" :ref="(el) => setColumnRef(el, 0)">
          <h3 class="footer-section__brand">Domaine de Valdor</h3>
          <p class="footer-section__desc">
            Grand Cru d'exception cultivé avec passion au cœur de Saint-Émilion. L'alliance parfaite entre tradition régionale et viticulture moderne.
          </p>
        </div>

        <!-- Colonne 2 : Liens rapides -->
        <div class="footer-section__col" :ref="(el) => setColumnRef(el, 1)">
          <h4 class="footer-section__title">Navigation</h4>
          <ul class="footer-section__links">
            <li><a href="#">Le Vignoble</a></li>
            <li><a href="#">Nos Vins</a></li>
            <li><a href="#">Dégustation & Visite</a></li>
            <li><a href="#">Boutique en ligne</a></li>
          </ul>
        </div>

        <!-- Colonne 3 : Contact & Réseaux -->
        <div class="footer-section__col" :ref="(el) => setColumnRef(el, 2)">
          <h4 class="footer-section__title">Contact</h4>
          <p class="footer-section__contact-info">
            <strong>Adresse :</strong> Route de Montagne, 33330 Saint-Émilion<br>
            <strong>Téléphone :</strong> +33 5 57 24 00 00<br>
            <strong>Email :</strong> contact@domaine-valdor.fr
          </p>
          
          <div class="footer-section__socials">
            <a href="#" class="footer-section__social-btn" aria-label="Facebook">F</a>
            <a href="#" class="footer-section__social-btn" aria-label="Instagram">IG</a>
            <a href="#" class="footer-section__social-btn" aria-label="Twitter">X</a>
          </div>
        </div>
      </div>

      <div class="footer-section__bottom">
        <p>© 2024 Domaine de Valdor — L'abus d'alcool est dangereux pour la santé. À consommer avec modération.</p>
        <p class="footer-section__legal"><a href="#">Mentions Légales</a> | <a href="#">Politique de Confidentialité</a></p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.footer-section {
  padding: $spacing-3xl $spacing-md;
  margin-top: $spacing-3xl;

  &__inner {
    @include neumorphism('flat', 6px, 12px);
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    border-radius: $radius-lg;
    padding: $spacing-2xl;
  }

  &__grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: $spacing-2xl;
    margin-bottom: $spacing-2xl;

    @include respond-to('lg') {
      grid-template-columns: 1fr 1fr;
    }

    @include respond-to('sm') {
      grid-template-columns: 1fr;
      gap: $spacing-xl;
    }
  }

  &__brand {
    font-family: $font-serif;
    font-size: $font-size-lg;
    color: $color-primary;
    margin-bottom: $spacing-md;
  }

  &__title {
    font-family: $font-serif;
    font-size: $font-size-md;
    color: $text-dark;
    margin-bottom: $spacing-md;
  }

  &__desc, &__contact-info, &__links a {
    font-family: $font-sans;
    font-size: $font-size-sm;
    color: $text-medium;
    line-height: 1.6;
  }

  &__links {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: $spacing-sm;
    }
  }

  &__socials {
    display: flex;
    gap: $spacing-md;
    margin-top: $spacing-lg;
  }

  &__social-btn {
    @include neumorphism('out', 4px, 8px);
    width: 40px;
    height: 40px;
    border-radius: $radius-round;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: $font-sans;
    font-weight: $font-weight-bold;
    font-size: $font-size-xs;
    color: $color-primary;
    text-decoration: none;
    transition: transform $transition-fast;

    &:hover {
      transform: scale(0.95);
      @include neumorphism('flat', 2px, 4px);
    }
  }

  &__bottom {
    border-top: 1px solid $color-divider;
    padding-top: $spacing-lg;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: $spacing-md;

    p {
      font-size: $font-size-xs;
      color: $text-light;
      margin: 0;
    }

    a {
      color: $text-light;
      &:hover {
        color: $color-primary;
      }
    }
  }
}
</style>
