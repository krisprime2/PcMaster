<!-- Footer.vue -->
<template>
  <v-footer class="custom-footer">
    <v-container fluid class="px-4"> <!-- Added fluid and px-4 for better mobile handling -->
      <v-row>
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
        <v-col cols="6" sm="3" class="px-2"> <!-- Added sm breakpoint and adjusted padding -->
          <h3 class="text-h6 mb-4">Product</h3>
          <v-list density="compact" bg-color="transparent" class="pa-0"> <!-- Added pa-0 -->
            <v-list-item to="/features" class="footer-link">Features</v-list-item>
            <v-list-item to="/pricing" class="footer-link">Pricing</v-list-item>
          </v-list>
        </v-col>

        <!-- Resources Column -->
        <v-col cols="6" sm="3" class="px-2">
          <h3 class="text-h6 mb-4">Resources</h3>
          <v-list density="compact" bg-color="transparent" class="pa-0">
            <v-list-item to="/blog" class="footer-link">Blog</v-list-item>
            <v-list-item to="/guides" class="footer-link">User guides</v-list-item>
            <v-list-item to="/webinars" class="footer-link">Webinars</v-list-item>
          </v-list>
        </v-col>

        <!-- Company Column -->
        <v-col cols="6" sm="3" class="px-2">
          <h3 class="text-h6 mb-4">Company</h3>
          <v-list density="compact" bg-color="transparent" class="pa-0">
            <v-list-item to="/about" class="footer-link">About us</v-list-item>
            <v-list-item to="/contact" class="footer-link">Contact us</v-list-item>
          </v-list>
        </v-col>

        <!-- Plans & Pricing Column -->
        <v-col cols="6" sm="3" class="px-2">
          <h3 class="text-h6 mb-4">Plans & Pricing</h3>
          <v-list density="compact" bg-color="transparent" class="pa-0">
            <v-list-item to="/personal" class="footer-link">Personal</v-list-item>
            <v-list-item to="/startup" class="footer-link">Start up</v-list-item>
            <v-list-item to="/organization" class="footer-link">Organization</v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <!-- Bottom Section -->
      <v-row class="mt-6 pt-6 border-top">
        <v-col cols="12" md="6" class="text-center text-md-left">
          <div class="d-flex align-center justify-center justify-md-start flex-wrap"> <!-- Added flex-wrap -->
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
          <div class="d-flex justify-center justify-md-end flex-wrap"> <!-- Added flex-wrap -->
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
// Script remains the same
export default {
  name: 'Footer',
  data() {
    return {
      email: '',
      selectedLanguage: 'English',
      languages: ['English', 'Deutsch', 'Français'],
      legalLinks: [
        { text: 'Datenschutzerklärung', route: '/privacy' },
        { text: 'Urheberrecht', route: '/copyright' },
        { text: 'Sitemap', route: '/sitemap' },
      ],
    }
  },
  methods: {
    subscribe() {
      console.log('Subscribe with email:', this.email)
    },
  },
}
</script>

<style scoped>
/* Previous styles remain the same */
.custom-footer {
  background-color: #0A0E1A !important;
  color: #ffffff;
  padding: 48px 0;
  width: 100%; /* Added to ensure full width */
  overflow-x: hidden; /* Added to prevent horizontal scroll */
}

/* Update container max-width for mobile */
.newsletter-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%; /* Updated from 600px */
  margin: 0 auto;
  padding: 20px 0; /* Removed horizontal padding */
}

.newsletter-form {
  display: flex;
  gap: 12px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

/* Rest of the styles remain the same */
</style>
