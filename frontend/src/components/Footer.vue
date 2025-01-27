<template>
  <v-footer class="custom-footer">
    <v-container fluid class="px-4">
      <v-row justify="center">
        <v-col cols="12" sm="3" class="text-center mb-4">
          <v-img
              src="@/assets/logo.webp"
              max-width="120"
              class="mx-auto"
              alt="Logo"
          />
        </v-col>
      </v-row>
      <v-row class="border-top pt-4">
        <v-col cols="12" class="text-center mb-4">
          <div class="d-flex flex-column flex-sm-row align-center justify-center gap-3">
            <span>© {{ new Date().getFullYear() }} PC Shop Inc.</span>
          </div>
        </v-col>
        <v-row justify="center" class="mb-4">
          <v-col cols="12" class="text-center">
            <div class="d-flex justify-center gap-3">
              <v-btn
                  v-for="(social, index) in socialLinks"
                  :key="index"
                  :href="social.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  icon
                  variant="text"
                  class="footer-social-btn"
              >
                <v-icon :icon="social.icon" size="24" color="white" />
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <v-col cols="12" class="text-center mb-4">
          <div class="d-flex flex-wrap justify-center gap-3">
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
        <v-col cols="12" class="text-center">
          <div class="newsletter-container">
            <p class="text-h6 mb-4">Newsletter abonnieren</p>
            <div class="newsletter-form">
              <input
                  v-model="email"
                  type="email"
                  placeholder="E-Mail-Adresse eingeben"
                  class="custom-input"
              />
              <button
                  @click="subscribe"
                  class="custom-button"
              >
                Abonnieren
              </button>
            </div>
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
      selectedLanguage: 'Deutsch',
      legalLinks: [
        { text: 'Datenschutzerklärung', route: '/privacy' },
        { text: 'Impressum', route: '/impressum' },
        { text: 'Kontakt', route: '/contact' },
      ],
      socialLinks: [
        {
          icon: 'mdi-instagram',
          url: 'https://instagram.com'
        },
        {
          icon: 'mdi-facebook',
          url: 'https://facebook.com'
        },
        {
          icon: 'mdi-alpha-x-box',
          url: 'https://x.com'
        },
        {
          icon: 'mdi-youtube',
          url: 'https://youtube.com'
        },
        {
          icon: 'mdi-linkedin',
          url: 'https://linkedin.com'
        }
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
.custom-footer {
  background-color: #0A0E1A !important;
  color: #ffffff;
  padding: 32px 0;
  width: 100%;
  overflow-x: hidden;
}

.newsletter-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  margin: 0 auto;
}

.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 90%;
  max-width: 500px;
  margin: 0 auto;
}

@media (min-width: 600px) {
  .newsletter-form {
    flex-direction: row;
  }
}

.custom-input {
  flex: 1;
  padding: 12px;
  border: 1px solid #ffffff3d;
  border-radius: 4px;
  background: transparent;
  color: white;
  width: 100%;
}

.custom-button {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  background-color: #ff0000;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}

@media (min-width: 600px) {
  .custom-button {
    width: auto;
  }
}

.custom-button:hover {
  background-color: #cc0000;
}

.custom-select {
  position: relative;
  width: 200px;
  margin: 0 auto;
}

@media (min-width: 600px) {
  .custom-select {
    width: 120px;
    margin: 0;
  }
}

.select-input {
  width: 100%;
  padding: 8px 24px 8px 12px;
  border: 1px solid #ffffff3d;
  border-radius: 4px;
  background: transparent;
  color: white;
  appearance: none;
  cursor: pointer;
}

.select-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid white;
  pointer-events: none;
}

.footer-link {
  color: white !important;
  text-decoration: none;
}

.custom-input::placeholder {
  color: #ffffff8f;
}

.gap-3 {
  gap: 12px;
}

.footer-social-btn {
  background: rgba(255, 255, 255, 0.1) !important;
  transition: background-color 0.3s, transform 0.2s;
}

.footer-social-btn:hover {
  background: rgba(255, 255, 255, 0.2) !important;
  transform: translateY(-2px);
}
</style>
