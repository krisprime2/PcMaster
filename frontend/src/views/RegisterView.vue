<template>
  <v-container fluid class="fill-height register-page">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12 custom-card">
          <v-card-text class="text-center">
            <h1 class="text-h4 mb-4 white--text">Register</h1>
            <p class="text-subtitle-1 mb-6 grey--text">Create your PC-Shop account</p>

            <v-form ref="form" @submit.prevent="handleRegister">
              <v-text-field
                  v-model="formData.name"
                  label="Name"
                  required
                  dark
                  color="red darken-1"
                  :rules="[v => !!v || 'Name is required']"
              ></v-text-field>

              <v-text-field
                  v-model="formData.email"
                  label="Email Address"
                  required
                  type="email"
                  dark
                  color="red darken-1"
                  :error-messages="errorMessage ? [errorMessage] : []"
                  :rules="[
                    v => !!v || 'Email is required',
                    v => /.+@.+\..+/.test(v) || 'Email must be valid'
                  ]"
              ></v-text-field>

              <v-text-field
                  v-model="formData.password"
                  label="Password"
                  required
                  type="password"
                  dark
                  color="red darken-1"
                  :rules="[v => !!v || 'Password is required']"
              ></v-text-field>

              <v-text-field
                  v-model="confirmPassword"
                  label="Confirm Password"
                  required
                  type="password"
                  dark
                  color="red darken-1"
                  :rules="[
                    v => !!v || 'Confirm password is required',
                    v => v === formData.password || 'Passwords must match'
                  ]"
              ></v-text-field>

              <v-btn
                  color="red darken-1"
                  dark
                  block
                  large
                  class="mt-4"
                  type="submit"
                  :loading="isLoading"
              >
                {{ isLoading ? "Creating Account..." : "Create Account" }}
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
import {ref, reactive} from 'vue';
import {useAuthStore} from '@/store/auth.js';
import {useRouter} from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const form = ref(null);
const isLoading = ref(false);
const errorMessage = ref('');
const confirmPassword = ref('');

const formData = reactive({
  name: '',
  email: '',
  password: ''
});

async function handleRegister() {
  const {valid} = await form.value.validate();

  if (!valid) {
    return;
  }

  if (formData.password !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match';
    return;
  }

  try {
    isLoading.value = true;
    errorMessage.value = '';

    const result = await authStore.register(formData);
    console.log(result)
    if (result.success) {
      router.push('/articles');
    } else {
      errorMessage.value = result.message;
    }
  } catch (err) {
    errorMessage.value = err.response?.data?.message || 'hier ist der fehler';
  } finally {
    isLoading.value = false;
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

.v-text-field :deep(.v-input__slot) {
  background-color: #2A2E35 !important;
}

.v-text-field :deep(.v-label) {
  color: #fff !important;
}

.v-text-field :deep(input) {
  color: #fff !important;
}
</style>
