<template>
  <v-app>
    <v-main class="bg-surface">
      <v-parallax
          src="./src/assets/images/desktopMainBg.png"
          :height="400"
      >
        <div class="d-flex flex-column fill-height justify-center align-center text-white text-center">
          <h1 class="text-h2 font-weight-thin mb-4">Wir kaufen alte Geräte</h1>
          <h4 class="subheading mb-6">Verwandeln Sie Ihre alte Technik mühelos in Bargeld</h4>
        </div>
      </v-parallax>

      <v-container class="py-12">
        <v-row justify="center">
          <v-col cols="12" md="3" class="d-none d-md-flex flex-column justify-center">
            <v-card class="mb-6" elevation="2" rounded="lg" theme="dark">
              <v-card-title class="text-h5 px-4 pt-4 pb-2">
                <v-icon icon="mdi-check-circle" color="primary" class="mr-2"></v-icon>
                Warum wir?
              </v-card-title>
              <v-card-text>
                <ul class="pl-4">
                  <li class="mb-2">Schnelle und faire Bewertungen</li>
                  <li class="mb-2">Sicheres Datenlöschen</li>
                  <li class="mb-2">Kostenloser Versand für alle Geräte</li>
                  <li class="mb-2">Umweltfreundliche Recycling-Optionen</li>
                </ul>
              </v-card-text>
            </v-card>
            <v-img
                src="../src/assets/images/recycling-image.jpg"
                height="200"
                cover
                class="rounded-lg"
            ></v-img>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="custom-card elevation-12">
              <v-card-text class="text-center">
                <h1 class="text-h4 mb-4 white--text">Geräte-Anfrageformular</h1>
                <p class="text-subtitle-1 mb-6 grey--text">Verwandeln Sie Ihre alte Technik in Bargeld!</p>

                <v-form
                    ref="form"
                    v-model="valid"
                    @submit.prevent="submitForm"
                    v-if="!isSubmitted"
                >
                  <div class="form-field-wrapper">
                    <v-text-field
                        v-model="formData.name"
                        label="Ihr Name"
                        :rules="nameRules"
                        required
                        dark
                        color="red darken-1"
                        class="centered-text-field"
                    ></v-text-field>
                  </div>

                  <div class="form-field-wrapper">
                    <v-text-field
                        v-model="formData.email"
                        label="Ihre E-Mail"
                        :rules="emailRules"
                        required
                        type="email"
                        dark
                        color="red darken-1"
                        class="centered-text-field"
                    ></v-text-field>
                  </div>

                  <div class="form-field-wrapper">
                    <v-text-field
                        v-model="formData.deviceType"
                        label="Gerätetyp"
                        :rules="requiredRules"
                        required
                        dark
                        color="red darken-1"
                        placeholder="z. B. Laptop, Smartphone"
                        class="centered-text-field"
                    ></v-text-field>
                  </div>

                  <div class="form-field-wrapper">
                    <v-text-field
                        v-model="formData.modelNumber"
                        label="Modellnummer"
                        :rules="requiredRules"
                        required
                        dark
                        color="red darken-1"
                        class="centered-text-field"
                    ></v-text-field>
                  </div>

                  <div class="form-field-wrapper">
                    <v-textarea
                        v-model="formData.description"
                        label="Beschreibung"
                        :rules="requiredRules"
                        required
                        dark
                        color="red darken-1"
                        placeholder="Beschreiben Sie den Zustand Ihres Geräts"
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
                      :disabled="!valid"
                  >
                    {{ isLoading ? "Anfrage wird gesendet..." : "Anfrage absenden" }}
                  </v-btn>
                </v-form>

                <v-alert
                    v-if="isSubmitted"
                    type="success"
                    variant="tonal"
                    class="mt-4"
                >
                  {{ successMessage }}
                </v-alert>

                <v-alert
                    v-if="serverError"
                    type="error"
                    variant="tonal"
                    class="mt-4"
                >
                  {{ serverError }}
                </v-alert>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="3" class="d-none d-md-flex flex-column justify-center">
            <v-card class="mb-6" elevation="2" rounded="lg" theme="dark">
              <v-card-title class="text-h5 px-4 pt-4 pb-2">
                <v-icon icon="mdi-clock-outline" color="primary" class="mr-2"></v-icon>
                Unser Prozess
              </v-card-title>
              <v-card-text>
                <ol class="pl-4">
                  <li class="mb-2">Senden Sie uns Ihre Gerätedetails</li>
                  <li class="mb-2">Erhalten Sie ein schnelles Angebot</li>
                  <li class="mb-2">Versenden Sie Ihr Gerät (kostenlos!)</li>
                  <li class="mb-2">Erhalten Sie schnell Ihr Geld</li>
                </ol>
              </v-card-text>
            </v-card>
            <v-img
                src="../src/assets/images/happy-customer.jpg"
                height="200"
                cover
                class="rounded-lg"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="py-12">
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="6" class="text-center">
            <h2 class="text-h3 font-weight-light mb-4">Kontaktieren Sie uns</h2>
            <p class="text-body-1 mb-6">
              Benötigen Sie weitere Informationen oder persönliche Unterstützung? Wir helfen Ihnen gerne dabei, die besten Entscheidungen für Ihre Technik zu treffen.
            </p>
            <v-btn
                color="red darken-1"
                size="x-large"
                rounded
                elevation="2"
                @click="router.push('/contact')"
            >
              Kontaktieren Sie uns
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';
import router from "@/router/index.js";

axios.defaults.headers.common['Content-Type'] = 'application/json';

const form = ref(null);
const valid = ref(false);
const isLoading = ref(false);
const isSubmitted = ref(false);
const serverError = ref(null);
const successMessage = ref("Ihre Anfrage wurde erfolgreich übermittelt!");

const formData = reactive({
  name: '',
  email: '',
  deviceType: '',
  modelNumber: '',
  description: '',
  status: 1
});

const nameRules = [
  v => !!v || 'Name ist erforderlich',
  v => (v && v.length <= 50) || 'Name darf maximal 50 Zeichen haben'
];

const emailRules = [
  v => !!v || 'E-Mail ist erforderlich',
  v => /.+@.+\..+/.test(v) || 'E-Mail muss gültig sein'
];

const requiredRules = [
  v => !!v || 'Dieses Feld ist erforderlich'
];

async function submitForm() {
  const { valid } = await form.value.validate();

  if (!valid) return;

  isLoading.value = true;
  serverError.value = null;

  try {
    const response = await axios.post('/inquiry/create', {
      name: formData.name,
      email: formData.email,
      deviceType: formData.deviceType,
      modelNumber: Number(formData.modelNumber),
      description: formData.description,
      status: 1 // INPROCESSING status
    })

    if (response.status === 200 || response.status === 201) {
      isSubmitted.value = true;

      // Reset form data
      Object.assign(formData, {
        name: '',
        email: '',
        deviceType: '',
        modelNumber: '',
        description: '',
        status: 1
      });
    }
  } catch (error) {
    console.error('Error details:', error.response?.data);
    serverError.value = error.response?.data?.message || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.';
  } finally {
    isLoading.value = false;
  }
}

const scrollToForm = () => {
  const formSection = document.querySelector('.form-container');
  if (formSection) {
    formSection.scrollIntoView({behavior: 'smooth'});
  }
};

const contactUs = () => {
  window.location.href = 'mailto:support@pcshop.de';
};
</script>

<style scoped>
.bg-surface {
  background-color: #0A0E1A !important;
}

.custom-card {
  background-color: #171717 !important;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3) !important;
}

.form-field-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
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

.v-textarea >>> textarea {
  color: #fff !important;
}
</style>
