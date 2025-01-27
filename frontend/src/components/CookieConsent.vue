<template>
  <transition name="slide">
    <div v-if="isVisible" class="cookie-consent">
      <div class="cookie-content">
        <div class="cookie-main">
          <div class="cookie-basic-text">
            <h3>Cookie-Einstellungen</h3>
            <p class="cookie-description">
              Diese Website verwendet Cookies. Einige sind technisch notwendig, andere helfen uns, Ihre Erfahrung zu verbessern.
            </p>
          </div>

          <div class="cookie-basic-buttons">
            <button @click="handleDecline" class="decline-btn">
              Nur notwendige Cookies
            </button>
            <button @click="handleAccept" class="accept-btn">
              Alle akzeptieren
            </button>
            <button @click="showDetails = !showDetails" class="details-btn">
              {{ showDetails ? 'Details ausblenden' : 'Details anzeigen' }}
            </button>
          </div>
        </div>

        <div v-if="showDetails" class="cookie-details-section">
          <div class="cookie-options">
            <div class="cookie-option">
              <label class="option-label">
                <input
                    type="checkbox"
                    v-model="cookieSettings.necessary"
                    disabled
                    checked
                >
                <span class="option-text">
                  <strong>Notwendige Cookies</strong>
                  <p>Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.</p>
                </span>
              </label>
            </div>

            <div class="cookie-option">
              <label class="option-label">
                <input
                    type="checkbox"
                    v-model="cookieSettings.functional"
                >
                <span class="option-text">
                  <strong>Funktionale Cookies</strong>
                  <p>Diese Cookies ermöglichen verbesserte Funktionalität wie Sprachwahl und Formularerinnerungen.</p>
                </span>
              </label>
            </div>

            <div class="cookie-option">
              <label class="option-label">
                <input
                    type="checkbox"
                    v-model="cookieSettings.analytics"
                >
                <span class="option-text">
                  <strong>Analyse-Cookies</strong>
                  <p>Helfen uns zu verstehen, wie Besucher unsere Website nutzen.</p>
                </span>
              </label>
            </div>

            <div class="cookie-option">
              <label class="option-label">
                <input
                    type="checkbox"
                    v-model="cookieSettings.marketing"
                >
                <span class="option-text">
                  <strong>Marketing-Cookies</strong>
                  <p>Werden verwendet, um Werbung für Sie relevanter zu gestalten.</p>
                </span>
              </label>
            </div>

            <button @click="handleSave" class="save-btn">
              Auswahl speichern
            </button>
          </div>
        </div>

        <button @click="closeConsent" class="close-btn" aria-label="Schließen">
          ×
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'CookieConsent',
  data() {
    return {
      isVisible: false,
      showDetails: false,
      consentVersion: '1.0',
      cookieSettings: {
        necessary: true,
        functional: false,
        analytics: false,
        marketing: false
      }
    }
  },
  mounted() {
    this.checkConsent()
  },
  methods: {
    checkConsent() {
      const savedSettings = localStorage.getItem('cookieSettings')
      const savedVersion = localStorage.getItem('consentVersion')

      if (savedSettings && savedVersion === this.consentVersion) {
        this.cookieSettings = { ...this.cookieSettings, ...JSON.parse(savedSettings) }
        this.isVisible = false
      } else {
        this.isVisible = true
      }
    },
    handleAccept() {
      Object.keys(this.cookieSettings).forEach(key => {
        this.cookieSettings[key] = true
      })
      this.saveSettings()
    },
    handleDecline() {
      Object.keys(this.cookieSettings).forEach(key => {
        this.cookieSettings[key] = key === 'necessary'
      })
      this.saveSettings()
    },
    handleSave() {
      this.saveSettings()
    },
    saveSettings() {
      localStorage.setItem('cookieSettings', JSON.stringify(this.cookieSettings))
      localStorage.setItem('consentVersion', this.consentVersion)
      localStorage.setItem('consentTimestamp', new Date().toISOString())
      this.isVisible = false
    },
    closeConsent() {
      this.handleDecline()
    }
  }
}
</script>

<style scoped>
.cookie-consent {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #1a1a1a;
  color: #ffffff;
  border-top: 1px solid #333;
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.2);
  z-index: 50;
}

.cookie-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.5rem;
  position: relative;
}

.cookie-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.cookie-basic-text {
  flex: 1;
}

.cookie-basic-buttons {
  display: flex;
  gap: 0.75rem;
}

h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #ffffff;
}

.cookie-description {
  color: #e0e0e0;
  line-height: 1.5;
}

.cookie-details-section {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #333;
}

.cookie-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cookie-option {
  padding: 1rem;
  background-color: #2a2a2a;
  border-radius: 0.5rem;
  border: 1px solid #333;
}

.option-label {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  cursor: pointer;
}

.option-text {
  flex: 1;
}

.option-text strong {
  display: block;
  color: #ffffff;
  margin-bottom: 0.25rem;
}

.option-text p {
  color: #b0b0b0;
  font-size: 0.875rem;
  margin: 0;
}

.decline-btn,
.accept-btn,
.save-btn,
.details-btn {
  padding: 0.625rem 1.25rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
}

.decline-btn {
  background-color: transparent;
  border: 1px solid #666;
  color: #ffffff;
}

.decline-btn:hover {
  background-color: #333;
}

.accept-btn {
  background-color: #2563eb;
  color: white;
  border: none;
}

.accept-btn:hover {
  background-color: #1d4ed8;
}

.details-btn {
  background-color: transparent;
  border: 1px solid #666;
  color: #ffffff;
}

.details-btn:hover {
  background-color: #333;
}

.save-btn {
  background-color: #2563eb;
  color: white;
  border: none;
  margin-top: 1rem;
}

.save-btn:hover {
  background-color: #1d4ed8;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  color: #999;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
}

.close-btn:hover {
  color: #ffffff;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(100%);
}

@media (max-width: 768px) {
  .cookie-main {
    flex-direction: column;
    align-items: stretch;
  }

  .cookie-basic-buttons {
    flex-direction: column;
  }

  .cookie-basic-buttons button {
    width: 100%;
  }
}
</style>
