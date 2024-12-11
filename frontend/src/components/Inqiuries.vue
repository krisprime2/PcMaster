<template>
  <v-container fluid class="fill-height inquiry-page">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12 custom-card">
          <v-card-text>
            <h1 class="text-h4 mb-4 white--text text-center">Verkaufsanfrage</h1>
            <p class="text-subtitle-1 mb-6 grey--text text-center">Stelle eine Anfrage, um dein Gerät zu verkaufen!</p>

            <v-form v-if="!isSubmitted" @submit.prevent="submitForm" ref="inquiryForm">
              <div class="form-field-wrapper">
                <v-text-field
                    v-model="form.name"
                    label="Dein Name"
                    required
                    dark
                    color="red darken-1"
                    class="centered-text-field"
                ></v-text-field>
              </div>

              <div class="form-field-wrapper">
                <v-text-field
                    v-model="form.deviceType"
                    label="Gerätetyp"
                    placeholder="z.B. Laptop, Smartphone"
                    required
                    dark
                    color="red darken-1"
                    class="centered-text-field"
                ></v-text-field>
              </div>

              <div class="form-field-wrapper">
                <v-text-field
                    v-model="form.modelNumber"
                    label="Modellnummer"
                    type="number"
                    required
                    dark
                    color="red darken-1"
                    class="centered-text-field"
                ></v-text-field>
              </div>

              <div class="form-field-wrapper">
                <v-textarea
                    v-model="form.description"
                    label="Beschreibung"
                    placeholder="Beschreibe den Zustand des Geräts"
                    required
                    dark
                    color="red darken-1"
                    rows="4"
                    class="centered-text-field"
                ></v-textarea>
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
                {{ isLoading ? "Anfrage senden..." : "Anfrage senden" }}
              </v-btn>
            </v-form>

            <v-alert
                v-if="isSubmitted"
                type="success"
                class="mt-4"
            >
              {{ successMessage }}
            </v-alert>

            <v-alert
                v-if="serverError"
                type="error"
                class="mt-4"
            >
              {{ serverError }}
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
        name: "",
        description: "",
        deviceType: "",
        modelNumber: null,
        user: null,
      },
      successMessage: "Deine Anfrage wurde erfolgreich übermittelt!",
      serverError: null,
      isLoading: false,
      isSubmitted: false,
    };
  },
  methods: {
    async submitForm() {
      if (this.$refs.inquiryForm.validate()) {
        this.successMessage = null;
        this.serverError = null;
        this.isLoading = true;

        try {
          const userId = localStorage.getItem("userId");
          this.form.user = userId;

          const response = await axios.post("http://localhost:1337/inquiry/create", this.form);
          this.isSubmitted = true;
        } catch (error) {
          this.serverError = error.response?.data?.message || "Es ist ein unerwarteter Fehler aufgetreten.";
        } finally {
          this.isLoading = false;
        }
      }
    },
  },
};
</script>

<style scoped>
.inquiry-page {
  background-color: #0A0E1A;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
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

.v-text-field >>> input,
.v-textarea >>> textarea {
  color: #fff !important;
}
</style>