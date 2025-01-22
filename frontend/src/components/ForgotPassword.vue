<template>
  <v-container fluid class="fill-height login-page">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12 custom-card">
          <v-card-text class="text-center">
            <h1 class="text-h4 mb-4 white--text">Passwort zurücksetzen</h1>
            <p class="text-subtitle-1 mb-6 grey--text">Geben Sie Ihre E-Mail-Adresse ein, um Ihr Passwort zurückzusetzen</p>

            <v-form @submit.prevent="handleResetPassword" ref="resetForm">
              <div class="form-field-wrapper">
                <v-text-field
                    v-model="email"
                    label="E-Mail-Adresse"
                    required
                    type="email"
                    dark
                    color="red darken-1"
                    :error-messages="errorMessage ? [errorMessage] : []"
                    class="centered-text-field"
                ></v-text-field>
              </div>

              <v-btn
                  color="red darken-1"
                  dark
                  block
                  large
                  class="mt-4"
                  type="submit"
                  :loading="isLoading"
              >
                {{ isLoading ? "Senden..." : "Passwort zurücksetzen" }}
              </v-btn>
            </v-form>

            <div v-if="successMessage" class="mt-4 text-center">
              <p class="green--text">{{ successMessage }}</p>
            </div>

            <div class="text-center mt-4">
              <p class="grey--text text-caption">
                Erinnern Sie sich an Ihr Passwort?
                <router-link to="/login" class="red--text text--darken-1">
                  Zurück zum Login
                </router-link>
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

async function handleResetPassword() {
  if (!email.value) {
    errorMessage.value = 'Bitte geben Sie Ihre E-Mail-Adresse ein';
    return;
  }

  if (!isValidEmail(email.value)) {
    errorMessage.value = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
    return;
  }

  try {
    isLoading.value = true;
    errorMessage.value = '';

    // Simuliere API-Aufruf-Verzögerung
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock-Erfolgsmeldung
    successMessage.value = 'Eine E-Mail mit Anweisungen zum Zurücksetzen Ihres Passworts wurde an Sie gesendet. Bitte überprüfen Sie Ihren Posteingang.';
    email.value = '';

  } catch (error) {
    errorMessage.value = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.';
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.login-page {
  background-color: #0a0e1a;
  min-height: 100vh;
}

.custom-card {
  background-color: #1c1f26 !important;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3) !important;
}

.form-field-wrapper {
  display: flex;
  justify-content: center;
}

.centered-text-field {
  max-width: 100%;
}

.v-text-field >>> .v-input__slot {
  background-color: #2A2E35 !important;
}

.v-text-field >>> .v-label {
  color: #fff !important;
}

.v-text-field >>> input {
  color: #fff !important;
}
</style>
