<script setup>
import { onMounted } from 'vue'
import * as bootstrap from 'bootstrap'
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark sticky-top">
    <div class="container">
      <router-link class="navbar-brand" to="/">PCMaster</router-link>
      <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="#laptops">Laptops</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#pcs">PCs</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#components">Komponenten</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#configurator">Konfigurator</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/inquiry">Gerät verkaufen</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/user">User Dashboard</router-link>
          </li>
        </ul>
        <form class="search-form d-flex ms-auto">
          <input
              class="form-control me-2"
              type="search"
              placeholder="Produkte suchen..."
              aria-label="Suche"
          />
          <button class="btn btn-outline-light" type="submit">Suchen</button>
        </form>
        <ul class="navbar-nav ms-6">
          <li class="nav-item">
            <router-link class="btn btn-outline-light" to="/login">Login</router-link>
          </li>
        </ul>

      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #1c1f26;
}

.navbar-brand {
  color: #ffffff !important;
}

.nav-link {
  color: rgba(255,255,255,0.7) !important;
}

.nav-link:hover {
  color: #ffffff !important;
}

.btn-outline-light {
  color: #ffffff;
  border-color: rgba(255,255,255,0.5);
}

.btn-outline-light:hover {
  background-color: rgba(255,255,255,0.1);
}
</style>
