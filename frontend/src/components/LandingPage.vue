<script setup>
import ArticleCarousel from "@/components/ArticleCarousel.vue";
import AboutUS from "@/components/AboutUs.vue";
import Config from "@/components/LandingConfig.vue";
import Inquiry from "@/components/LandingInquiry.vue";
import Testimonials from "@/components/Testimonials.vue";
import router from "@/router/index.js";
</script>

<template>
  <div class="landing-page">
    <header class="main-header text-center text-white">
      <div class="header-container px-4 py-8 md:py-16">
        <h1 class="text-3xl md:text-4xl font-bold mb-4 mx-auto max-w-2xl">Unschlagbare PC-Angebote</h1>
        <p class="text-lg md:text-xl mb-6 mx-auto max-w-xl">Sparen Sie groß bei hochwertigen PCs und Laptops!</p>
      </div>
    </header>

    <div class="content-wrapper">
      <ArticleCarousel></ArticleCarousel>
      <AboutUS></AboutUS>
      <Config></Config>
      <Inquiry></Inquiry>
      <Testimonials />
    </div>
  </div>
</template>

<style scoped>
.landing-page {
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
}

.main-header {
  background: url('/assets/MobileMainPicture.png') no-repeat center center / cover;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: #fff;
  width: 100%;
  padding: 0;
}

.main-header::after {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.2); /* Reduced opacity from 0.5 to 0.2 */
}

.header-container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.content-wrapper {
  max-width: 100%;
  overflow-x: hidden;
}

@media (min-width: 992px) {
  .main-header {
    background: url('/src/assets/images/desktopMainBg.png') no-repeat center center / cover;
    min-height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
