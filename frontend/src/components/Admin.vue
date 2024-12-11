<template>
  <v-app>
    <v-container>
      <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
      ></v-text-field>
      <v-data-table
          :items="users"
          :headers="headers"
          :mobile="smAndDown"
          :search="search"
          item-value="id"
      >
        <template v-slot:[`item.status`]="{ item }">
          {{ item.status === ACTIVE ? 'Active' : 'Locked' }}
        </template>
        <template v-slot:[`item.role`]="{ item }">
          {{ item.role === USER ? 'User' : 'Admin' }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn icon @click="editUser(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon color="error" @click="deleteUser(item.id)">
            <v-icon>mdi-delete</v-icon>
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
                  <v-text-field v-model="selectedUser.password" label="Password" type="password" required></v-text-field>
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
  { text: 'Active', value: ACTIVE },
  { text: 'Locked', value: LOCKED }
]

const roleOptions = [
  { text: 'Admin', value: ADMIN },
  { text: 'User', value: USER }
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

const filteredUsers = computed(() => {
  if (!search.value) {
    return users.value
  }
  return users.value.filter((user) =>
      Object.values(user)
          .join(' ')
          .toLowerCase()
          .includes(search.value.toLowerCase())
  )
})

onMounted(() => {
  fetchUsers()
})
</script>
