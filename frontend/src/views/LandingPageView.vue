<template>
  <div class="landing-page">
    <header class="responsive-header">
      <img
          :src="isDesktop ? desktopBackground : mobileBackground"
          class="main-background"
          alt="Header background"
          fetchpriority="high"
          loading="eager"
          width="1920"
         height="1080"/>

      <div class="header-container px-4 py-8 md:py-16">
        <h1 class="text-3xl md:text-4xl font-bold mb-4 mx-auto max-w-2xl">
          Unschlagbare PC-Angebote
        </h1>
        <p class="text-lg md:text-xl mb-6 mx-auto max-w-xl">
          Sparen Sie groß bei hochwertigen PCs und Laptops!
        </p>
      </div>
    </header>

    <div class="content-wrapper">
      <ArticleCarousel></ArticleCarousel>
      <AboutUS></AboutUS>
      <Config></Config>
      <Inquiry></Inquiry>
      <Testimonials/>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue'
import ArticleCarousel from "@/components/ArticleCarousel.vue"
import AboutUS from "@/components/AboutUs.vue"
import Config from "@/components/LandingConfig.vue"
import Inquiry from "@/components/LandingInquiry.vue"
import Testimonials from "@/components/Testimonials.vue"

import {BASE_IMAGE_URL} from '@/main.js'

const mobileBackground = BASE_IMAGE_URL + 'assets/images/MobileMainPicture.webp'
const desktopBackground = BASE_IMAGE_URL + 'assets/images/desktopMainBg.webp'

const isDesktop = ref(false)

function checkScreenSize() {
  isDesktop.value = window.innerWidth >= 992
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<style scoped>
.landing-page {
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
}

.responsive-header {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: #fff;
  width: 100%;
  padding: 0;
  overflow: hidden;
}

.main-background {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.responsive-header::after {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.header-container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.content-wrapper {
  max-width: 100%;
  overflow-x: hidden;
}
</style>
