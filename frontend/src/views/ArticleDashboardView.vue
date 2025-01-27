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
              v-model="categoryFilter"
              :items="[{ text: 'Alle', value: null }, ...categoryOptions]"
              label="Filter nach Kategorie"
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
              @click="createNewArticle"
          >
            Neuen Artikel erstellen
          </v-btn>
        </v-col>
      </v-row>

      <v-data-table
          :items="filteredArticles"
          :headers="headers"
          :mobile="smAndDown"
          item-value="id"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex flex-wrap gap-2 justify-start">
            <v-btn
                @click="editArticle(item)"
                color="warning"
                variant="outlined"
                size="small"
                class="action-btn"
            >
              <v-icon size="small" class="mr-1">mdi-pencil</v-icon>
              Bearbeiten
            </v-btn>
            <v-btn
                @click="deleteArticle(item.id)"
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
        <template v-slot:[`item.type`]="{ item }">
          {{ item.type === 1 ? 'Laptop' : item.type === 2 ? 'Desktop-PC' : 'Ersatzteil' }}
        </template>
      </v-data-table>

      <v-dialog v-model="editDialog" max-width="800px">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ selectedArticle?.id ? 'Artikel bearbeiten' : 'Neuen Artikel erstellen' }}</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="selectedArticle.name"
                        label="Name"
                        :rules="[rules.required]"
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="selectedArticle.price"
                        label="Preis"
                        type="number"
                        :rules="[rules.price]"
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                        v-model="selectedArticle.type"
                        :items="categoryOptions"
                        label="Kategorie"
                        :rules="[rules.required]"
                        required
                        item-value="value"
                        item-title="text"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                        v-model="selectedArticle.description"
                        label="Beschreibung"
                        :rules="[rules.required]"
                        required
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="closeDialog">Abbrechen</v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="saveArticle">Speichern</v-btn>
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
const selectedArticle = ref(null)
const articles = ref([])
const search = ref('')
const form = ref(null)

const rules = {
  required: value => !!value || 'Dieses Feld ist erforderlich',
  price: value => {
    if (!value) return 'Preis ist erforderlich'
    if (value <= 0) return 'Preis muss größer als 0 sein'
    return true
  }
}

const categoryOptions = [
  { text: 'Laptop', value: 1 },
  { text: 'Desktop-PC', value: 2 },
  { text: 'Ersatzteil', value: 3 }
]

const headers = [
  { title: 'ID', key: 'id', sortable: true },
  { title: 'Name', key: 'name' },
  { title: 'Preis', key: 'price' },
  { title: 'Kategorie', key: 'type' },
  { title: 'Aktionen', key: 'actions', sortable: false }
]

const { smAndDown } = useDisplay()

const fetchArticles = async () => {
  try {
    const response = await axios.get('/api/articles')
    articles.value = response.data
    console.log(response.data)
  } catch (error) {
    console.error('Error loading articles:', error)
  }
}

const createNewArticle = () => {
  selectedArticle.value = {
    name: '',
    price: null,
    type: null,
    description: '',
  }
  editDialog.value = true
}

const editArticle = (item) => {
  selectedArticle.value = {
    id: item.id,
    name: item.name,
    price: Number(item.price),
    type: Number(item.type),
    description: item.description || ''
  }
  console.log('Editing article:', selectedArticle.value)
  editDialog.value = true
}

const closeDialog = () => {
  editDialog.value = false
  if (form.value) {
    form.value.reset()
  }
}

const saveArticle = async () => {
  const { valid } = await form.value.validate()

  if (!valid) return

  try {
    const articleToSave = {
      ...selectedArticle.value,
      price: Number(selectedArticle.value.price),
      type: Number(selectedArticle.value.type),
    }

    if (selectedArticle.value.id) {
      await axios.patch(`/api/articles/${selectedArticle.value.id}`, articleToSave)
    } else {
      await axios.post('/api/articles', articleToSave)
    }
    await fetchArticles()
    editDialog.value = false
    form.value.reset()
  } catch (error) {
    console.error('Error saving article:', error.response?.data || error)
  }
}

const deleteArticle = async (id) => {
  if (!confirm('Sind Sie sicher, dass Sie diesen Artikel löschen möchten?')) return

  try {
    await axios.delete(`/api/articles/${id}`)
    await fetchArticles()
  } catch (error) {
    console.error('Error deleting article:', error)
  }
}

const categoryFilter = ref(null)

const filteredArticles = computed(() => {
  let result = articles.value

  if (categoryFilter.value !== null) {
    result = result.filter(article => article.type === categoryFilter.value)
  }

  if (search.value) {
    const searchText = search.value.toLowerCase()
    result = result.filter(article =>
        Object.values(article)
            .join(' ')
            .toLowerCase()
            .includes(searchText)
    )
  }

  return result
})

onMounted(() => {
  fetchArticles()
})
</script>
