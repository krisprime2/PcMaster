<template>
  <v-card class="product-card">
    <div class="product-image">
      <img :src="getPlaceholderImage(product.id)" alt="Product Image" />
    </div>
    <div class="product-details">
      <h3 class="product-title">{{ product.name }}</h3>
      <p class="product-description">{{ product.description }}</p>
      <div class="product-actions">
        <v-btn color="primary" @click="addToCart(product)">
          Add to Cart
        </v-btn>
        <v-chip color="accent">{{ product.price | currency }}</v-chip>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    getPlaceholderImage(id) {
      return `/api/placeholder/${id}/400/300`;
    },
    addToCart(product) {
      console.log("added to cart");
      cartStore.addItem({
        id: product.id,
        name: product.name,
        price: product.price
      })
    }
  },
  filters: {
    currency(value) {
      return `€ ${value.toFixed(2)}`;
    }
  }
};
</script>

<style scoped>
.product-card {
  display: flex;
  background-color: #2a2e35;
  color: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
}

.product-image {
  flex-basis: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-image img {
  max-width: 100%;
  height: auto;
}

.product-details {
  flex-basis: 60%;
  padding-left: 1.5rem;
}

.product-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.product-description {
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.product-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.v-btn.v-btn--is-elevated.v-btn--has-bg {
  background-color: #d32f2f;
  color: #fff;
}

.v-btn.v-btn--is-elevated.v-btn--has-bg:hover {
  background-color: #b71c1c;
}

.v-chip {
  background-color: #636ae8;
  color: #fff;
}
</style>
