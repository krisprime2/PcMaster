<template>
  <v-container fluid class="fill-height contact-page">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12 custom-card">
          <v-card-text class="text-center">
            <h1 class="text-h4 mb-4 white--text">Kontaktformular</h1>
            <p class="text-subtitle-1 mb-6 grey--text">
              Wir freuen uns auf Ihre Nachricht!
            </p>

            <v-form ref="contactForm" @submit.prevent="submitForm">
              <div class="form-field-wrapper">
                <v-text-field
                    v-model="name"
                    label="Name"
                    required
                    dark
                    color="red darken-1"
                    :rules="[rules.required]"
                    class="centered-text-field"
                ></v-text-field>
              </div>

              <div class="form-field-wrapper">
                <v-text-field
                    v-model="email"
                    label="E-Mail"
                    required
                    dark
                    color="red darken-1"
                    :rules="[rules.required, rules.email]"
                    class="centered-text-field"
                ></v-text-field>
              </div>

              <div class="form-field-wrapper">
                <v-textarea
                    v-model="message"
                    label="Nachricht"
                    required
                    dark
                    color="red darken-1"
                    :rules="[rules.required]"
                    class="centered-text-field"
                ></v-textarea>
              </div>

              <v-btn
                  color="red darken-1"
                  dark
                  block
                  class="mt-4"
                  type="submit"
              >
                Senden
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        :timeout="snackbar.timeout"
        top
        right
    >
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')

const contactForm = ref(null)

const rules = {
  required: (value) => !!value || 'Pflichtfeld',
  email: (value) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(value) || 'Bitte eine gültige E-Mail eingeben'
  },
}

const snackbar = ref({
  show: false,
  message: '',
  color: 'success',
  timeout: 3000,
})

function showSnackbar(message, color = 'success') {
  snackbar.value.message = message
  snackbar.value.color = color
  snackbar.value.show = true
}

function submitForm() {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value || !message.value || !name.value || !pattern.test(email.value)) {
    showSnackbar('Bitte füllen Sie alle Felder korrekt aus!', 'error')

  } else {
    showSnackbar('Nachricht gesendet!', 'success')
    resetForm()
  }
}

function resetForm() {
  name.value = ''
  email.value = ''
  message.value = ''
  contactForm.value.resetValidation()
}
</script>

<style scoped>
.contact-page {
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

.v-text-field >>> .v-input__slot,
.v-textarea >>> .v-input__slot {
  background-color: #2A2E35 !important;
}

.v-text-field >>> .v-label,
.v-textarea >>> .v-label {
  color: #fff !important;
}

.v-text-field >>> input,
.v-textarea >>> textarea {
  color: #fff !important;
}
</style>
