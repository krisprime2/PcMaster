<template>
  <div class="register-page">
    <div class="container text-white">
      <div class="card bg-dark">
        <div class="card-body">
          <h1 class="card-title">Registrieren</h1>
          <p class="card-text">Erstelle ein Konto, um auf deinen PC-Shop zuzugreifen!</p>
          <form v-if="!isRegistered" @submit.prevent="submitForm">
            <div class="form-group">
              <label for="username">Benutzername</label>
              <input
                  type="text"
                  id="username"
                  class="form-control"
                  v-model="form.username"
                  placeholder="Benutzername eingeben"
                  required
              />
            </div>
            <div class="form-group">
              <label for="email">E-Mail-Adresse</label>
              <input
                  type="email"
                  id="email"
                  class="form-control"
                  v-model="form.email"
                  placeholder="E-Mail eingeben"
                  required
              />
            </div>
            <div class="form-group">
              <label for="password">Passwort</label>
              <input
                  type="password"
                  id="password"
                  class="form-control"
                  v-model="form.password"
                  placeholder="Passwort eingeben"
                  required
              />
            </div>
            <div class="form-group">
              <label for="confirmPassword">Passwort bestätigen</label>
              <input
                  type="password"
                  id="confirmPassword"
                  class="form-control"
                  v-model="form.confirmPassword"
                  placeholder="Passwort erneut eingeben"
                  required
              />
              <small v-if="error" class="text-danger">{{ error }}</small>
            </div>
            <button type="submit" class="btn-primary register-btn">
              {{ isLoading ? "Registrieren..." : "Registrieren" }}
            </button>
          </form>

          <div v-if="isRegistered" class="alert alert-success mt-3">
            {{ successMessage }}
            <button @click="goToLogin" class="btn btn-success mt-3">
              Weiter zum Login
            </button>
          </div>

          <div v-if="serverError" class="alert alert-danger mt-3">
            {{ serverError }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      error: null, // Client-seitige Fehler wie Passwortabgleich
      successMessage: null, // Erfolgsnachricht vom Server
      serverError: null, // Fehlernachricht vom Server
      isLoading: false, // Status für Ladezustand
      isRegistered: false, // Status ob Registrierung abgeschlossen ist
    };
  },
  methods: {
    async submitForm() {
      this.error = null;
      this.successMessage = null;
      this.serverError = null;

      // Passwort-Validierung
      if (this.form.password !== this.form.confirmPassword) {
        this.error = "Die Passwörter stimmen nicht überein.";
        return;
      }

      this.isLoading = true; // Ladezustand aktivieren

      try {
        // Sende Registrierungsdaten an dein Sails.js Backend
        const response = await axios.post("http://localhost:1337/user/create", {
          name: this.form.username,
          email: this.form.email,
          password: this.form.password,
        });

        // Erfolgshandling
        this.successMessage = "Registrierung erfolgreich! Du kannst dich jetzt einloggen.";
        this.isRegistered = true; // Setze Status auf erfolgreich
      } catch (error) {
        // Fehler vom Server anzeigen
        if (error.response && error.response.data && error.response.data.message) {
          this.serverError = error.response.data.message;
        } else {
          this.serverError = "Es ist ein unerwarteter Fehler aufgetreten.";
        }
      } finally {
        this.isLoading = false; // Ladezustand deaktivieren
      }
    },
    goToLogin() {
      this.$router.push("/login"); // Zum Login weiterleiten (Voraussetzung: Vue Router ist konfiguriert)
    },
  },
};
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #0A0E1A;
  padding: 1rem;
}

.container {
  width: 100%;
  max-width: 400px; /* Begrenzte Breite für Desktop */
}

.card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  background-color: #1c1f26;
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #fff;
}

.card-text {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #ccc;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #fff;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #444;
  border-radius: 5px;
  background-color: #2A2E35;
  color: #fff;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  border-color: #d32f2f;
  outline: none;
}

.form-control::placeholder {
  color: #999;
}

.text-danger {
  display: block;
  margin-top: 0.5rem;
  color: #ff6b6b;
  font-size: 0.9rem;
}

.alert {
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 0.9rem;
}

.alert-success {
  background-color: #28a745;
  color: white;
}

.alert-danger {
  background-color: #dc3545;
  color: white;
}

.register-btn {
  margin-top: 1rem;
  padding: 10px 20px;
  width: 100%;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: #d32f2f;
  border: none;
  color: white;
}

.register-btn:hover {
  background-color: #b71c1c;
}

.btn-success {
  background-color: #28a745;
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;
}

.btn-success:hover {
  background-color: #218838;
}

/* Mobile optimizations */
@media (max-width: 576px) {
  .card-title {
    font-size: 1.25rem;
  }

  .card-text {
    font-size: 0.9rem;
  }

  .register-btn,
  .btn-success {
    font-size: 0.9rem;
  }
}
</style>
