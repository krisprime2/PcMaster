<!-- OrderSuccessView.vue -->
<template>
  <v-app>
    <v-main class="success-content">
      <v-container>
        <v-row justify="center" align="center" style="min-height: 80vh">
          <v-col cols="12" sm="8" md="6">
            <v-card class="success-card text-center">
              <!-- Success Icon und Nachricht -->
              <v-card-text class="success-message pa-8">
                <v-icon color="success" size="96" class="mb-6">mdi-check-circle</v-icon>
                <h1 class="text-h4 white--text mb-4">Vielen Dank für Ihre Bestellung!</h1>
                <p class="text-subtitle-1 grey--text text--lighten-1 mb-8">
                  Ihre Bestellung wurde erfolgreich aufgegeben. Sie erhalten in Kürze eine Bestätigungs-E-Mail.
                </p>

                <!-- Zurück zur Startseite Button -->
                <v-btn
                    color="primary"
                    x-large
                    min-width="200"
                    @click="goToHome"
                >
                  <v-icon left>mdi-home</v-icon>
                  Zur Startseite
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'OrderSuccess',

  methods: {
    goToHome() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.success-content {
  background-color: #0A0E1A;
  min-height: 100vh;
}

.success-card {
  background-color: #2A2E35 !important;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
}

.success-message {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
