//src/components/Register.vue
<template>
  <v-container fluid class="fill-height register-page">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12 custom-card">
          <v-card-text class="text-center">
            <h1 class="text-h4 mb-4 white--text">Register</h1>
            <p class="text-subtitle-1 mb-6 grey--text">Create your PC-Shop account</p>

            <v-form @submit.prevent="handleRegister" ref="form">
              <v-text-field
                  v-model="form.username"
                  label="Username"
                  required
                  dark
                  color="red darken-1"
                  :error-messages="error ? [error] : []"
              ></v-text-field>

              <v-text-field
                  v-model="form.email"
                  label="Email Address"
                  required
                  type="email"
                  dark
                  color="red darken-1"
              ></v-text-field>

              <v-text-field
                  v-model="form.password"
                  label="Password"
                  required
                  type="password"
                  dark
                  color="red darken-1"
              ></v-text-field>

              <v-text-field
                  v-model="form.confirmPassword"
                  label="Confirm Password"
                  required
                  type="password"
                  dark
                  color="red darken-1"
                  @keyup.enter="handleRegister"
              ></v-text-field>

              <v-btn
                  color="red darken-1"
                  dark
                  block
                  large
                  class="mt-4"
                  type="submit"
                  :loading="loading"
              >
                {{ loading ? "Creating Account..." : "Create Account" }}
              </v-btn>
            </v-form>

            <div class="text-center mt-4">
              <p class="grey--text text-caption">
                Already have an account?
                <router-link to="/login" class="red--text text--darken-1">
                  Sign in
                </router-link>
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAuthStore } from '@/store/auth'

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const error = ref('')
const authStore = useAuthStore()

async function handleRegister() {
  if (!form.username || !form.email || !form.password || !form.confirmPassword) {
    error.value = 'Please fill in all fields'
    return
  }

  if (form.password !== form.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }

  try {
    loading.value = true
    error.value = ''
    await authStore.register({
      username: form.username,
      email: form.email,
      password: form.password
    })
  } catch (err) {
    error.value = err.response?.data?.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-page {
  background-color: #0a0e1a;
  min-height: 100vh;
}

.custom-card {
  background-color: #1c1f26 !important;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3) !important;
}

.v-text-field >>> .v-input__slot {
  background-color: #2A2E35 !important;
}

.v-text-field >>> .v-label {
  color: #fff !important;
}

.v-text-field >>> input {
  color: #fff !important;
}
</style>
