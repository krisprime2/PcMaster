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
        <v-col cols="12" sm="6" md="4">
          <v-select
              v-model="typeFilter"
              :items="[{ text: 'Alle', value: null }, ...typeOptions]"
              label="Filter nach Typ"
              variant="outlined"
              clearable
              dense
              item-value="value"
              item-title="text"
          ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="8" class="text-end">
          <v-btn
              style="background-color: #F44336; color: white;"
              variant="outlined"
              @click="createNewComponent"
          >
            Neue Komponente erstellen
          </v-btn>
        </v-col>
      </v-row>

      <v-data-table
          :items="filteredComponents"
          :headers="headers"
          :mobile="smAndDown"
          item-value="id"
      >
        <template v-slot:[`item.type`]="{ item }">
          {{ getComponentTypeName(item.type) }}
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex flex-wrap gap-2 justify-start">
            <v-btn
                @click="editComponent(item)"
                color="warning"
                variant="outlined"
                size="small"
                class="action-btn"
            >
              <v-icon size="small" class="mr-1">mdi-pencil</v-icon>
              Bearbeiten
            </v-btn>
            <v-btn
                @click="deleteComponent(item.id)"
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
            <span class="text-h5">Komponente bearbeiten</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="selectedComponent.name" label="Name" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="selectedComponent.price" label="Preis" type="number" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                      v-model="selectedComponent.type"
                      :items="typeOptions"
                      label="Typ"
                      required
                      item-value="value"
                      item-title="text"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="selectedComponent.description" label="Beschreibung" required></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="selectedComponent.imageUrl" label="Bild URL"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="editDialog = false">Abbrechen</v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="saveComponent">Speichern</v-btn>
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

const editDialog = ref(false)
const selectedComponent = ref(null)
const components = ref([])
const search = ref('')

const COMPONENT_TYPES = {
  CPU: '1',
  MOTHERBOARD: '2',
  RAM: '3',
  GPU: '4',
  STORAGE: '5',
  CASE: '6',
  PSU: '7'
}

const typeOptions = [
  { text: 'Prozessor', value: COMPONENT_TYPES.CPU },
  { text: 'Mainboard', value: COMPONENT_TYPES.MOTHERBOARD },
  { text: 'RAM', value: COMPONENT_TYPES.RAM },
  { text: 'Grafikkarte', value: COMPONENT_TYPES.GPU },
  { text: 'Speicher', value: COMPONENT_TYPES.STORAGE },
  { text: 'Gehäuse', value: COMPONENT_TYPES.CASE },
  { text: 'Netzteil', value: COMPONENT_TYPES.PSU }
]

const getComponentTypeName = (type) => {
  const option = typeOptions.find(opt => opt.value === type)
  return option ? option.text : type
}

const headers = [
  { title: 'ID', key: 'id', sortable: true },
  { title: 'Name', key: 'name' },
  { title: 'Preis', key: 'price' },
  { title: 'Typ', key: 'type' },
  { title: 'Aktionen', key: 'actions', sortable: false }
]

const { smAndDown } = useDisplay()

const fetchComponents = async () => {
  try {
    const response = await axios.get('/api/components')
    components.value = response.data
  } catch (error) {
    console.error('Error loading components:', error)
  }
}

const createNewComponent = () => {
  selectedComponent.value = {
    name: '',
    price: null,
    type: '',
    description: '',
    imageUrl: ''
  }
  editDialog.value = true
}

const editComponent = (item) => {
  selectedComponent.value = {
    id: item.id,
    name: item.name,
    price: Number(item.price),
    type: item.type,
    description: item.description || '',
    imageUrl: item.imageUrl || ''
  }
  editDialog.value = true
}

const saveComponent = async () => {
  try {
    const componentToSave = {
      ...selectedComponent.value,
      price: Number(selectedComponent.value.price)
    }

    if (selectedComponent.value.id) {
      await axios.patch(`/api/components/${selectedComponent.value.id}`, componentToSave)
    } else {
      await axios.post('/api/components', componentToSave)
    }
    await fetchComponents()
    editDialog.value = false
  } catch (error) {
    console.error('Error saving component:', error.response?.data || error)
    console.error('Status:', error.response?.status)
    console.error('Headers:', error.response?.headers)
  }
}

const deleteComponent = async (id) => {
  if (!confirm('Sind Sie sicher, dass Sie diese Komponente löschen möchten?')) return

  try {
    await axios.delete(`/api/components/${id}`)
    await fetchComponents()
  } catch (error) {
    console.error('Error deleting component:', error)
  }
}

const typeFilter = ref(null)

const filteredComponents = computed(() => {
  let result = components.value

  if (typeFilter.value !== null) {
    result = result.filter(component => component.type === typeFilter.value)
  }

  if (search.value) {
    const searchText = search.value.toLowerCase()
    result = result.filter(component =>
        Object.values(component)
            .join(' ')
            .toLowerCase()
            .includes(searchText)
    )
  }

  return result
})

onMounted(() => {
  fetchComponents()
})
</script>
