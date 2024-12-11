<template>
  <v-container fluid class="fill-height register-page">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12 custom-card">
          <v-card-text>
            <h1 class="text-h4 mb-4 white--text">Registrieren</h1>
            <p class="text-subtitle-1 mb-6 grey--text">Erstelle ein Konto, um auf deinen PC-Shop zuzugreifen!</p>

            <!-- Step 1: User Registration -->
            <v-form v-if="step === 1" @submit.prevent="nextStep" ref="form1">
              <v-text-field
                  v-model="form.username"
                  label="Benutzername"
                  prepend-icon="mdi-account"
                  required
                  dark
                  color="red darken-1"
              ></v-text-field>
              <v-text-field
                  v-model="form.email"
                  label="E-Mail-Adresse"
                  prepend-icon="mdi-email"
                  required
                  type="email"
                  dark
                  color="red darken-1"
              ></v-text-field>
              <v-text-field
                  v-model="form.password"
                  label="Passwort"
                  prepend-icon="mdi-lock"
                  required
                  type="password"
                  dark
                  color="red darken-1"
              ></v-text-field>
              <v-text-field
                  v-model="form.confirmPassword"
                  label="Passwort bestätigen"
                  prepend-icon="mdi-lock-check"
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
                  @click="nextStep"
              >
                Weiter
              </v-btn>
            </v-form>

            <!-- Step 2: Address Input -->
            <v-form v-if="step === 2" @submit.prevent="submitForm" ref="form2">
              <v-text-field
                  v-model="form.firstName"
                  label="Vorname"
                  prepend-icon="mdi-account"
                  required
                  dark
                  color="red darken-1"
              ></v-text-field>
              <v-text-field
                  v-model="form.lastName"
                  label="Nachname"
                  prepend-icon="mdi-account"
                  required
                  dark
                  color="red darken-1"
              ></v-text-field>
              <v-text-field
                  v-model="form.street"
                  label="Straße"
                  prepend-icon="mdi-road"
                  required
                  dark
                  color="red darken-1"
              ></v-text-field>
              <v-text-field
                  v-model="form.streetNumber"
                  label="Hausnummer"
                  prepend-icon="mdi-home"
                  required
                  dark
                  color="red darken-1"
              ></v-text-field>
              <v-text-field
                  v-model="form.city"
                  label="Stadt"
                  prepend-icon="mdi-city"
                  required
                  dark
                  color="red darken-1"
              ></v-text-field>
              <v-text-field
                  v-model="form.postalNumber"
                  label="Postleitzahl"
                  prepend-icon="mdi-map-marker"
                  required
                  dark
                  color="red darken-1"
              ></v-text-field>
              <v-text-field
                  v-model="form.country"
                  label="Land"
                  prepend-icon="mdi-flag"
                  required
                  dark
                  color="red darken-1"
              ></v-text-field>
              <div class="d-flex">
                <v-btn
                    color="grey darken-1"
                    dark
                    large
                    class="mr-2"
                    @click="prevStep"
                >
                  Zurück
                </v-btn>
                <v-btn
                    color="red darken-1"
                    dark
                    large
                    class="flex-grow-1"
                    @click="submitForm"
                    :loading="isLoading"
                >
                  {{ isLoading ? "Registrieren..." : "Registrieren" }}
                </v-btn>
              </div>
            </v-form>

            <!-- Success Message -->
            <v-alert
                v-if="isRegistered"
                type="success"
                class="mt-4"
            >
              Registrierung erfolgreich! Du kannst dich jetzt einloggen.
              <v-btn
                  color="success"
                  dark
                  block
                  class="mt-2"
                  @click="goToLogin"
              >
                Weiter zum Login
              </v-btn>
            </v-alert>

            <!-- Error Message -->
            <v-alert
                v-if="error"
                type="error"
                class="mt-4"
            >
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
        firstName: "",
        lastName: "",
        street: "",
        streetNumber: "",
        city: "",
        postalNumber: "",
        country: "",
      },
      step: 1,
      error: null,
      isLoading: false,
      isRegistered: false,
    };
  },
  methods: {
    nextStep() {
      if (this.$refs.form1.validate()) {
        if (this.form.password !== this.form.confirmPassword) {
          this.error = "Die Passwörter stimmen nicht überein.";
          return;
        }
        this.error = null;
        this.step = 2;
      }
    },
    prevStep() {
      this.step = 1;
    },
    async submitForm() {
      if (this.$refs.form2.validate()) {
        this.isLoading = true;
        this.error = null;

        try {
          await axios.post("http://localhost:1337/user/create", {
            name: this.form.username,
            email: this.form.email,
            password: this.form.password,
            firstName: this.form.firstName,
            lastName: this.form.lastName,
            street: this.form.street,
            streetNumber: this.form.streetNumber,
            city: this.form.city,
            postalNumber: this.form.postalNumber,
            country: this.form.country,
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
  background-color: #0A0E1A;
}

.custom-card {
  background-color: #1c1f26 !important;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3) !important;
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
