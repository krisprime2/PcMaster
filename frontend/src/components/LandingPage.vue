<script setup>
import ArticleCarousel from "@/components/ArticleCarousel.vue";
import AboutUS from "@/components/AboutUs.vue";
import Config from "@/components/LandingConfig.vue";
import Inquiry from "@/components/LandingInquiry.vue";
import Testimonials from "@/components/Testimonials.vue";

</script>

<template>

  <header class="main-header text-center text-white">
    <div class="header-container">
      <h1>Unschlagbare PC-Angebote</h1>
      <p>Sparen Sie groß bei hochwertigen PCs und Laptops!</p>
      <a href="#" class="btn btn-primary">Jetzt einkaufen</a>
    </div>
  </header>

  <div class="container categories py-5">
    <div class="row text-center">
      <div class="col-6 col-md-3">
        <a href="#pc" class="category-item">
          <img src="../../public/icon-pc.png" alt="PCs">
          <p>PCs</p>
        </a>
      </div>
      <div class="col-6 col-md-3">
        <a href="#laptops" class="category-item">
          <img src="../../../public/icon-laptop.png" alt="Laptops">
          <p>Laptops</p>
        </a>
      </div>
      <div class="col-6 col-md-3">
        <a href="#ersatzteile" class="category-item">
          <img src="../../public/icon-cpu.png" alt="Ersatzteile">
          <p>Ersatzteile</p>
        </a>
      </div>
      <div class="col-6 col-md-3">
        <a href="#konfigurator" class="category-item">
          <img src="../../public/icon-tools.png" alt="PC konfigurieren">
          <p>PC konfigurieren</p>
        </a>
      </div>
    </div>
  </div>
  <ArticleCarousel></ArticleCarousel>
  <AboutUS></AboutUS>
  <Config></Config>
  <Inquiry></Inquiry>
  <Testimonials />
</template>

<style scoped>

</style>
