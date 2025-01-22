<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
              v-model="search"
              label="Suchen"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-select
              v-model="statusFilter"
              :items="statusOptions"
              label="Filter nach Status"
              variant="outlined"
              clearable
              dense
              item-value="value"
              item-title="text"
          ></v-select>
        </v-col>
      </v-row>

      <v-data-table
          :items="filteredOrders"
          :headers="headers"
          :mobile="smAndDown"
          item-value="id"
          fixed-header
          class="elevation-1"
      >
        <template v-slot:[`item.date`]="{ item }">
          {{ formatDate(item.createdAt) }}
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-chip
              :color="getStatusColor(item.status)"
              text-color="white"
              size="small"
          >
            {{ getStatusText(item.status) }}
          </v-chip>
        </template>
        <template v-slot:[`item.totalPrice`]="{ item }">
          {{ formatPrice(item.price) }} €
        </template>
        <template v-slot:[`item.userEmail`]="{ item }">
          {{ item.user?.email || 'Kein Email' }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex flex-wrap gap-2 justify-start">
            <v-btn
                @click="showOrderDetails(item)"
                color="primary"
                variant="outlined"
                size="small"
                class="action-btn"
            >
              <v-icon size="small" class="mr-1">mdi-eye</v-icon>
              Details
            </v-btn>
            <v-btn
                @click="editOrder(item)"
                color="warning"
                variant="outlined"
                size="small"
                class="action-btn"
            >
              <v-icon size="small" class="mr-1">mdi-pencil</v-icon>
              Bearbeiten
            </v-btn>
            <v-btn
                @click="deleteOrder(item.id)"
                color="error"
                variant="outlined"
                size="small"
                class="action-btn"
            >
              <v-icon size="small" class="mr-1">mdi-delete</v-icon>
              Löschen
            </v-btn>
          </div>
        </template>
      </v-data-table>

      <v-dialog v-model="editDialog" max-width="800px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Bestellung bearbeiten</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="selectedOrder.firstName" label="Vorname"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="selectedOrder.lastName" label="Nachname"></v-text-field>
                </v-col>
                <v-col cols="12" sm="8">
                  <v-text-field v-model="selectedOrder.street" label="Straße"></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field v-model="selectedOrder.streetNumber" label="Hausnummer" type="number"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="selectedOrder.city" label="Stadt"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="selectedOrder.postalNumber" label="PLZ" type="number"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="selectedOrder.country" label="Land"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="selectedOrder.price" label="Preis" type="number" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                      v-model="selectedOrder.status"
                      :items="statusOptions.filter(option => option.value !== null)"
                      label="Status"
                      required
                      item-value="value"
                      item-title="text"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="editDialog = false">Abbrechen</v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="saveOrder">Speichern</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="detailsDialog" max-width="800px">
        <v-card>
          <v-card-title class="text-h5 bg-primary text-white">
            Bestellungsdetails
            <v-spacer></v-spacer>
            <v-chip
                :color="getStatusColor(selectedOrder?.status)"
                text-color="white"
                v-if="selectedOrder"
            >
              {{ getStatusText(selectedOrder.status) }}
            </v-chip>
          </v-card-title>
          <v-card-text class="mt-4">
            <v-container v-if="selectedOrder">
              <v-row>
                <v-col cols="12" md="6">
                  <v-card variant="outlined" class="mb-4">
                    <v-card-title>Kundeninformationen</v-card-title>
                    <v-card-text>
                      <p><strong>Email:</strong> {{ selectedOrder.user?.email }}</p>
                      <p><strong>Name:</strong> {{ selectedOrder.firstName }} {{ selectedOrder.lastName }}</p>
                      <p><strong>Adresse:</strong> {{ selectedOrder.street }} {{ selectedOrder.streetNumber }}</p>
                      <p><strong>Ort:</strong> {{ selectedOrder.postalNumber }} {{ selectedOrder.city }}</p>
                      <p><strong>Land:</strong> {{ selectedOrder.country }}</p>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card variant="outlined">
                    <v-card-title>Bestelldetails</v-card-title>
                    <v-card-text>
                      <p><strong>Bestellnummer:</strong> #{{ selectedOrder.id }}</p>
                      <p><strong>Datum:</strong> {{ formatDate(selectedOrder.createdAt) }}</p>
                      <p><strong>Gesamtpreis:</strong> {{ formatPrice(selectedOrder.price) }} €</p>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12">
                  <v-card variant="outlined">
                    <v-card-title>Artikel</v-card-title>
                    <v-card-text>
                      <v-table>
                        <thead>
                        <tr>
                          <th>Artikel</th>
                          <th>Preis</th>
                          <th>Beschreibung</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="article in selectedOrder.articles" :key="article.id">
                          <td>{{ article.name }}</td>
                          <td>{{ formatPrice(article.price) }} €</td>
                          <td>{{ article.description }}</td>
                        </tr>
                        </tbody>
                      </v-table>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="text" @click="detailsDialog = false">Schließen</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useDisplay } from 'vuetify'

