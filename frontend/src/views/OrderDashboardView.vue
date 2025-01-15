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
        <!-- Status-Filter -->
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
      >
        <template v-slot:[`item.status`]="{ item }">
          {{ getStatusText(item.status) }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn @click="editOrder(item)" class="mr-2 edit-btn">
            Bearbeiten
          </v-btn>
          <v-btn @click="deleteOrder(item.id)" color="error">
            Löschen
          </v-btn>
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
                      :items="statusOptions"
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
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useDisplay } from 'vuetify'

// Import order status constants
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

const editDialog = ref(false)
const selectedOrder = ref(null)
const orders = ref([])
const search = ref('')
const statusFilter = ref(null)

const headers = [
  { title: 'ID', key: 'id', sortable: true },
  { title: 'Status', key: 'status' },
  { title: 'Preis', key: 'price' },
  { title: 'Vorname', key: 'firstName' },
  { title: 'Nachname', key: 'lastName' },
  { title: 'Stadt', key: 'city' },
  { title: 'Aktionen', key: 'actions', sortable: false }
]

const { smAndDown } = useDisplay()

const fetchOrders = async () => {
  try {
    const response = await axios.get('/order')
    orders.value = response.data
  } catch (error) {
    console.error('Error loading orders:', error)
  }
}

const editOrder = (item) => {
  selectedOrder.value = { ...item }
  editDialog.value = true
}

const saveOrder = async () => {
  try {
    // Create a copy without user and articles
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
