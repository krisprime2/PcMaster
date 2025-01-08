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
            <router-link class="nav-link" to="/">Startseite</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/articles">Artikel</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cart">Warenkorb</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/inquiry">Gerät verkaufen</router-link>
          </li>
          <li class="nav-item dropdown">
            <a
                class="nav-link dropdown-toggle"
                href="#"
                id="adminDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
              Admin
            </a>
            <ul class="dropdown-menu" aria-labelledby="adminDropdown">
              <li>
                <router-link class="dropdown-item" to="/admin/user">User-Verwaltung</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/admin/articles">Artikel-Verwaltung</router-link>
              </li>
            </ul>
          </li>
        </ul>

        <ul class="navbar-nav ms-auto">
          <li class="nav-item me-2">
            <router-link class="btn btn-outline-light" to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-outline-light" to="/register">Registrieren</router-link>
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

/* Buttons */
.btn-outline-light {
  color: #ffffff;
  border-color: rgba(255,255,255,0.5);
}

.btn-outline-light:hover {
  background-color: rgba(255,255,255,0.1);
}

/* Dropdown-Styling */
.dropdown-menu {
  background-color: #1c1f26;
  border: none;
}

.dropdown-item {
  color: rgba(255,255,255,0.7) !important;
}

.dropdown-item:hover {
  color: #ffffff !important;
  background-color: rgba(255,255,255,0.1) !important;
}
</style>