const INPROCESSING = 1
const SENT = 2
const CANCELLED = 3

const statusOptions = [
  { text: 'Alle', value: null },
  { text: 'In Bearbeitung', value: INPROCESSING },
  { text: 'Versendet', value: SENT },
  { text: 'Storniert', value: CANCELLED }
]

const getStatusText = (status) => {
  switch (status) {
    case INPROCESSING:
      return 'In Bearbeitung'
    case SENT:
      return 'Versendet'
    case CANCELLED:
      return 'Storniert'
    default:
      return 'Unbekannt'
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case INPROCESSING:
      return 'orange'
    case SENT:
      return 'success'
    case CANCELLED:
      return 'error'
    default:
      return 'grey'
  }
}

const editDialog = ref(false)
const detailsDialog = ref(false)
const selectedOrder = ref(null)
const orders = ref([])
const search = ref('')
const statusFilter = ref(null)

const headers = [
  { title: 'ID', key: 'id', sortable: true, width: '10%' },
  { title: 'Datum', key: 'date', sortable: true, width: '15%' },
  { title: 'Status', key: 'status', sortable: true, width: '15%' },
  { title: 'Gesamtpreis', key: 'totalPrice', sortable: true, width: '15%' },
  { title: 'Kunde', key: 'userEmail', sortable: true, width: '20%' },
  { title: 'Aktionen', key: 'actions', sortable: false, width: '25%' }
]

const { smAndDown } = useDisplay()

const formatPrice = (price) => {
  return Number(price).toFixed(2)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const fetchOrders = async () => {
  try {
    const response = await axios.get('/order')
    orders.value = response.data
  } catch (error) {
    console.error('Error loading orders:', error)
  }
}

const showOrderDetails = (item) => {
  selectedOrder.value = { ...item }
  detailsDialog.value = true
}

const editOrder = (item) => {
  selectedOrder.value = { ...item }
  editDialog.value = true
}

const saveOrder = async () => {
  try {
    const { user, articles, ...orderData } = selectedOrder.value
    await axios.patch(`/order/${orderData.id}`, orderData)
    await fetchOrders()
    editDialog.value = false
  } catch (error) {
    console.error('Error saving order:', error)
  }
}

const deleteOrder = async (id) => {
  if (!confirm('Sind Sie sicher, dass Sie diese Bestellung löschen möchten?')) return

  try {
    await axios.delete(`/order/${id}`)
    await fetchOrders()
  } catch (error) {
    console.error('Error deleting order:', error)
  }
}

const filteredOrders = computed(() => {
  let result = orders.value

  if (statusFilter.value !== null) {
    result = result.filter(order => order.status === statusFilter.value)
  }

  if (search.value) {
    const searchText = search.value.toLowerCase()
    result = result.filter(order =>
        Object.values(order)
            .join(' ')
            .toLowerCase()
            .includes(searchText)
    )
  }

  return result
})

onMounted(() => {
  fetchOrders()
})
</script>

<style scoped>
.action-btn {
  min-width: 100px;
}

@media (max-width: 600px) {
  .gap-2 {
    gap: 0.75rem !important;
  }

  .action-btn {
    flex: 1 1 auto;
    min-width: calc(33% - 0.5rem);
  }
}

@media (max-width: 400px) {
  .action-btn {
    min-width: 100%;
  }
}
</style>
