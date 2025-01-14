<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app class="sidebar" width="200">
      <v-list-item class="px-6 py-4">
        <v-list-item-content>
          <v-list-item-title class="text-h5 white--text">Kategorien</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list nav dense class="px-4">
        <v-list-item
            v-for="category in categories"
            :key="category.id"
            @click="activeCategory = category.id"
            :class="{ 'category-active': activeCategory === category.id }"
            class="mb-2 rounded-lg category-item"
        >
          <v-list-item-icon>
            <v-icon color="blue-grey lighten-4">{{ getCategoryIcon(category.id) }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ category.name }}</v-list-item-title>
          </v-list-item-content>
          <v-chip small class="ml-4" color="blue-grey darken-3">
            {{ category.count }}
          </v-chip>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-row class="mb-6">
      <v-col cols="12" :style="{ marginLeft: '100px' }"> <!-- Adjust margin to match sidebar width -->
        <v-card class="banner-card">
          <v-img
              src="/api/placeholder/banner/1200/300"
              height="200"
              gradient="to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%"
              position="center"
          >
            <v-row class="fill-height align-center justify-center">
              <v-col cols="8" class="text-center">
                <div class="banner-content">
                  <h1 class="text-h3 font-weight-bold white--text mb-2">
                    PC Shop
                  </h1>
                  <p class="text-h6 white--text">
                    Hochwertige Computer, Laptops und Komponenten
                  </p>
                </div>
              </v-col>
            </v-row>
          </v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-main class="main-content">
      <v-container fluid class="pa-6">
        <v-row>
          <v-col cols="12">
            <v-card class="search-card mb-6">
              <v-card-text>
                <v-text-field
                    v-model="searchQuery"
                    label="Produkte suchen..."
                    prepend-inner-icon="mdi-magnify"
                    clearable
                    outlined
                    dense
                    dark
                    hide-details
                    class="search-field"
                ></v-text-field>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col
                  v-for="product in displayedProducts"
                  :key="product.id"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
              >
                <v-hover v-slot="{ hover }">
                  <v-card
                      class="product-card"
                      :class="{ 'on-hover': hover }"
                      :elevation="hover ? 12 : 2"
                  >
                    <v-img
                        :src="product.imageUrl"
                        height="220"
                        class="white--text align-end"
                        gradient="to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%"
                    >
                      <v-card-title class="product-title">{{ product.name }}</v-card-title>
                    </v-img>

                    <v-divider></v-divider>

                    <v-card-text class="pt-4">
                      <div class="product-description">{{ product.description }}</div>
                      <v-row class="mt-4" align="center">
                        <v-col cols="auto">
                          <v-chip color="primary" label small>{{ getCategoryName(product.type) }}</v-chip>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="auto">
                          <div class="text-h5 font-weight-bold primary--text">
                            €{{ product.price }}
                          </div>
                        </v-col>
                      </v-row>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions class="pa-4">
                      <v-btn
                          block
                          color="primary"
                          elevation="2"
                          @click="addToCart(product)"
                          class="text-capitalize"
                      >
                        <v-icon left>mdi-cart-plus</v-icon>
                        In den Warenkorb
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-snackbar
        v-model="snackbar.visible"
        :timeout="snackbar.timeout"
        :color="snackbar.color"
        elevation="2"
    >
      {{ snackbar.message }}
      <template #action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar.visible = false">OK</v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
const LAPTOP = 1;
const DESKTOP_PC = 2;
const REPLACEMENT_PART = 3;
import axios from 'axios';



export default {
  data() {
    return {
      drawer: true,
      searchQuery: '',
      activeCategory: 'all',
      categories: [
        {id: 'all', name: 'Alle Produkte', count: 0},
        {id: 'laptops', name: 'Laptops', count: 0},
        {id: 'desktops', name: 'Desktop PCs', count: 0},
        {id: 'parts', name: 'Einzelteile', count: 0}
      ],
      products: [],
      snackbar: {
        visible: false,
        message: '',
        color: 'success',
        timeout: 3000,
      },
    }
  },

  computed: {
    displayedProducts() {
      let result = [...this.products];

      if (this.activeCategory !== 'all') {
        result = result.filter(product =>
            this.getProductCategory(product.type) === this.activeCategory
        );
      }

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
      }

      return result;
    }
  },

  methods: {
    showSnackbar(message, color) {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.visible = true;
    },

    getCategoryIcon(categoryId) {
      return {
        all: 'mdi-view-grid',
        laptops: 'mdi-laptop',
        desktops: 'mdi-desktop-tower',
        parts: 'mdi-memory'
      }[categoryId] || 'mdi-view-grid';
    },

    getProductCategory(type) {
      return {
        [LAPTOP]: 'laptops',
        [DESKTOP_PC]: 'desktops',
        [REPLACEMENT_PART]: 'parts'
      }[type] || 'all';
    },

    getCategoryName(type) {
      return {
        [LAPTOP]: 'Laptop',
        [DESKTOP_PC]: 'Desktop PC',
        [REPLACEMENT_PART]: 'Komponente'
      }[type] || 'Produkt';
    },

    getProductImage(product) {
      console.log(product.imageUrl);
      return product.imageUrl;
    },

    async fetchProducts() {
      try {
        const response = await axios.get('/api/articles');
        this.products = response.data;
        this.updateCategoryCounts();
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },

    updateCategoryCounts() {
      const counts = {
        laptops: this.products.filter(p => p.type === LAPTOP).length,
        desktops: this.products.filter(p => p.type === DESKTOP_PC).length,
        parts: this.products.filter(p => p.type === REPLACEMENT_PART).length
      };

      this.categories = this.categories.map(category => ({
        ...category,
        count: category.id === 'all' ? this.products.length : counts[category.id] || 0
      }));
    },

    async addToCart(product) {
      try {
        await axios.post('/api/cart/add', {product: product, quantity: 1});
        this.showSnackbar('Produkt wurde zum Warenkorb hinzugefügt', 'success');
      } catch (error) {
        this.showSnackbar('Fehler beim Hinzufügen zum Warenkorb', 'error');
      }
    }
  },

  mounted() {
    this.fetchProducts();
  }
}
</script>

<style scoped>
.sidebar {
  background: linear-gradient(180deg, #1E2127 0%, #2A2E35 100%) !important;
}

.category-item {
  transition: all 0.3s ease;
  cursor: pointer;
}

.category-item:hover,
.category-active {
  background-color: rgba(99, 106, 232, 0.1) !important;
}

.main-content {
  background-color: #0A0E1A;
}

.search-card {
  background-color: #2A2E35 !important;
  border-radius: 12px;
}

.search-field {
  background-color: transparent;
}

.product-card {
  background-color: #2A2E35 !important;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.product-card.on-hover {
  transform: translateY(-8px);
}

.product-title {
  font-size: 1.25rem !important;
  font-weight: 600;
}

.product-description {
  color: #B0BEC5;
  font-size: 0.9rem;
  min-height: 60px;
}

.v-chip {
  font-weight: 500;
}


 .banner-card {
   background-color: #2A2E35 !important;
   border-radius: 12px;
   overflow: hidden;
 }

.banner-card .v-image {
  transform: scale(1);
  transition: transform 0.3s ease;
}

.banner-card:hover .v-image {
  transform: scale(1.05);
}
</style>
