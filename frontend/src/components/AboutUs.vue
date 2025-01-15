<template>
  <v-container fluid class="about-us-section pa-0">
    <v-card flat>
      <!-- Hero Section -->
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <v-img
              src="/src/assets/images/img-about-us.jpg"
              height="700"
              cover
              class="about-image"
          >
            <div class="image-overlay"></div>
          </v-img>
        </v-col>
        <v-col cols="12" md="6" class="d-flex align-center">
          <v-card-text class="text-center text-md-left pa-8">
            <h2 class="text-h3 font-weight-bold mb-6 text-white">Über uns</h2>
            <p class="text-body-1 text-white">
              Seit über einem Jahrzehnt bieten wir PC-Liebhabern und Technikfans hochwertige PCs und Zubehör.
              Durch enge Zusammenarbeit mit führenden Herstellern garantieren wir die neuesten Produkte:
              von Gaming-PCs über Laptops bis hin zu Komponenten für Ihren Traum-PC.
              Erleben Sie Qualität, auf die Kunden vertrauen!
            </p>
          </v-card-text>
        </v-col>
      </v-row>

      <!-- Quality Promises Section -->
      <v-container class="py-12">
        <h3 class="text-h4 text-center text-white mb-12">
          Unsere Qualitätsversprechen
        </h3>
        <v-row>
          <v-col
              v-for="(promise, index) in qualityPromises"
              :key="index"
              cols="12"
              sm="6"
              md="4"
          >
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                  v-bind="props"
                  :elevation="isHovering ? 8 : 2"
                  :class="['promise-card', 'pa-6', 'text-center', 'rounded-lg',
                  {'on-hover': isHovering}]"
                  height="200"
              >
                <v-icon
                    :icon="promise.icon"
                    size="large"
                    class="mb-4"
                    color="primary"
                ></v-icon>
                <h4 class="text-h6 font-weight-bold mb-3">{{ promise.title }}</h4>
                <p class="text-body-2">{{ promise.description }}</p>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const qualityPromises = ref([
  {
    title: 'Höchste Qualität',
    description: 'Wir garantieren, dass alle unsere Produkte strengen Qualitätstests unterzogen werden.',
    icon: 'mdi-shield-check'
  },
  {
    title: 'Umfassender Kundenservice',
    description: 'Unser Support-Team steht Ihnen jederzeit für Fragen zur Verfügung.',
    icon: 'mdi-headset'
  },
  {
    title: 'Transparente Preise',
    description: 'Bei uns gibt es keine versteckten Kosten. Faire und transparente Preise.',
    icon: 'mdi-cash-multiple'
  },
  {
    title: 'Einfacher Bestellprozess',
    description: 'Benutzerfreundlich und sicher.',
    icon: 'mdi-cart-outline'
  },
  {
    title: 'Schnelle Lieferung',
    description: 'Wir versenden Ihre Bestellung so schnell wie möglich.',
    icon: 'mdi-truck-fast'
  },
  {
    title: 'Fachkundige Beratung',
    description: 'Unsere Experten beraten Sie gerne bei Ihrer Kaufentscheidung.',
    icon: 'mdi-account-group'
  }
])
</script>

<style scoped>
.about-us-section {
  background-color: #0A0E1A !important;
}

.v-card {
  background-color: #0A0E1A !important;
}

.promise-card {
  background: linear-gradient(145deg, #1E2127, #2A2E35);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.4)
  );
}

/* Add smooth transitions */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
