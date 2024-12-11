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
                    label="E-Mail-Adresse"
                    required
                    type="email"
                    dark
                    color="red darken-1"
                    class="centered-text-field"
                ></v-text-field>
              </div>
              <div class="form-field-wrapper">
                <v-text-field
                    v-model="password"
                    label="Passwort"
                    required
                    type="password"
                    dark
                    color="red darken-1"
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

            <v-alert
                v-if="errorMessage"
                type="error"
                class="mt-4"
            >
              {{ errorMessage }}
            </v-alert>

            <div class="text-center mt-4">
              <p class="grey--text text-caption">
                Noch kein Konto?
                <router-link to="/register" class="red--text text--darken-1">
                  Jetzt registrieren
                </router-link>
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { authStore } from "@/store/auth.js";

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: null,
      isLoading: false
    };
  },
  methods: {
    async handleLogin() {
      if (this.$refs.loginForm.validate()) {
        this.isLoading = true;
        this.errorMessage = null;

        try {
          await authStore.login(this.email, this.password);
          this.$router.push('/');
        } catch (error) {
          this.errorMessage = error.response?.data?.message || "Anmeldung fehlgeschlagen";
        } finally {
          this.isLoading = false;
        }
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0a0e1a;
  min-height: 100vh;
}

.custom-card {
  background-color: #1c1f26 !important;
  border-radius: 10px;
  overflow: hidden;
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

.text-center {
  text-align: center;
}
</style>