<!-- DeviceForm.vue -->
<template>
  <div class="form-wrapper">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="text-h3 font-weight-bold white--text mb-4">We buy Old Devices</h1>
        <p class="text-subtitle-1 white--text mb-6">We make it easy to turn your old devices into cash.</p>
        <v-btn
            color="#636AE8"
            class="get-started-btn"
            elevation="2"
            x-large
            @click="scrollToForm"
        >
          Get Started
        </v-btn>
      </div>
    </section>

    <!-- Form Section -->
    <v-container class="form-container">
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-card class="pa-6" color="#2A2E35">
            <v-card-text>
              <h2 class="text-h4 text-center mb-6 white--text">Device Inquiry Form</h2>

              <v-form v-if="!isSubmitted" ref="form" v-model="valid" @submit.prevent="submitForm">
                <v-text-field
                    v-model="formData.name"
                    label="Your Name"
                    required
                    :rules="nameRules"
                    outlined
                    dark
                    color="red darken-1"
                    class="mb-4"
                ></v-text-field>

                <v-text-field
                    v-model="formData.deviceType"
                    label="Device Type"
                    placeholder="e.g., Laptop, Smartphone"
                    required
                    :rules="requiredRule"
                    outlined
                    dark
                    color="red darken-1"
                    class="mb-4"
                ></v-text-field>

                <v-text-field
                    v-model="formData.modelNumber"
                    label="Model Number"
                    type="number"
                    required
                    :rules="requiredRule"
                    outlined
                    dark
                    color="red darken-1"
                    class="mb-4"
                ></v-text-field>

                <v-textarea
                    v-model="formData.description"
                    label="Description"
                    placeholder="Describe the condition of your device"
                    :rules="requiredRule"
                    outlined
                    dark
                    color="red darken-1"
                    rows="4"
                    class="mb-6"
                ></v-textarea>

                <v-btn
                    type="submit"
                    color="#F44336"
                    x-large
                    block
                    :loading="isLoading"
                    :disabled="!valid"
                >
                  {{ isLoading ? "Sending Inquiry..." : "Submit Inquiry" }}
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

    <!-- Contact Section -->
    <v-container class="contact-container">
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6" class="text-center">
          <h2 class="text-h4 mb-4 white--text">Get In Touch</h2>
          <p class="subtitle-1 grey--text text--lighten-1 mb-6">
            Reach out to us for more information or personalized assistance on your tech needs.
            We're here to help you make the best choices.
          </p>
          <v-btn
              color="#636AE8"
              x-large
              @click="contactUs"
          >
            Contact Us
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// Script remains the same as in your code
import axios from 'axios';

export default {
  name: 'DeviceForm',
  data: () => ({
    valid: false,
    isLoading: false,
    isSubmitted: false,
    serverError: null,
    successMessage: "Your inquiry has been successfully submitted!",
    formData: {
      name: '',
      deviceType: '',
      modelNumber: null,
      description: '',
      user: null,
      status: 'pending'
    },
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 50 || 'Name must be less than 50 characters'
    ],
    requiredRule: [
      v => !!v || 'This field is required'
    ]
  }),
  methods: {
    scrollToForm() {
      const formSection = document.querySelector('.form-container');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
      }
    },
    async submitForm() {
      if (this.$refs.form.validate()) {
        this.successMessage = null;
        this.serverError = null;
        this.isLoading = true;

        try {
          const userId = localStorage.getItem('userId');
          this.formData.user = userId;
          const response = await axios.post('http://localhost:1337/inquiry/create', this.formData);
          this.isSubmitted = true;
          this.$refs.form.reset();
        } catch (error) {
          this.serverError = error.response?.data?.message || 'An unexpected error occurred.';
          console.error('Form submission error:', error);
        } finally {
          this.isLoading = false;
        }
      }
    },
    contactUs() {
      window.location.href = 'mailto:contact@yourwebsite.com';
    }
  }
}
</script>

<style scoped>
.form-wrapper {
  background-color: #0A0E1A;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
}

.hero-section {
  position: relative;
  width: 100%;
  height: 60vh;
  margin: 0;
  padding: 0;
  background-image: url('../../public/HeroInquiry.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0 20px;
  max-width: 800px;
  margin: 0 auto;
}

.form-container {
  padding: 2rem 1rem;
  position: relative;
}

.contact-container {
  padding: 2rem 0;
  margin-bottom: 0.5rem;
}

.get-started-btn {
  text-transform: none;
}

.v-card {
  background-color: #1c1f26 !important;
}

.v-text-field ::v-deep .v-input__slot,
.v-textarea ::v-deep .v-input__slot {
  background-color: #2A2E35 !important;
}

.v-text-field ::v-deep .v-label,
.v-textarea ::v-deep .v-label {
  color: #fff !important;
}

.v-text-field ::v-deep input,
.v-textarea ::v-deep textarea {
  color: #fff !important;
}

@media (max-width: 960px) {
  .hero-section {
    height: 50vh;
  }

  .form-container {
    margin-top: -40px;
  }

  .hero-content h1 {
    font-size: 2rem !important;
  }
}

@media (max-width: 600px) {
  .hero-section {
    height: 40vh;
  }

  .form-container {
    padding: 1rem 0;
  }

  .v-card {
    border-radius: 0 !important;
    margin: 0 !important;
  }

  .hero-content h1 {
    font-size: 1.75rem !important;
  }

  .hero-content p {
    font-size: 1rem !important;
  }

  .contact-container {
    padding: 1rem;
  }
}

@media (max-width: 400px) {
  .hero-section {
    height: 35vh;
  }

  .hero-content h1 {
    font-size: 1.5rem !important;
  }
}
</style>
