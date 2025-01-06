<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" :temporary="!isLargeScreen">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">Categories</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item v-for="category in categories" :key="category.id" link @click="selectCategory(category)">
          <v-list-item-content>
            <v-list-item-title>{{ category.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <v-responsive class="mb-4">
          <v-img
              :src="bannerImageUrl"
              aspect-ratio="16/9"
              class="banner-image"
          ></v-img>
        </v-responsive>

        <v-row>
          <v-col
              v-for="product in filteredProducts"
              :key="product.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
          >
            <v-card class="product-card h-100">
              <v-img :src="product.imageUrl" height="200" class="product-image"></v-img>
              <v-card-title class="product-title">{{ product.title }}</v-card-title>
              <v-card-text class="product-description">{{ product.description }}</v-card-text>
              <v-card-text class="product-price">{{ product.price }} €</v-card-text>
              <v-card-actions class="justify-center">
                <v-btn class="btn-primary" @click="addToCart(product)">
                  Add to Cart
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      bannerImageUrl: 'https://via.placeholder.com/1920x200',
      categories: [
        { id: 4, name: 'Alle' },
        { id: 1, name: 'Laptops' },
        { id: 2, name: 'Desktop Pcs' },
        { id: 3, name: 'Einzelteile' },
      ],

      selectedCategory: null,
      isLargeScreen: window.innerWidth >= 1024,
      products: [
        {
          id: 1,
          categoryId: 1,
          imageUrl: 'https://via.placeholder.com/150',
          title: 'Laptop 1',
          description: 'This is the description for Laptop 1.',
          price: 1200
        },
        {
          id: 2,
          categoryId: 2,
          imageUrl: 'https://via.placeholder.com/150',
          title: 'PC 1',
          description: 'This is the description for PC 1.',
          price: 800
        },
        {
          id: 3,
          categoryId: 1,
          imageUrl: 'https://via.placeholder.com/150',
          title: 'Laptop 2',
          description: 'High-performance laptop with a sleek design.',
          price: 1500
        },
        {
          id: 4,
          categoryId: 2,
          imageUrl: 'https://via.placeholder.com/150',
          title: 'Gaming PC',
          description: 'Powerful gaming PC with RGB lighting.',
          price: 2000
        },
        {
          id: 5,
          categoryId: 3,
          imageUrl: 'https://via.placeholder.com/150',
          title: 'Graphics Card',
          description: 'NVIDIA RTX 3060 graphics card for smooth gaming.',
          price: 500
        },
        {
          id: 6,
          categoryId: 3,
          imageUrl: 'https://via.placeholder.com/150',
          title: 'Processor',
          description: 'Intel Core i7 12th Gen Processor for ultimate performance.',
          price: 300
        },
        {
          id: 7,
          categoryId: 1,
          imageUrl: 'https://via.placeholder.com/150',
          title: 'Laptop 3',
          description: 'Lightweight laptop with long battery life.',
          price: 1000
        },
        {
          id: 8,
          categoryId: 2,
          imageUrl: 'https://via.placeholder.com/150',
          title: 'Workstation PC',
          description: 'Professional workstation for demanding applications.',
          price: 2500
        },
        {
          id: 9,
          categoryId: 3,
          imageUrl: 'https://via.placeholder.com/150',
          title: 'RAM',
          description: '16GB DDR4 RAM for faster multitasking.',
          price: 120
        },
        {
          id: 10,
          categoryId: 3,
          imageUrl: 'https://via.placeholder.com/150',
          title: 'Power Supply',
          description: '650W power supply unit for reliable performance.',
          price: 80
        },
        {
          id: 11,
          categoryId: 1,
          imageUrl: 'https://via.placeholder.com/150',
          title: 'Laptop 4',
          description: 'Convertible 2-in-1 laptop for flexibility and productivity.',
          price: 1300
        },
        {
          id: 12,
          categoryId: 3,
          imageUrl: 'https://via.placeholder.com/150',
          title: 'SSD',
          description: '1TB SSD for lightning-fast storage.',
          price: 150
        },
        {
          id: 13,
          categoryId: 3,
          imageUrl: 'https://via.placeholder.com/150',
          title: 'Motherboard',
          description: 'Gaming motherboard compatible with latest processors.',
          price: 250
        },
        {
          id: 14,
          categoryId: 2,
          imageUrl: 'https://via.placeholder.com/150',
          title: 'Mini PC',
          description: 'Compact Mini PC for home and office use.',
          price: 600
        },
        {
          id: 15,
          categoryId: 1,
          imageUrl: 'https://via.placeholder.com/150',
          title: 'Laptop 5',
          description: 'Affordable laptop for students and casual use.',
          price: 700
        }
      ]
    };
  },

  computed: {
    filteredProducts() {
      if (!this.selectedCategory || this.selectedCategory.id == 4) {
        return this.products;
      }
      return this.products.filter(product => product.categoryId === this.selectedCategory.id);
    }
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
    },
    addToCart(product) {
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

body {
  font-family: 'Inter', sans-serif;
  background-color: #0A0E1A;
  color: #ffffff;
}

.banner-image {
  border-radius: 8px;
}

.product-card {
  background-color: #2A2E35;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
}

.product-title {
  font-weight: 600;
  color: #fff;
}

.product-description {
  font-weight: 400;
  color: #ccc;
}

.product-price {
  font-weight: bold;
  color: #ffffff;
}

.btn-primary {
  background-color: #F44336;
  color: white;
}

.btn-primary:hover {
  background-color: #a51307;
}
</style>
