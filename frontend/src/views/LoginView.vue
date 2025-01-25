<template>
  <v-container fluid class="fill-height login-page">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12 custom-card">
          <v-card-text class="text-center">
            <h1 class="text-h4 mb-4 white--text">Login</h1>
            <p class="text-subtitle-1 mb-6 grey--text">Melde dich in deinem PC-Shop an!</p>

            <v-form @submit.prevent="handleLogin" ref="loginForm">
              <div class="form-field-wrapper">
                <v-text-field
                    v-model="email"
                    label="Email Addresse"
                    required
                    type="email"
                    dark
                    color="red darken-1"
                    :error-messages="errorMessage ? [errorMessage] : []"
                    class="centered-text-field"
                ></v-text-field>
              </div>

              <div class="form-field-wrapper">
                <v-text-field
                    v-model="password"
                    label="Password"
                    required
                    type="password"
                    dark
                    color="red darken-1"
                    @keyup.enter="handleLogin"
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
                {{ isLoading ? "Anmelden..." : "Anmelden" }}
              </v-btn>
            </v-form>

            <div class="text-center mt-4">
              <p class="grey--text text-caption">
                Noch keinen Account?
                <router-link to="/register" class="red--text text--darken-1">
                  Jetzt Registrieren
                </router-link>
              </p>
              <p class="grey--text text-caption mt-2">
                <router-link to="/forgot-password" class="red--text text--darken-1">
                  Passwort vergessen?
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
import {ref} from 'vue';
import {useAuthStore} from '@/store/auth.js';
import {useRouter} from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

async function handleLogin() {
  if (!email.value || !password.value) {
    errorMessage.value = 'Bitte füllen Sie alle Felder aus';
    return;
  }

  try {
    isLoading.value = true;
    errorMessage.value = '';

    const result = await authStore.login(email.value, password.value);

    if (result.success) {
      router.push('/');
    } else {
      errorMessage.value = result.message;
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Login fehlgeschlagen';
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
