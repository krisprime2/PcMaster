<template>
  <v-container fluid class="bg-black pa-8">
    <v-row justify="center">
      <v-col cols="12" lg="10" xl="8">
        <h1 class="text-h4 text-white text-center mb-8">Meistverkaufte Produkte</h1>
        <v-row justify="center">
          <v-col v-for="product in topSelling" :key="product.id" cols="12" sm="6" md="4">
            <v-card class="bg-grey-darken-4" elevation="10" height="100%">
              <div class="position-relative">
                <v-img
                    :src="product.image"
                    height="150"
                    cover
                    class="bg-grey-darken-3"
                ></v-img>
              </div>
              <v-card-text>
                <div class="text-subtitle-2 text-grey-lighten-1 mb-1">
                  Modell: {{ product.model }}
                </div>
                <div class="text-body-2 text-grey-lighten-2 mb-3">
                  Preis: {{ product.price }} €
                </div>
                <v-btn
                    color="indigo-accent-2"
                    variant="flat"
                    block
                    class="shop-now-btn"
                >
                  Jetzt Kaufen
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- New Arrivals -->
        <h1 class="text-h4 text-white text-center my-8">New Arrivals</h1>
        <v-row justify="center">
          <v-col v-for="product in newArrivals" :key="product.id" cols="12" sm="6" md="4">
            <v-card class="bg-grey-darken-4" elevation="10" height="100%">
              <v-img
                  :src="product.image"
                  height="150"
                  cover
                  class="bg-grey-darken-3"
              ></v-img>
              <v-card-text>
                <div class="text-h6 text-white mb-2">{{ product.name }}</div>
                <div class="text-body-2 text-grey-lighten-2 mb-2">
                  Price: ${{ product.price }}
                </div>
                <div class="text-body-2 text-grey-lighten-1 mb-3">
                  {{ product.description }}
                </div>
                <v-btn
                    color="indigo-accent-2"
                    variant="flat"
                    block
                    class="shop-now-btn"
                >
                  Jetzt Kaufen
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const topSelling = [
  {
    id: 1,
    model: 'XPS 17',
    price: '1,799',
    discount: 15,
    image: 'src/assets/images/delllaptop.jpg'
  },
  {
    id: 2,
    model: 'Alienware Aurora',
    price: '2,299',
    discount: 20,
    image: 'src/assets/images/pcred1.jpg'
  },
  {
    id: 3,
    model: 'MacBook Pro',
    price: '2,499',
    discount: 10,
    image: 'src/assets/images/macbook1.jpg'
  }
]

const newArrivals = [
  {
    id: 1,
    name: 'Gaming Beast',
    price: '1,299',
    description: 'High-performance gaming PC',
    image: 'src/assets/images/pcblue1.jpg'
  },
  {
    id: 2,
    name: 'Ultrabook Pro',
    price: '999',
    description: 'Lightweight ultrabook with 16GB RAM',
    image: 'src/assets/images/delllaptop2.jpg'
  },
  {
    id: 3,
    name: 'Workstation Pro',
    price: '2,499',
    description: 'Workstation with Intel Xeon processor',
    image: 'src/assets/images/pcred1.jpg'
  }
]
</script>

<style scoped>
.discount-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(var(--v-theme-primary), 0.9);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.shop-now-btn {
  text-transform: none;
  letter-spacing: 0.5px;
}

.v-card {
  transition: transform 0.2s ease-in-out;
}

.v-card:hover {
  transform: translateY(-4px);
}
</style>
