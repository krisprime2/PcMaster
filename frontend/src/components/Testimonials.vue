<template>
  <v-container fluid class="testimonials-section py-16">
    <h2 class="text-h3 text-center font-weight-bold mb-12 text-white">
      Das sagen unsere Kunden
    </h2>

    <v-row class="hidden-sm-and-down">
      <v-col
          v-for="(testimonial, index) in testimonials"
          :key="index"
          cols="12"
          md="4"
      >
        <v-hover v-slot="{ isHovering, props }">
          <v-card
              v-bind="props"
              :elevation="isHovering ? 16 : 4"
              class="testimonial-card h-100 pa-6"
              :class="{ 'on-hover': isHovering }"
          >
            <v-icon
                icon="mdi-format-quote-open"
                size="36"
                class="quote-icon mb-4"
                color="primary"
            ></v-icon>

            <v-card-text class="text-body-1 text-white mb-6">
              "{{ testimonial.quote }}"
            </v-card-text>

            <v-card-title class="text-h6 font-weight-bold pl-0">
              {{ testimonial.name }}
            </v-card-title>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <v-row class="hidden-md-and-up">
      <v-col cols="12">
        <v-carousel
            :show-arrows="false"
            hide-delimiter-background
            delimiter-icon="mdi-circle"
            height="auto"
            interval="5000"
        >
          <v-carousel-item
              v-for="(testimonial, index) in testimonials"
              :key="index"
          >
            <v-card class="testimonial-card mx-4 pa-6" elevation="4">
              <v-icon
                  icon="mdi-format-quote-open"
                  size="36"
                  class="quote-icon mb-4"
                  color="primary"
              ></v-icon>

              <v-card-text class="text-body-1 text-white mb-6">
                "{{ testimonial.quote }}"
              </v-card-text>

              <v-card-title class="text-h6 font-weight-bold pl-0">
                {{ testimonial.name }}
              </v-card-title>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const testimonials = ref([
  {
    quote: 'Habe meinen alten Laptop hier verkauft und ein faires Angebot bekommen. Der gesamte Prozess war unkompliziert und schnell. Sehr empfehlenswert!',
    name: 'Markus S.'
  },
  {
    quote: 'Endlich ein Shop mit einer tollen Auswahl an Ersatzteilen! Ich habe genau die richtige Grafikkarte gefunden und mein PC läuft wieder perfekt.',
    name: 'Sarah W.'
  },
  {
    quote: 'Der beste Online-Shop für PC-Enthusiasten! Die individuelle Konfigurationsmöglichkeit ist top, und die Lieferung war super schnell. Werde sicher wieder hier bestellen!',
    name: 'Laura H.'
  }
])
</script>

<style scoped>
.testimonials-section {
  background: #0A0E1A !important;
  position: relative;
  overflow: hidden;
}

.testimonials-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.03) 0%,
      transparent 70%
  );
  pointer-events: none;
}

.testimonial-card {
  background: linear-gradient(145deg, #1e1e1e, #2a2a2a);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.testimonial-card.on-hover {
  transform: translateY(-8px);
  background: linear-gradient(145deg, #2a2a2a, #3a3a3a);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.quote-icon {
  opacity: 0.8;
}

.testimonial-card::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  background: radial-gradient(
      circle at top right,
      rgba(255, 59, 48, 0.1),
      transparent 70%
  );
  pointer-events: none;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
