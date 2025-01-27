<template>
  <v-container fluid class="configurator-section pa-0">
    <v-card flat>
      <v-container>
        <v-row align="center" class="fill-height">
          <v-col cols="12" md="6" class="pr-md-8">
            <v-slide-y-transition>
              <div>
                <h1 class="text-h3 font-weight-bold mb-4 text-white">
                  Konfiguriere jetzt deinen Wunsch PC!
                </h1>
                <p class="text-h6 text-grey-lighten-1 mb-6">
                  Konfigurieren Sie Ihren eigenen PC ganz nach Ihren Wünschen.
                  Wählen Sie die passenden Komponenten aus!
                </p>
                <v-btn
                    color="error"
                    size="x-large"
                    elevation="4"
                    class="text-none px-8"
                    :ripple="true"
                    @click="router.push('/config')"
                >
                  <v-icon start icon="mdi-cog" class="mr-2"></v-icon>
                  Jetzt konfigurieren
                </v-btn>
              </div>
            </v-slide-y-transition>
          </v-col>

          <v-col cols="12" md="6">
            <v-hover>
              <template v-slot:default="{ isHovering, props }">
                <v-card
                    v-bind="props"
                    :elevation="isHovering ? 12 : 2"
                    class="pa-4 bg-transparent"
                >
                  <v-img
                      :src="BASE_IMAGE_URL + 'assets/images/pckonfig.webp'"
                      alt="High-End Gaming-PC mit RGB-Beleuchtung und PC-Komponenten wie Grafikkarte, Lüfter und RAM."
                      height="400"
                      cover
                      class="rounded-lg"
                  >
                    <template v-slot:placeholder>
                      <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                      >
                        <v-progress-circular
                            indeterminate
                            color="error"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-card>
              </template>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<style scoped>
.configurator-section {
  background: #0A0E1A !important;
  position: relative;
  overflow: hidden;
}

.v-card {
  background-color: #0A0E1A !important;
}

.configurator-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at top right, rgba(255,59,48,0.1) 0%, transparent 70%);
  pointer-events: none;
}
</style>
<script setup>
import router from "@/router/index.js";
import { BASE_IMAGE_URL } from '@/main.js';

</script>
