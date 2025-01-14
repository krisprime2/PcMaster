<template>
  <v-app>
    <v-main class="bg-background">
      <!-- Hero Section -->
      <v-parallax
          src="../public/desktopMainBg.png"
          :height="400"
      >
        <div class="d-flex flex-column fill-height justify-center align-center text-white text-center">
          <h1 class="text-h2 font-weight-thin mb-4">We Buy Old Devices</h1>
          <h4 class="subheading mb-6">Turn your old tech into cash with ease</h4>
          <v-btn
              color="primary"
              size="x-large"
              rounded
              elevation="2"
              @click="scrollToForm"
          >
            Get Started
          </v-btn>
        </div>
      </v-parallax>

      <!-- Form Section with Side Content -->
      <v-container class="form-container py-12">
        <v-row justify="center">
          <v-col cols="12" md="3" class="d-none d-md-flex flex-column justify-center">
            <v-card class="mb-6" flat>
              <v-card-text>
                <h3 class="text-h5 mb-3">Why Choose Us?</h3>
                <ul class="pl-4">
                  <li>Fast and fair valuations</li>
                  <li>Secure data wiping</li>
                  <li>Free shipping for all devices</li>
                  <li>Eco-friendly recycling options</li>
                </ul>
              </v-card-text>
            </v-card>
            <v-img
                src="../public/recycling-image.jpg"
                height="200"
                cover
                class="rounded-lg"
            ></v-img>
          </v-col>

          <v-col cols="12" md="6">
            <v-card
                class="mx-auto pa-6"
                elevation="8"
                rounded="xl"
                :loading="isLoading"
            >
              <template v-slot:loader>
                <v-progress-linear indeterminate color="primary"></v-progress-linear>
              </template>

              <v-card-title class="text-h4 font-weight-bold text-center mb-6">
                Device Inquiry Form
              </v-card-title>

              <v-form v-if="!isSubmitted" ref="form" v-model="valid" @submit.prevent="submitForm">
                <v-text-field
                    v-model="formData.name"
                    label="Your Name"
                    :rules="nameRules"
                    variant="outlined"
                    color="primary"
                    class="mb-4"
                ></v-text-field>

                <v-text-field
                    v-model="formData.deviceType"
                    label="Device Type"
                    placeholder="e.g., Laptop, Smartphone"
                    :rules="requiredRule"
                    variant="outlined"
                    color="primary"
                    class="mb-4"
                ></v-text-field>

                <v-text-field
                    v-model="formData.modelNumber"
                    label="Model Number"
                    type="text"
                    :rules="requiredRule"
                    variant="outlined"
                    color="primary"
                    class="mb-4"
                ></v-text-field>

                <v-textarea
                    v-model="formData.description"
                    label="Description"
                    placeholder="Describe the condition of your device"
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
                  {{ isLoading ? "Sending Inquiry..." : "Submit Inquiry" }}
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

          <v-col cols="12" md="3" class="d-none d-md-flex flex-column justify-center">
            <v-card class="mb-6" flat>
              <v-card-text>
                <h3 class="text-h5 mb-3">Our Process</h3>
                <ol class="pl-4">
                  <li>Submit your device details</li>
                  <li>Receive a quick quote</li>
                  <li>Ship your device (it's free!)</li>
                  <li>Get paid fast</li>
                </ol>
              </v-card-text>
            </v-card>
            <v-img
                src="../public/happy-customer.jpg"
                height="200"
                cover
                class="rounded-lg"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>

      <!-- Contact Section -->
      <v-container class="contact-container py-12">
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="6" class="text-center">
            <h2 class="text-h3 font-weight-light mb-4">Get In Touch</h2>
            <p class="text-body-1 mb-6">
              Need more information or personalized assistance? We're here to help you make the best choices for your tech needs.
            </p>
            <v-btn
                color="secondary"
                size="x-large"
                rounded
                elevation="2"
                @click="contactUs"
            >
              Contact Us
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
const successMessage = ref("Your inquiry has been successfully submitted!");

const formData = reactive({
  name: '',
  deviceType: '',
  modelNumber: '',
  description: '',
  user: null,
  status: 'pending'
});

const nameRules = [
  v => !!v || 'Name is required',
  v => v.length <= 50 || 'Name must be less than 50 characters'
];

const requiredRule = [
  v => !!v || 'This field is required'
];

const schema = yup.object({
  name: yup.string().required('Name is required').max(50, 'Name must be less than 50 characters'),
  deviceType: yup.string().required('Device type is required'),
  modelNumber: yup.string().required('Model number is required'),
  description: yup.string().required('Description is required')
});

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const submitForm = handleSubmit(async (values) => {
  isLoading.value = true;
  serverError.value = null;

  try {
    const userId = localStorage.getItem('userId');
    formData.user = userId;
    await axios.post('http://localhost:1337/inquiry/create', formData);
    isSubmitted.value = true;
    Object.assign(formData, {
      name: '',
      deviceType: '',
      modelNumber: '',
      description: '',
      user: null,
      status: 'pending'
    });
  } catch (error) {
    serverError.value = error.response?.data?.message || 'An unexpected error occurred.';
    console.error('Form submission error:', error);
  } finally {
    isLoading.value = false;
  }
});

const scrollToForm = () => {
  const formSection = document.querySelector('.form-container');
  if (formSection) {
    formSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const contactUs = () => {
  window.location.href = 'support@pcshop.de';
};
</script>

<style scoped>
.bg-background {
  background-color: #000000;
}

.form-container {
  background-color: #000000;
}

.contact-container {
  background-color: #000000;
}

/* Add any additional custom styles here */
</style>
