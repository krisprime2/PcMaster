<template>
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
      <v-col cols="12" sm="6" md="4">
        <v-select
            v-model="statusFilter"
            :items="[{ text: 'Alle', value: null }, ...statusOptions]"
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
        :items="filteredInquiries"
        :headers="headers"
        :mobile="smAndDown"
        item-value="id"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <div class="d-flex gap-2">
          <v-btn
              @click="editInquiry(item)"
              color="warning"
              variant="outlined"
              size="small"
          >
            <v-icon size="small" class="mr-1">mdi-pencil</v-icon>
            Bearbeiten
          </v-btn>
          <v-btn
              @click="deleteInquiry(item.id)"
              color="error"
              variant="outlined"
              size="small"
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
          <span class="text-h5">Anfrage bearbeiten</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field v-model="selectedInquiry.name" label="Name" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                    v-model="selectedInquiry.status"
                    :items="statusOptions"
                    label="Status"
                    required
                    item-value="value"
                    item-title="text"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="selectedInquiry.deviceType" label="Gerätetyp" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="selectedInquiry.modelNumber" label="Modellnummer" type="number"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="selectedInquiry.description" label="Beschreibung" required></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="editDialog = false">Abbrechen</v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="saveInquiry">Speichern</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue'
import axios from 'axios'
import {useDisplay} from 'vuetify'

const editDialog = ref(false)
const selectedInquiry = ref(null)
const inquiries = ref([])
const search = ref('')
const statusFilter = ref(null)

const statusOptions = [
  {text: 'In Bearbeitung', value: 1},
  {text: 'Abgeschlossen', value: 2},
  {text: 'Abgelehnt', value: 3}
]

const headers = [
  {title: 'ID', key: 'id'},
  {title: 'Name', key: 'name'},
  {title: 'Status', key: 'status'},
  {title: 'Gerätetyp', key: 'deviceType'},
  {title: 'Modellnummer', key: 'modelNumber'},
  {title: 'Aktionen', key: 'actions'}
]

const {smAndDown} = useDisplay()

const fetchInquiries = async () => {
  try {
    const response = await axios.get('/api/inquiries')
    inquiries.value = response.data
  } catch (error) {
    console.error('Error:', error)
  }
}

const editInquiry = (item) => {
  selectedInquiry.value = {...item}
  editDialog.value = true
}

const saveInquiry = async () => {
  try {
    console.log(`/api/inquiries/update/${selectedInquiry.value.id}`)
    const respone= await axios.put(`/api/inquiries/update/${selectedInquiry.value.id}`, selectedInquiry.value)
    console.log(respone)
    await fetchInquiries()
    editDialog.value = false
  } catch (error) {
    console.log('Error:', error)
  }
}

const deleteInquiry = async (id) => {
  if (!confirm('Möchten Sie diese Anfrage wirklich löschen?')) return
  try {
    await axios.delete(`/api/inquiry/delete/${id}`)
    await fetchInquiries()
  } catch (error) {
    console.error('Error:', error)
  }
}

const filteredInquiries = computed(() => {
  let result = inquiries.value

  if (statusFilter.value) {
    result = result.filter(inquiry => inquiry.status === statusFilter.value)
  }

  if (search.value) {
    const searchText = search.value.toLowerCase()
    result = result.filter(inquiry =>
        Object.values(inquiry).join(' ').toLowerCase().includes(searchText)
    )
  }

  return result
})

onMounted(() => {
  fetchInquiries()
})
</script>
<style scoped>
.mobile-table :deep(.v-data-table__wrapper tbody tr) {
  margin-bottom: 16px;
  display: block;
}
</style>
