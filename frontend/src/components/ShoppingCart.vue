<template>
  <v-container>
    <v-card class="pa-4">
      <h1 class="text-h3 text-center my-6">Ihr Warenkorb</h1>
      <v-data-table
          :headers="headers"
          :items="cart"
          item-value="product.id"
          class="elevation-1"
          dense
      >
        <template #item.name="{ item }">
          <div class="d-flex align-center">
            <v-avatar class="me-2">
              <v-img :src="item.product.image" alt="Product Image"></v-img>
            </v-avatar>
            <span>{{ item.product.name }}</span>
          </div>
        </template>

        <template #item.price="{ item }">
          {{ item.product.price.toFixed(2) }} €
        </template>

        <template #item.quantity="{ item }">
          <v-text-field
              v-model.number="item.quantity"
              type="number"
              min="1"
              dense
              hide-details
              class="w-50"
              @change="updateQuantity(item)"
          ></v-text-field>
        </template>

        <template #item.total="{ item }">
          {{ (item.product.price * item.quantity).toFixed(2) }} €
        </template>

        <template #item.actions="{ item }">
          <v-icon
              color="red darken-1"
              clickable
              @click="removeItem(item.product.id)"
              title="Entfernen"
          >
            mdi-delete
          </v-icon>
        </template>

        <template #no-data>
          <div class="text-center py-6">
            <h2 class="text-h5">Ihr Warenkorb ist leer</h2>
          </div>
        </template>
      </v-data-table>

      <v-divider class="my-4"></v-divider>

      <div class="d-flex justify-space-between">
        <h2 class="text-h6">Gesamt: {{ cartTotal.toFixed(2) }} €</h2>
        <v-btn
            color="green darken-1"
            :disabled="cart.length === 0"
            @click="checkout"
        >
          Zur Kasse
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import axios from "axios";

const cart = ref([]);
const headers = [
  { text: "Produkt", value: "name" },
  { text: "Preis", value: "price", align: "end" },
  { text: "Menge", value: "quantity", align: "center" },
  { text: "Gesamt", value: "total", align: "end" },
  { text: "Aktionen", value: "actions", align: "center" },
];

const cartTotal = computed(() =>
    cart.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
);

async function fetchCart() {
  const response = await axios.get('/api/cart')
  cart.value = response.data;
  console.log(response.data)
}

async function removeItem(productId) {
  await axios.post(`/api/cart/remove`, { productId });
  await fetchCart();
}

async function clearCart() {
  await axios.post(`/api/cart/clear`)
  await fetchCart();
}

onMounted(fetchCart);
</script>

<style scoped>
/* Styling für die Produktbilder */
.v-avatar {
  width: 40px;
  height: 40px;
}
</style>
