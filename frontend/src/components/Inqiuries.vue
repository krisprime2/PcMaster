<template>
  <div class="inquiry-page">
    <div class="container text-white">
      <div class="card bg-dark">
        <div class="card-body">
          <h1 class="card-title">Verkaufsanfrage</h1>
          <p class="card-text">Stelle eine Anfrage, um dein Gerät zu verkaufen!</p>
          <form v-if="!isSubmitted" @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">Dein Name</label>
              <input
                  type="text"
                  id="name"
                  class="form-control"
                  v-model="form.name"
                  placeholder="Deinen Namen eingeben"
                  required
              />
            </div>
            <div class="form-group">
              <label for="deviceType">Gerätetyp</label>
              <input
                  type="text"
                  id="deviceType"
                  class="form-control"
                  v-model="form.deviceType"
                  placeholder="Gerätetyp eingeben (z.B. Laptop, Smartphone)"
                  required
              />
            </div>
            <div class="form-group">
              <label for="modelNumber">Modellnummer</label>
              <input
                  type="number"
                  id="modelNumber"
                  class="form-control"
                  v-model="form.modelNumber"
                  placeholder="Modellnummer eingeben"
                  required
              />
            </div>
            <div class="form-group">
              <label for="description">Beschreibung</label>
              <textarea
                  id="description"
                  class="form-control"
                  v-model="form.description"
                  placeholder="Beschreibe den Zustand des Geräts"
                  rows="4"
                  required
              ></textarea>
            </div>
            <button type="submit" class="btn-primary inquiry-btn">
              {{ isLoading ? "Anfrage senden..." : "Anfrage senden" }}
            </button>
          </form>

          <div v-if="isSubmitted" class="alert alert-success mt-3">
            {{ successMessage }}
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
        name: "",
        description: "",
        deviceType: "",
        modelNumber: null,
      },
      successMessage: null,
      serverError: null,
      isLoading: false,
      isSubmitted: false,
    };
  },
  methods: {
    async submitForm() {
      this.successMessage = null;
      this.serverError = null;

      this.isLoading = true; // Ladezustand aktivieren

      try {
        // Sende Anfrage-Daten an dein Sails.js Backend
        const response = await axios.post("http://localhost:1337/inquiry/create", this.form);

        // Erfolgshandling
        this.successMessage = "Deine Anfrage wurde erfolgreich übermittelt!";
        this.isSubmitted = true;
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
  },
};
</script>

<style scoped>
.inquiry-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #0A0E1A;
  padding: 1rem;
}

.container {
  width: 100%;
  max-width: 400px;
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

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #444;
  border-radius: 5px;
  background-color: #2A2E35;
  color: #fff;
  transition: border-color 0.3s ease;
}

.form-control::placeholder {
  color: rgba(255, 255, 255, 0.42); /* Weiß */
  opacity: 1; /* Standardmäßig könnte die Deckkraft reduziert sein */
}

.form-control:focus {
  border-color: #d32f2f;
  outline: none;
}

.inquiry-btn {
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

.inquiry-btn:hover {
  background-color: #b71c1c;
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
</style>
