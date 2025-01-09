<!-- Footer.vue -->
<template>
  <v-footer class="custom-footer">
    <v-container>
      <v-row >
        <!-- Logo Section -->
        <v-col cols="12" md="3" class="text-center text-md-left mb-6 mb-md-0">
          <v-img
              src="@/assets/logo.png"
              max-width="120"
              class="mx-auto mx-md-0"
              alt="Logo"
          />
        </v-col>

        <!-- Newsletter Section -->
        <v-col cols="12" class="text-center mb-6 border-top">
          <div class="newsletter-container">
            <p class="text-h6 mb-4">Subscribe to our newsletter</p>
            <div class="newsletter-form">
              <input
                  v-model="email"
                  type="email"
                  placeholder="Enter your email"
                  class="custom-input"
              />
              <button
                  @click="subscribe"
                  class="custom-button"
              >
                Subscribe
              </button>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- Navigation Links -->
      <v-row class="mt-6">
        <!-- Product Column -->
        <v-col cols="6" md="3">
          <h3 class="text-h6 mb-4">Product</h3>
          <v-list density="compact" bg-color="transparent">
            <v-list-item to="/features" class="footer-link">Features</v-list-item>
            <v-list-item to="/pricing" class="footer-link">Pricing</v-list-item>
          </v-list>
        </v-col>

        <!-- Resources Column -->
        <v-col cols="6" md="3">
          <h3 class="text-h6 mb-4">Resources</h3>
          <v-list density="compact" bg-color="transparent">
            <v-list-item to="/blog" class="footer-link">Blog</v-list-item>
            <v-list-item to="/guides" class="footer-link">User guides</v-list-item>
            <v-list-item to="/webinars" class="footer-link">Webinars</v-list-item>
          </v-list>
        </v-col>

        <!-- Company Column -->
        <v-col cols="6" md="3">
          <h3 class="text-h6 mb-4">Company</h3>
          <v-list density="compact" bg-color="transparent">
            <v-list-item to="/about" class="footer-link">About us</v-list-item>
            <v-list-item to="/contact" class="footer-link">Contact us</v-list-item>
          </v-list>
        </v-col>

        <!-- Plans & Pricing Column -->
        <v-col cols="6" md="3">
          <h3 class="text-h6 mb-4">Plans & Pricing</h3>
          <v-list density="compact" bg-color="transparent">
            <v-list-item to="/personal" class="footer-link">Personal</v-list-item>
            <v-list-item to="/startup" class="footer-link">Start up</v-list-item>
            <v-list-item to="/organization" class="footer-link">Organization</v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <!-- Bottom Section -->
      <v-row class="mt-6 pt-6 border-top">
        <v-col cols="12" md="6" class="text-center text-md-left">
          <div class="d-flex align-center justify-center justify-md-start">
            <div class="custom-select">
              <select v-model="selectedLanguage" class="select-input">
                <option v-for="lang in languages" :key="lang" :value="lang">
                  {{ lang }}
                </option>
              </select>
              <span class="select-arrow"></span>
            </div>
            <span class="mx-2">•</span>
            <span>© {{ new Date().getFullYear() }} PC Shop Inc.</span>
          </div>
        </v-col>
        <v-col cols="12" md="6" class="text-center text-md-right">
          <div class="d-flex justify-center justify-md-end">
            <v-btn
                v-for="(link, index) in legalLinks"
                :key="index"
                :to="link.route"
                variant="text"
                class="footer-link px-2"
            >
              {{ link.text }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      email: '',
      selectedLanguage: 'English',
      languages: ['English', 'Deutsch', 'Français'],
      legalLinks: [
        { text: 'Privacy', route: '/privacy' },
        { text: 'Terms', route: '/terms' },
        { text: 'Sitemap', route: '/sitemap' },
      ],
    }
  },
  methods: {
    subscribe() {
      // Implement newsletter subscription logic
      console.log('Subscribe with email:', this.email)
    },
  },
}
</script>

<style scoped>
.custom-footer {
  background-color: #0A0E1A !important;
  color: #ffffff;
  padding: 48px 0;
}

.footer-link {
  color: #ffffff !important;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #F44336 !important;
}

.newsletter-input {
  background-color: #2A2E35;
}

.newsletter-input :deep(.v-field__input) {
  color: #ffffff !important;
}

.subscribe-btn {
  background-color: #F44336 !important;
  color: white !important;
}

.subscribe-btn:hover {
  background-color: #a51307 !important;
}

.border-top {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* Custom Input Styling */
.custom-input {
  background-color: #2A2E35;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #ffffff;
  padding: 12px 16px;
  font-size: 14px;
  width: 100%;
  transition: all 0.3s ease;
}

.custom-input:focus {
  outline: none;
  border-color: #F44336;
  box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.2);
}

.custom-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

/* Custom Button Styling */
.custom-button {
  background-color: #F44336;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.custom-button:hover {
  background-color: #a51307;
}

/* Newsletter Container and Form Layout */
.newsletter-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.newsletter-form {
  display: flex;
  gap: 12px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

@media (max-width: 600px) {
  .newsletter-form {
    flex-direction: column;
  }

  .custom-button {
    width: 100%;
  }
}

/* Custom Select Styling */
.custom-select {
  position: relative;
  width: 120px;
}

.select-input {
  appearance: none;
  background-color: #2A2E35;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #ffffff;
  padding: 8px 32px 8px 12px;
  width: 100%;
  cursor: pointer;
  font-size: 14px;
}

.select-input:focus {
  outline: none;
  border-color: #F44336;
  box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.2);
}

.select-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #ffffff;
  pointer-events: none;
}

/* List Item Styling */
.footer-link {
  padding: 8px 0;
  display: block;
  font-size: 14px;
  transition: all 0.3s ease;
}
</style>
