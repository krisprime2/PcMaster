<template>
  <v-container fluid class="fill-height register-page">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12 custom-card">
          <v-card-text class="text-center">
            <h1 class="text-h4 mb-4 white--text">Registrieren</h1>
            <p class="text-subtitle-1 mb-6 grey--text">
              Erstelle ein Konto, um auf deinen PC-Shop zuzugreifen!
            </p>

            <!-- User Registration -->
            <v-form @submit.prevent="submitForm" ref="form">
              <v-text-field
                  v-model="form.username"
                  label="Benutzername"
                  required
                  dark
                  color="red darken-1"
              ></v-text-field>
              <v-text-field
                  v-model="form.email"
                  label="E-Mail-Adresse"
                  required
                  outlined
                  type="email"
                  dark
                  color="red darken-1"
              ></v-text-field>
              <v-text-field
                  v-model="form.password"
                  label="Passwort"
                  required
                  type="password"
                  dark
                  color="red darken-1"
              ></v-text-field>
              <v-text-field
                  v-model="form.confirmPassword"
                  label="Passwort bestätigen"
                  required
                  type="password"
                  dark
                  color="red darken-1"
              ></v-text-field>
              <v-btn
                  color="red darken-1"
                  dark
                  block
                  large
                  class="mt-4"
                  @click="submitForm"
                  :loading="isLoading"
              >
                {{ isLoading ? "Registrieren..." : "Registrieren" }}
              </v-btn>
            </v-form>

            <!-- Success Message -->
            <v-alert v-if="isRegistered" type="success" class="mt-4">
              Registrierung erfolgreich! Du kannst dich jetzt einloggen.
              <v-btn
                  color="success"
                  block

                  @click="goToLogin"
              >
                Weiter zum Login
              </v-btn>
            </v-alert>

            <!-- Error Message -->
            <v-alert v-if="error" type="error" class="mt-4">
              {{ error }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      error: null,
      isLoading: false,
      isRegistered: false,
    };
  },
  methods: {
    async submitForm() {
      if (this.$refs.form.validate()) {
        if (this.form.password !== this.form.confirmPassword) {
          this.error = "Die Passwörter stimmen nicht überein.";
          return;
        }
        this.isLoading = true;
        this.error = null;

        try {
          await axios.post("http://localhost:1337/user/create", {
            name: this.form.username,
            email: this.form.email,
            password: this.form.password,
          });
          this.isRegistered = true;
        } catch (error) {
          this.error = error.response?.data?.message || "Es ist ein Fehler aufgetreten.";
        } finally {
          this.isLoading = false;
        }
      }
    },
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.register-page {
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

.v-text-field >>> .v-input__slot {
  background-color: #2a2e35 !important;
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
