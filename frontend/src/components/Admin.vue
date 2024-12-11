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

      <!-- Filter: Status und Rolle -->
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-select
              v-model="statusFilter"
              :items="[{ text: 'Alle', value: null }, ...statusOptions]"
              label="Filter by Status"
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
              label="Filter by Role"
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
          <v-btn @click="editUser(item)" class="mr-2 edit-btn">
            Bearbeiten
          </v-btn>
          <v-btn @click="deleteUser(item.id)" color="error">
            Löschen
          </v-btn>
        </template>
      </v-data-table>

      <v-dialog v-model="editDialog" max-width="800px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Edit User</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="selectedUser.name" label="Username" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="selectedUser.email" label="Email" required></v-text-field>
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
                      label="Role"
                      required
                      item-value="value"
                      item-title="text"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="selectedUser.firstName" label="First Name" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="selectedUser.lastName" label="Last Name" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="selectedUser.street" label="Street" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="selectedUser.streetNumber" label="Street Number" type="number" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="selectedUser.city" label="City" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="selectedUser.postalNumber" label="Postal Number" type="number" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="selectedUser.country" label="Country" required></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="editDialog = false">Cancel</v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="saveUser">Save</v-btn>
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
  { title: 'ID', key: 'id', sortable: true },
  { title: 'Username', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Status', key: 'status' },
  { title: 'Role', key: 'role' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const { smAndDown } = useDisplay()

const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:1337/user')
    users.value = response.data
  } catch (error) {
    console.error('Error loading users:', error)
  }
}

const editUser = (item) => {
  selectedUser.value = {...item}
  editDialog.value = true
}

const saveUser = async () => {
  try {
    const response = await axios.put(
        `http://localhost:1337/user/${selectedUser.value.id}`,
        selectedUser.value
    )

    await fetchUsers() // Benutzerliste aktualisieren

    editDialog.value = false
  } catch (error) {
    console.error('Error saving user:', error)
  }
}

const deleteUser = async (id) => {
  if (!confirm('Are you sure you want to delete this user?')) return

  try {
    await axios.delete(`http://localhost:1337/user/${id}`)
    await fetchUsers()
  } catch (error) {
    console.error('Error deleting user:', error)
  }
}

const statusFilter = ref(null)
const roleFilter = ref(null)

const filteredUsers = computed(() => {
  let result = users.value

  // Status-Filter anwenden, wenn ein Wert ausgewählt wurde
  if (statusFilter.value !== null) {
    result = result.filter(user => user.status === statusFilter.value)
  }

  // Rollen-Filter anwenden, wenn ein Wert ausgewählt wurde
  if (roleFilter.value !== null) {
    result = result.filter(user => user.role === roleFilter.value)
  }

  // Suchfeld-Filter anwenden
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
<style>body.v-application--is-lt-dark {
  background-color: #121212;
  color: #ffffff;
}
 .edit-btn {
   background-color: #e0e0e0; /* Grauer Hintergrund */
   color: #000000; /* Schwarzer Text (optional) */
 }

.edit-btn:hover {
  background-color: #c0c0c0; /* Etwas dunkler bei Hover */
}
</style>

