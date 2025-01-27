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
              v-model="statusFilter"
              :items="[{ text: 'Alle', value: null }, ...statusOptions]"
              label="Nach Status filtern"
              variant="outlined"
              clearable
              dense
              item-value="value"
              item-title="text"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select
              v-model="roleFilter"
              :items="[{ text: 'Alle', value: null }, ...roleOptions]"
              label="Nach Rolle filtern"
              variant="outlined"
              clearable
              dense
              item-value="value"
              item-title="text"
          ></v-select>
        </v-col>
      </v-row>

      <v-data-table
          :items="filteredUsers"
          :headers="headers"
          :mobile="smAndDown"
          item-value="id"
      >
        <template v-slot:[`item.status`]="{ item }">
          {{ item.status === ACTIVE ? 'Aktiv' : 'Gesperrt' }}
        </template>
        <template v-slot:[`item.role`]="{ item }">
          {{ item.role === USER ? 'Benutzer' : 'Admin' }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex flex-wrap gap-2 justify-start">
            <v-btn
                @click="editUser(item)"
                color="warning"
                variant="outlined"
                size="small"
                class="action-btn"
            >
              <v-icon size="small" class="mr-1">mdi-pencil</v-icon>
              Bearbeiten
            </v-btn>
            <v-btn
                @click="deleteUser(item.id)"
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
            <span class="text-h5">Benutzer bearbeiten</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                      v-model="selectedUser.name"
                      label="Benutzername"
                      required
                      :error-messages="validationErrors.name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                      v-model="selectedUser.email"
                      label="Email"
                      required
                      :error-messages="validationErrors.email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                      v-model="selectedUser.status"
                      :items="statusOptions"
                      label="Status"
                      required
                      item-value="value"
                      item-title="text"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                      v-model="selectedUser.role"
                      :items="roleOptions"
                      label="Rolle"
                      required
                      item-value="value"
                      item-title="text"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="selectedUser.firstName" label="Vorname" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="selectedUser.lastName" label="Nachname" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="selectedUser.street" label="Strasse" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="selectedUser.streetNumber" label="Nummer" type="number" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="selectedUser.city" label="Stadt" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="selectedUser.postalNumber" label="Postleitzahl" type="number" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="selectedUser.country" label="Land" required></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="closeDialog">Abbrechen</v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="saveUser">Speichern</v-btn>
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
const selectedUser = ref(null)
const users = ref([])
const search = ref('')
const validationErrors = ref({
  email: '',
  name: ''
})

const ACTIVE = 1
const LOCKED = 2
const ADMIN = 1
const USER = 2

const statusOptions = [
  { text: 'Aktiv', value: ACTIVE },
  { text: 'Gesperrt', value: LOCKED }
]

const roleOptions = [
  { text: 'Admin', value: ADMIN },
  { text: 'Benutzer', value: USER }
]

const headers = [
  {title: 'ID', key: 'id', sortable: true},
  {title: 'Name', key: 'name'},
  {title: 'Email', key: 'email'},
  {title: 'Status', key: 'status'},
  {title: 'Rolle', key: 'role'},
  {title: 'Aktionen', key: 'actions', sortable: false}
]

const {smAndDown} = useDisplay()

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const fetchUsers = async () => {
  try {
    const response = await axios.get('/user')
    users.value = response.data
  } catch (error) {
    console.error('Fehler beim Laden der Benutzer:', error)
  }
}

const editUser = (item) => {
  selectedUser.value = {...item}
  validationErrors.value = {email: '', name: ''}
  editDialog.value = true
}

const closeDialog = () => {
  editDialog.value = false
  validationErrors.value = {email: '', name: ''}
}

const saveUser = async () => {
  // Reset validation errors
  validationErrors.value = {
    email: '',
    name: ''
  }

  // Validate
  let hasErrors = false

  if (!selectedUser.value.name?.trim()) {
    validationErrors.value.name = 'Benutzername darf nicht leer sein'
    hasErrors = true
  }

  if (!selectedUser.value.email?.trim()) {
    validationErrors.value.email = 'Email darf nicht leer sein'
    hasErrors = true
  } else if (!validateEmail(selectedUser.value.email)) {
    validationErrors.value.email = 'Bitte geben Sie eine gültige Email-Adresse ein'
    hasErrors = true
  }

  if (hasErrors) return

  try {
    const response = await axios.put(
        `/user/${selectedUser.value.id}`,
        selectedUser.value
    )
    await fetchUsers()
    editDialog.value = false
  } catch (error) {
    console.error('Fehler beim Speichern des Benutzers:', error)
  }
}

const deleteUser = async (id) => {
  if (!confirm('Sind Sie sicher, dass Sie diesen Benutzer löschen möchten?')) return

  try {
    await axios.delete(`/user/${id}`)
    await fetchUsers()
  } catch (error) {
    console.error('Fehler beim Löschen des Benutzers:', error)
  }
}

const statusFilter = ref(null)
const roleFilter = ref(null)

const filteredUsers = computed(() => {
  let result = users.value

  if (statusFilter.value !== null) {
    result = result.filter(user => user.status === statusFilter.value)
  }

  if (roleFilter.value !== null) {
    result = result.filter(user => user.role === roleFilter.value)
  }

  if (search.value) {
    const searchText = search.value.toLowerCase()
    result = result.filter(user =>
        Object.values(user)
            .join(' ')
            .toLowerCase()
            .includes(searchText)
    )
  }

  return result
})

onMounted(() => {
  fetchUsers()
})
</script>

<style>
body.v-application--is-lt-dark {
  background-color: #121212;
  color: #ffffff;
}

.edit-btn {
  background-color: #e0e0e0;
  color: #000000;
}

.edit-btn:hover {
  background-color: #c0c0c0;
}
</style>
