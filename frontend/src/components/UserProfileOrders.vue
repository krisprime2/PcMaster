<template>
  <div class="orders-component">
    <v-card-text>
      <div class="orders-section">
        <div class="section-header">
          <v-icon color="primary" class="mr-2">mdi-shopping</v-icon>
          <span class="text-h6 white--text">Meine Bestellungen</span>
        </div>

        <v-data-table
            :headers="headers"
            :items="orders"
            :loading="loading"
            dark
            class="elevation-1 mt-4"
            :items-per-page="5"
            :footer-props="{
            'items-per-page-options': [5, 10, 15],
            'items-per-page-text': 'Einträge pro Seite'
          }"
        >
          <template v-slot:item.createdAt="{ item }">
            {{ formatDate(item.createdAt) }}
          </template>

          <template v-slot:item.status="{ item }">
            <v-chip
                :color="getStatusColor(item.status)"
                small
            >
              {{ getStatusText(item.status) }}
            </v-chip>
          </template>

          <template v-slot:item.price="{ item }">
            {{ formatPrice(item.price) }} €
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn
                small
                text
                color="primary"
                @click="viewOrderDetails(item)"
            >
              <v-icon small class="mr-1">mdi-eye</v-icon>
              Details
            </v-btn>
          </template>

          <template v-slot:no-data>
            Keine Bestellungen vorhanden
          </template>

          <template v-slot:loading>
            Bestellungen werden geladen...
          </template>
        </v-data-table>
      </div>
    </v-card-text>

    <v-dialog v-model="orderDialog" max-width="700px">
      <v-card dark>
        <v-card-title class="headline">
          Bestelldetails #{{ selectedOrder?.id }}
          <v-spacer></v-spacer>
          <v-chip
              v-if="selectedOrder"
              :color="getStatusColor(selectedOrder.status)"
              small
              class="ml-2"
          >
            {{ getStatusText(selectedOrder.status) }}
          </v-chip>
        </v-card-title>

        <v-card-text v-if="selectedOrder">
          <v-row>
            <v-col cols="6">
              <div class="caption grey--text">Bestelldatum</div>
              <div>{{ formatDate(selectedOrder.createdAt) }}</div>
            </v-col>
            <v-col cols="6">
              <div class="caption grey--text">Gesamtpreis</div>
              <div>{{ formatPrice(selectedOrder.price) }} €</div>
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>
          <template v-if="selectedOrder.configuration">
            <div class="subtitle-1 mb-2">Konfiguration</div>
            <v-card outlined class="pa-3 mb-4">
              <div class="configuration-details">
                <div>Persönliche Konfiguration: #{{ selectedOrder.configuration }}</div>
              </div>
            </v-card>
            <v-divider class="my-4"></v-divider>
          </template>

          <div class="subtitle-1 mb-2">Artikel</div>
          <v-list dark dense>
            <v-list-item v-for="article in selectedOrder.articles" :key="article.id">
              <v-list-item-content>
                <v-list-item-title class="subtitle-2">{{ article.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ formatPrice(article.price) }} €</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider class="my-4"></v-divider>

          <div class="subtitle-1 mb-2">Lieferadresse</div>
          <v-card outlined class="pa-3">
            <div class="address-details">
              <div>{{ selectedOrder.firstName }} {{ selectedOrder.lastName }}</div>
              <div>{{ selectedOrder.street }} {{ selectedOrder.streetNumber }}</div>
              <div>{{ selectedOrder.postalNumber }} {{ selectedOrder.city }}</div>
              <div>{{ selectedOrder.country }}</div>
            </div>
          </v-card>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="orderDialog = false">
            Schließen
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '@/store/auth';
const INPROCESSING = 1
const SENT = 2
const CANCELLED = 3
export default {
  name: 'UserOrdersComponent',

  data() {
    return {
      loading: false,
      orders: [],
      orderDialog: false,
      selectedOrder: null,
      headers: [
        {
          text: 'Bestell-Nr.',
          align: 'start',
          value: 'id'
        },
        {
          text: 'Datum',
          value: 'createdAt'
        },
        {
          text: 'Status',
          value: 'status'
        },
        {
          text: 'Preis',
          value: 'price'
        },
        {
          text: 'Aktionen',
          value: 'actions',
          sortable: false,
          align: 'center'
        }
      ]
    };
  },

  methods: {
    async loadOrders() {
      try {
        this.loading = true;
        const authStore = useAuthStore();
        const response = await axios.get(`/api/user-orders/${authStore.user.id}`);
        console.log(response.data)
        this.orders = response.data;
      } catch (error) {
        this.$emit('error', 'Fehler beim Laden der Bestellungen');
        console.error('Error loading orders:', error);
      } finally {
        this.loading = false;
      }
    },

    formatDate(date) {
      if (!date) return '-';
      return new Date(date).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },

    formatPrice(price) {
      if (typeof price !== 'number') return '0.00';
      return price.toFixed(2);
    },

    getStatusColor(status) {
      const statusColors = {
        [INPROCESSING]: 'warning',
        [SENT]: 'success',
        [CANCELLED]: 'error'
      };
      return statusColors[status] || 'grey';
    },

    getStatusText(status) {
      const statusTexts = {
        [INPROCESSING]: 'In Bearbeitung',
        [SENT]: 'Versendet',
        [CANCELLED]: 'Storniert'
      };
      return statusTexts[status] || 'Unbekannt';
    },

    async viewOrderDetails(order) {
      try {
        // Fetch full order details including articles
        const response = await axios.get(`/api/orders/${order.id}`);
        console.log(response)
        this.selectedOrder = response.data;
        this.orderDialog = true;
      } catch (error) {
        this.$emit('error', 'Fehler beim Laden der Bestelldetails');
        console.error('Error loading order details:', error);
      }
    }
  },

  mounted() {
    this.loadOrders();
  }
};
</script>

<style scoped>
.orders-section {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(99, 106, 232, 0.3);
}

.address-details {
  line-height: 1.6;
}

.address-details > div {
  color: rgba(255, 255, 255, 0.87);
}

::v-deep .v-data-table {
  background-color: transparent !important;
}

::v-deep .v-data-table th {
  color: rgba(255, 255, 255, 0.87) !important;
  font-weight: 600;
}

::v-deep .v-data-table td {
  color: rgba(255, 255, 255, 0.87) !important;
}

::v-deep .v-data-table tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.05) !important;
}

::v-deep .theme--dark.v-data-table {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}
</style>
