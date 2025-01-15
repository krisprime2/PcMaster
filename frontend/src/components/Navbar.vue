<script setup>
import { onMounted } from 'vue'
import * as bootstrap from 'bootstrap'
import { useAuthStore } from '../store/auth'

const authStore = useAuthStore()

onMounted(() => {
  // Initialize all dropdowns
  const dropdownElementList = document.querySelectorAll('.dropdown-toggle')
  const dropdownList = [...dropdownElementList].map(dropdownToggleEl => new bootstrap.Dropdown(dropdownToggleEl))
})

const handleLogout = async () => {
  const result = await authStore.logout()
  if (result.success) {
    window.location.href = '/'
  }
}
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
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 text-lg-start text-end">
          <li class="nav-item">
            <router-link class="nav-link" to="/articles" @click="closeNavbar">Artikel</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/config" @click="closeNavbar">PC Konfigurator</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/inquiry" @click="closeNavbar">Gerät verkaufen</router-link>
          </li>
          <li v-if="authStore.isAuthenticated && authStore.user?.role === 1" class="nav-item dropdown">
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
                <router-link class="dropdown-item" to="/admin/user" @click="closeNavbar">User-Verwaltung</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/admin/articles" @click="closeNavbar">Artikel-Verwaltung</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/admin/orders" @click="closeNavbar">Bestell-Verwaltung</router-link>
              </li>
            </ul>
          </li>
        </ul>

        <ul class="navbar-nav ms-auto text-end">
          <template v-if="!authStore.isAuthenticated">
            <li class="nav-item me-2">
              <router-link class="btn btn-outline-light" to="/login" @click="closeNavbar">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="btn btn-outline-light" to="/register" @click="closeNavbar">Registrieren</router-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <span class="nav-link me-3">Welcome, {{ authStore.user?.name }}</span>
            </li>
            <li class="nav-item">
              <button @click="handleLogout" class="btn btn-outline-light">Logout</button>
            </li>
          </template>
          <li class="nav-item">
            <router-link to="/cart" class="nav-link" @click="closeNavbar">
              <v-icon
                  color="white"
                  class="me-2"
                  style="font-size: 24px;"
              >
                mdi-cart
              </v-icon>
            </router-link>
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
  color: rgba(255, 255, 255, 0.7) !important;
}

.nav-link:hover {
  color: #ffffff !important;
}

/* Buttons */
.btn-outline-light {
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.5);
}

.btn-outline-light:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Dropdown-Styling */
.dropdown-menu {
  background-color: #1c1f26;
  border: none;
}

.dropdown-item {
  color: rgba(255, 255, 255, 0.7) !important;
}

.dropdown-item:hover {
  color: #ffffff !important;
  background-color: rgba(255, 255, 255, 0.1) !important;
}
</style>
