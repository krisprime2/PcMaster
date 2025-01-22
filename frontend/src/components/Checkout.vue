<template>
  <v-app class="checkout-page">
    <v-main>
      <header class="main-header">
        <h1 class="text-h3 font-weight-bold white--text">Checkout</h1>
      </header>

      <v-container class="mt-6">
        <v-row>
          <v-col cols="12" md="8">
            <v-card class="mb-6" elevation="2">
              <v-card-title class="text-h5">Shipping Information</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="submitOrder">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                          v-model="shippingForm.firstName"
                          label="First Name"
                          dark
                          outlined
                          dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                          v-model="shippingForm.lastName"
                          label="Last Name"
                          dark
                          outlined
                          dense
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-text-field
                      v-model="shippingForm.email"
                      label="Email"
                      dark
                      outlined
                      dense
                  ></v-text-field>

                  <v-row>
                    <v-col cols="12" md="8">
                      <v-text-field
                          v-model="shippingForm.street"
                          label="Street"
                          dark
                          outlined
                          dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                          v-model="shippingForm.streetNumber"
                          label="Street Number"
                          dark
                          outlined
                          dense
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                          v-model="shippingForm.postalNumber"
                          label="Postal Code"
                          dark
                          outlined
                          dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                          v-model="shippingForm.city"
                          label="City"
                          dark
                          outlined
                          dense
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-text-field
                      v-model="shippingForm.country"
                      label="Country"
                      dark
                      outlined
                      dense
                  ></v-text-field>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card elevation="2">
              <v-card-title class="text-h5">Order Summary</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item v-for="item in cart" :key="item.item.id">
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.type === 'configuration' ? 'PC Konfiguration' : item.item.name }}
                      </v-list-item-title>
                      <v-list-item-subtitle>Quantity: {{ item.quantity }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      {{ (item.item.price * item.quantity).toFixed(2) }}€
                    </v-list-item-action>
                  </v-list-item>

                  <v-divider class="my-4"></v-divider>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="text-h6">Total</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action class="text-h6">
                      {{ totalPrice }}€
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-card-actions>
                <v-btn
                    color="red darken-1"
                    block
                    x-large
                    @click="submitOrder"
                    :loading="loading"
                >
                  Continue to Payment
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import axios from "axios";

const router = useRouter();
const authStore = useAuthStore();
const loading = ref(false);

const cart = ref([]);

const shippingForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  street: '',
  streetNumber: '',
  city: '',
  postalNumber: '',
  country: ''
});

const totalPrice = computed(() => {
  return cart.value
      .reduce((total, item) => total + item.item.price * item.quantity, 0)
      .toFixed(2);
});

const fetchCart = async () => {
  try {
    const response = await axios.get('/api/cart')
    cart.value = response.data;
    console.log(response.data)
  } catch (error) {
    console.error('Failed to fetch cart:', error);
  }
};

onMounted(() => {
  fetchCart();
  const user = authStore.user;
  if (user) {
    shippingForm.value = {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      street: user.street || '',
      streetNumber: user.streetNumber || '',
      city: user.city || '',
      postalNumber: user.postalNumber || '',
      country: user.country || ''
    };
  }
});

const submitOrder = async () => {
  try {
    loading.value = true;

    const userId = authStore.user.id;

    const userUpdateData = {
      firstName: shippingForm.value.firstName,
      lastName: shippingForm.value.lastName,
      email: shippingForm.value.email,
      street: shippingForm.value.street,
      streetNumber: shippingForm.value.streetNumber,
      city: shippingForm.value.city,
      postalNumber: shippingForm.value.postalNumber,
      country: shippingForm.value.country
    };

    await axios.put(`/user/${userId}`, userUpdateData);

    authStore.user = { ...authStore.user, ...userUpdateData };

    const orderData = {
      price: totalPrice.value,
      firstName: shippingForm.value.firstName,
      lastName: shippingForm.value.lastName,
      street: shippingForm.value.street,
      streetNumber: Number(shippingForm.value.streetNumber),
      city: shippingForm.value.city,
      postalNumber: Number(shippingForm.value.postalNumber),
      country: shippingForm.value.country,
      user: userId,
      articles: cart.value
          .filter(item => item.type === 'article')
          .map(item => item.item.id),
      configuration: cart.value
          .find(item => item.type === 'configuration')?.item.id || null
    };

    console.log(orderData)
    await axios.post('/api/order/create', orderData);

    router.push('/payment');
  } catch (error) {
    console.error('Order submission failed:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.checkout-page {
  background-color: #0A0E1A;
  min-height: 100vh;
}

.main-header {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
  url('../assets/images/desktopMainBg.png') no-repeat center center / cover;
  padding: 50px 0;
  text-align: center;
}

.v-card {
  background-color: #2A2E35 !important;
}

.v-text-field :deep(.v-input__slot) {
  background-color: #1c1f26 !important;
}

.v-list {
  background-color: transparent !important;
  color: #ffffff !important;
}

.v-card-title,
.v-list-item__title,
.v-list-item__subtitle {
  color: #ffffff !important;
}

.v-divider {
  border-color: rgba(255, 255, 255, 0.1) !important;
}
</style>
