<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Shopping Cart</h1>
        <p v-if="cartItems.length === 0">Your cart is empty.</p>
      </v-col>
    </v-row>
    <v-row v-if="cartItems.length > 0">
      <v-col cols="12" v-for="item in cartItems" :key="item.id">
        <v-card class="mb-4">
          <v-row no-gutters>
            <v-col cols="3">
              <v-img :src="item.image || 'https://via.placeholder.com/150'" aspect-ratio="1"></v-img>
            </v-col>
            <v-col cols="9">
              <v-card-title>{{ item.name }}</v-card-title>
              <v-card-subtitle>{{ item.description }}</v-card-subtitle>
              <v-card-text>
                <div>Price: {{ formatPrice(item.price) }}</div>
                <div>Quantity: {{ item.quantity }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn small color="error" @click="removeFromCart(item.id)">
                  Remove
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="cartItems.length > 0">
      <v-col cols="12" class="text-right">
        <h2>Total: {{ formatPrice(totalPrice) }}</h2>
        <v-btn color="primary" @click="proceedToCheckout">Proceed to Checkout</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cartItems: [],
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
  },
  methods: {
    loadCartItems() {
      const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
      const itemIds = cart.map((item) => item.id);
      console.log(itemIds)
      axios
          .post('http://localhost:1337/api/articles/by-ids', {ids: itemIds})
          .then((response) => {
            console.log(response)
            const articles = response.data;
            this.cartItems = cart.map((cartItem) => {
              const article = articles.find((a) => a.id === cartItem.id);
              return {
                ...article,
                quantity: cartItem.quantity,
              };
            });
          })
          .catch((error) => {
            console.error('Error loading cart items:', error);
          });
    },
    formatPrice(price) {
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      }).format(price);
    },
    removeFromCart(id) {
      this.cartItems = this.cartItems.filter((item) => item.id !== id);
      const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
      const updatedCart = cart.filter((item) => item.id !== id);
      sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    },
    proceedToCheckout() {
      this.$router.push('/checkout');
    },
  },
  mounted() {
    this.loadCartItems();
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 1rem;
}
</style>
