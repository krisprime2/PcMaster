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
          <!-- Kategorie-Filter -->
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

          <!-- Neuer Artikel-Button -->
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
            <v-btn @click="editArticle(item)" class="mr-2 edit-btn">
              Bearbeiten
            </v-btn>
            <v-btn @click="deleteArticle(item.id)" color="error">
              Löschen
            </v-btn>
          </template>
          <template v-slot:[`item.type`]="{ item }">
            {{ item.type === 1 ? 'Laptop' : item.type === 2 ? 'Desktop-PC' : 'Ersatzteil' }}
          </template>
        </v-data-table>

        <v-dialog v-model="editDialog" max-width="800px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Artikel bearbeiten</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="selectedArticle.name" label="Name" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="selectedArticle.price" label="Preis" type="number" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                        v-model="selectedArticle.type"
                        :items="categoryOptions"
                        label="Kategorie"
                        required
                        item-value="value"
                        item-title="text"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea v-model="selectedArticle.description" label="Beschreibung" required></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="editDialog = false">Abbrechen</v-btn>
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
     const response = await axios.get('http://localhost:1337/article')
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
   };
   editDialog.value = true;
 }

 const editArticle = (item) => {
   selectedArticle.value = { ...item }
   editDialog.value = true
 }

 const saveArticle = async () => {
   try {
     if (selectedArticle.value.id) {
       // Artikel aktualisieren
       await axios.patch(`http://localhost:1337/api/articles/${selectedArticle.value.id}`, selectedArticle.value);
     } else {
       // Neuen Artikel erstellen
       await axios.post('http://localhost:1337/api/articles', selectedArticle.value);
     }
     await fetchArticles(); // Artikel-Liste neu laden
     editDialog.value = false; // Dialog schließen
   } catch (error) {
     console.error('Error saving article:', error);
   }
 };


 const deleteArticle = async (id) => {
   if (!confirm('Are you sure you want to delete this article?')) return

   try {
     await axios.delete(`http://localhost:1337/article/${id}`)
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

