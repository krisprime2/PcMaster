<template>
  <v-app>
    <v-main class="bg-surface">
      <!-- Hero Section -->
      <v-parallax
          src="../public/desktopMainBg.png"
          :height="400"
      >
        <div class="d-flex flex-column fill-height justify-center align-center text-white text-center">
          <h1 class="text-h2 font-weight-thin mb-4">Wir kaufen alte Geräte</h1>
          <h4 class="subheading mb-6">Verwandeln Sie Ihre alte Technik mühelos in Bargeld</h4>
          <v-btn
              color="primary"
              size="x-large"
              rounded
              elevation="2"
              @click="scrollToForm"
          >
            Jetzt starten
          </v-btn>
        </div>
      </v-parallax>

      <!-- Form section with side content -->
      <v-container class="py-12">
        <v-row justify="center">
          <!-- Left side box -->
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

          <!-- Main form -->
          <v-col cols="12" md="6">
            <v-card
                class="mx-auto pa-6"
                elevation="8"
                rounded="xl"
                :loading="isLoading"
                theme="dark"
            >
              <template v-slot:loader>
                <v-progress-linear indeterminate color="primary"></v-progress-linear>
              </template>

              <v-card-title class="text-h4 font-weight-bold text-center mb-6">
                Geräte-Anfrageformular
              </v-card-title>

              <v-form v-if="!isSubmitted" ref="form" v-model="valid" @submit.prevent="submitForm">
                <v-text-field
                    v-model="formData.name"
                    label="Ihr Name"
                    :rules="nameRules"
                    variant="outlined"
                    color="primary"
                    class="mb-4"
                ></v-text-field>

                <v-text-field
                    v-model="formData.email"
                    label="Ihre E-Mail"
                    :rules="emailRules"
                    variant="outlined"
                    color="primary"
                    class="mb-4"
                    type="email"
                ></v-text-field>

                <v-text-field
                    v-model="formData.deviceType"
                    label="Gerätetyp"
                    placeholder="z. B. Laptop, Smartphone"
                    :rules="requiredRule"
                    variant="outlined"
                    color="primary"
                    class="mb-4"
                ></v-text-field>

                <v-text-field
                    v-model="formData.modelNumber"
                    label="Modellnummer"
                    type="text"
                    :rules="requiredRule"
                    variant="outlined"
                    color="primary"
                    class="mb-4"
                ></v-text-field>

                <v-textarea
                    v-model="formData.description"
                    label="Beschreibung"
                    placeholder="Beschreiben Sie den Zustand Ihres Geräts"
                    :rules="requiredRule"
                    variant="outlined"
                    color="primary"
                    rows="4"
                    class="mb-6"
                ></v-textarea>

                <v-btn
                    type="submit"
                    color="primary"
                    size="x-large"
                    block
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
            </v-card>
          </v-col>

          <!-- Right side box -->
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

      <!-- Contact section -->
      <v-container class="py-12">
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="6" class="text-center">
            <h2 class="text-h3 font-weight-light mb-4">Kontaktieren Sie uns</h2>
            <p class="text-body-1 mb-6">
              Benötigen Sie weitere Informationen oder persönliche Unterstützung? Wir helfen Ihnen gerne dabei, die besten Entscheidungen für Ihre Technik zu treffen.
            </p>
            <v-btn
                color="secondary"
                size="x-large"
                rounded
                elevation="2"
                @click="contactUs"
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
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import axios from 'axios';

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
  user: null,
  status: 'pending'
});

const nameRules = [
  v => !!v || 'Name ist erforderlich',
  v => v.length <= 50 || 'Name darf maximal 50 Zeichen haben'
];

const emailRules = [
  v => !!v || 'E-Mail ist erforderlich',
  v => /.+@.+\..+/.test(v) || 'E-Mail muss gültig sein'
];

const requiredRule = [
  v => !!v || 'Dieses Feld ist erforderlich'
];

const schema = yup.object({
  name: yup.string().required('Name ist erforderlich').max(50, 'Name darf maximal 50 Zeichen haben'),
  email: yup.string().required('E-Mail ist erforderlich').email('E-Mail muss gültig sein'),
  deviceType: yup.string().required('Gerätetyp ist erforderlich'),
  modelNumber: yup.string().required('Modellnummer ist erforderlich'),
  description: yup.string().required('Beschreibung ist erforderlich')
});

const {handleSubmit, errors} = useForm({
  validationSchema: schema,
});

const submitForm = handleSubmit(async (values) => {
  isLoading.value = true;
  serverError.value = null;

  try {
    const userId = localStorage.getItem('userId');
    formData.user = userId;
    await axios.post('/inquiry/create', formData);
    isSubmitted.value = true;
    Object.assign(formData, {
      name: '',
      email: '',
      deviceType: '',
      modelNumber: '',
      description: '',
      user: null,
      status: 'pending'
    });
  } catch (error) {
    serverError.value = error.response?.data?.message || 'Ein unerwarteter Fehler ist aufgetreten.';
    console.error('Fehler beim Absenden des Formulars:', error);
  } finally {
    isLoading.value = false;
  }
});

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
  background-color: #121212;
}
</style>
