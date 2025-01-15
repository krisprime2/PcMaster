<template>
  <v-container fluid class="trade-in-section pa-16">
    <v-card
        class="trade-in-card mx-auto"
        max-width="1000"
        rounded="lg"
        elevation="10"
    >
      <v-container class="pa-8">
        <v-row justify="center" align="center">
          <v-col cols="12" class="text-center">
            <v-scale-transition>
              <div>
                <h2 class="text-h4 font-weight-bold mb-6 text-white">
                  Sie möchten Ihre alten technischen Geräte verkaufen?
                </h2>
                <p class="text-h6 text-grey-lighten-1 mb-8">
                  Wir nehmen gerne Anfragen zum Ankauf entgegen. Kontaktieren Sie uns für ein individuelles Angebot!
                </p>
                <v-btn
                    color="error"
                    size="x-large"
                    elevation="4"
                    class="text-none px-8"
                    :ripple="true"
                >
                  <v-icon start icon="mdi-email-outline" class="mr-2"></v-icon>
                  Anfrage stellen
                </v-btn>
              </div>
            </v-scale-transition>
          </v-col>
        </v-row>
      </v-container>

      <!-- Decorative Elements -->
      <div class="circuit-overlay"></div>
      <div class="glow-effect"></div>
    </v-card>
  </v-container>
</template>

<style scoped>
.trade-in-section {
  background-color: #0A0E1A !important;
}

.trade-in-card {
  background: linear-gradient(145deg, #1e1e1e, #2a2a2a);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.circuit-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: repeating-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.03) 0px,
      rgba(255, 255, 255, 0.03) 1px,
      transparent 1px,
      transparent 20px
  ),
  repeating-linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.03) 0px,
      rgba(255, 255, 255, 0.03) 1px,
      transparent 1px,
      transparent 20px
  );
  pointer-events: none;
}

.glow-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150%;
  height: 150%;
  background: radial-gradient(
      circle,
      rgba(255, 59, 48, 0.1) 0%,
      transparent 70%
  );
  pointer-events: none;
}

.trade-in-card:hover .glow-effect {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}
</style>
