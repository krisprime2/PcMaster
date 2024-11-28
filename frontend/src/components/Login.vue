<template>
  <div class="login-page">
    <div class="login-card">
      <h2 class="login-title">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">E-Mail-Adresse</label>
          <input
              id="email"
              type="email"
              class="form-control"
              v-model="email"
              placeholder="E-Mail eingeben"
              required
          />
        </div>
        <div class="form-group">
          <label for="password">Passwort</label>
          <input
              id="password"
              type="password"
              class="form-control"
              v-model="password"
              placeholder="Passwort eingeben"
              required
          />
        </div>
        <button type="submit" class="btn btn-primary btn-block">Anmelden</button>
      </form>
      <p class="login-footer">
        Noch kein Konto? <router-link to="/register">Jetzt registrieren</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    handleLogin() {
      // Login-Logik hier implementieren
      console.log('E-Mail:', this.email);
      console.log('Passwort:', this.password);
      alert('Login erfolgreich!');
    },
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #0a0e1a;
}

.login-card {
  background-color: #2a2e35;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  color: #fff;
  text-align: center;
}

.login-title {
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

.form-group label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #3a3f47;
  color: #fff;
}

.form-control:focus {
  outline: none;
  border-color: #636ae8;
}

.btn-block {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
}

.login-footer {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #ccc;
}

.login-footer a {
  color: #636ae8;
  text-decoration: none;
}

.login-footer a:hover {
  text-decoration: underline;
}
</style>
