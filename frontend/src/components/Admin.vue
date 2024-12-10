<template>
  <div>
    <!-- Desktop Ansicht -->
    <v-container v-if="!isMobile" class="admin-page">
      <h1>Kontoverwaltung</h1>

      <v-row class="mb-4">
        <v-col cols="12" sm="6">
          <v-text-field
              v-model="searchQuery"
              label="Nach Benutzer suchen"
              variant="outlined"
              density="compact"
              clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
              v-model="statusFilter"
              :items="statusOptionsSimple"
              label="Status filtern"
              variant="outlined"
              density="compact"
              clearable
          ></v-select>
        </v-col>
      </v-row>

      <v-data-table
          :items="filteredUsers"
          :headers="headers"
          class="elevation-1"
      >
        <template v-slot:item.statusDisplay="{ item }">
          <v-select
              v-model="item.statusDisplay"
              :items="statusOptionsSimple"
              variant="outlined"
              density="compact"
              @update:model-value="updateStatus(item.id, $event)"
          ></v-select>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn
              icon
              variant="text"
              small
              @click="openEditUser(item)"
          >
            <v-icon left small>mdi-cog</v-icon>
            <span class="button-text">Bearbeiten</span>
          </v-btn>
          <v-btn
              color="error"
              icon
              variant="text"
              small
              @click="deleteUser(item.id)"
          >
            <v-icon left small>mdi-delete</v-icon>
            <span class="button-text">Löschen</span>
          </v-btn>
        </template>
      </v-data-table>

      <v-snackbar v-model="snackbar" :color="snackbarColor">
        {{ snackbarMessage }}
      </v-snackbar>

      <UserEditDialog
          ref="userEditDialog"
          v-if="selectedUser"
          :user="selectedUser"
          @user-updated="handleUserUpdated"
          @close="closeEditDialog"
      />
    </v-container>

    <!-- Mobile Ansicht -->
    <div v-else class="user-list">
      <h1>Admin-Seite: Benutzerverwaltung</h1>

      <!-- Suchleiste -->
      <div class="search-filter-container">
        <v-text-field
            v-model="searchQuery"
            label="Nach Benutzer suchen"
            variant="outlined"
            density="compact"
            clearable
        ></v-text-field>
        <v-select
            v-model="statusFilter"
            :items="statusOptionsSimple"
            label="Status filtern"
            variant="outlined"
            density="compact"
            clearable
        ></v-select>
      </div>

      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <div v-if="loading" class="spinner">Laden...</div>

      <div v-for="user in filteredUsers" :key="user.id" class="user-card">
        <div class="user-info">
          <p><strong>ID:</strong> {{ user.id }}</p>
          <p><strong>Benutzername:</strong> {{ user.name }}</p>
          <p><strong>E-Mail:</strong> {{ user.email }}</p>
          <p><strong>Status:</strong>
            <select @change="updateStatus(user.id, $event.target.value)">
              <option value="Aktiv" :selected="user.status === 1">Aktiv</option>
              <option value="Gesperrt" :selected="user.status === 2">Gesperrt</option>
            </select>
          </p>
        </div>
        <div class="user-actions">
          <button class="btn btn-primary" @click="openEditUser(user)">Bearbeiten</button>
          <button class="btn btn-danger" @click="deleteUser(user.id)">Löschen</button>
        </div>
      </div>

      <UserEditDialog
          ref="userEditDialog"
          v-if="selectedUser"
          :user="selectedUser"
          @user-updated="handleUserUpdated"
          @close="closeEditDialog"
      />
    </div>
  </div>
</template>


<script>
import axios from "axios";
import UserEditDialog from "./UserEdit.vue";

export default {
  components: {
    UserEditDialog,
  },
  data() {
    return {
      users: [],
      searchQuery: "",
      statusFilter: "Alle", // Standardmäßig "Alle"
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",
      isMobile: false,
      selectedUser: null,
      statusOptions: [
        { text: "Aktiv", value: 1 },
        { text: "Gesperrt", value: 2 },
      ],
      headers: [
        { text: "ID", value: "id" },
        { text: "Benutzername", value: "name" },
        { text: "E-Mail", value: "email" },
        { text: "Status", value: "statusDisplay" },
        { text: "Aktionen", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    statusOptionsSimple() {
      return ["Alle", ...this.statusOptions.map((option) => option.text)];
    },
    filteredUsers() {
      return this.users
          .map((user) => ({
            ...user,
            statusDisplay: user.status === 1 ? "Aktiv" : "Gesperrt",
          }))
          .filter((user) => {
            const matchesSearch = user.name
                .toLowerCase()
                .includes((this.searchQuery || "").toLowerCase());
            const matchesStatus =
                !this.statusFilter ||
                this.statusFilter === "Alle" ||
                user.statusDisplay === this.statusFilter;
            return matchesSearch && matchesStatus;
          });
    },
  },
  methods: {
    checkDevice() {
      this.isMobile = window.innerWidth <= 768;
    },
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:1337/user");
        this.users = response.data;
      } catch (err) {
        this.snackbarMessage = `Fehler beim Laden der Benutzer: ${err.message}`;
        this.snackbarColor = "error";
        this.snackbar = true;
      }
    },
    async updateStatus(userId, statusText) {
      const statusValue =
          statusText === "Aktiv" ? 1 : statusText === "Gesperrt" ? 2 : null;

      if (statusValue === null) return;

      try {
        const res = await axios.patch(`http://localhost:1337/user/status/${userId}/${statusValue}`, {
          status: statusValue,
        });
        console.log(statusValue)
        console.log(res.data)
        const userIndex = this.users.findIndex((user) => user.id === userId);
        if (userIndex !== -1) {
          this.users[userIndex].status = statusValue;
          this.users[userIndex].statusDisplay = statusText;
        }

        this.snackbarMessage = "Status erfolgreich aktualisiert.";
        this.snackbarColor = "success";
        this.snackbar = true;
      } catch (err) {
        this.snackbarMessage = "Fehler beim Aktualisieren des Status.";
        this.snackbarColor = "error";
        this.snackbar = true;
      }
    },
    openEditUser(user) {
      this.selectedUser = user;
      this.$nextTick(() => {
        this.$refs.userEditDialog.openDialog();
      });
    },
    closeEditDialog() {
      this.selectedUser = null;
    },
    handleUserUpdated(updatedUser) {
      const index = this.users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        this.users.splice(index, 1, updatedUser);
      }
      this.snackbarMessage = "Benutzer erfolgreich aktualisiert.";
      this.snackbarColor = "success";
      this.snackbar = true;
    },
    async deleteUser(id) {
      if (!confirm("Möchtest du diesen Benutzer wirklich löschen?")) return;
      try {
        await axios.delete(`http://localhost:1337/user/${id}`);
        this.users = this.users.filter((user) => user.id !== id);
        this.snackbarMessage = "Benutzer erfolgreich gelöscht.";
        this.snackbarColor = "success";
        this.snackbar = true;
      } catch (err) {
        this.snackbarMessage = "Fehler beim Löschen des Benutzers.";
        this.snackbarColor = "error";
        this.snackbar = true;
      }
    },
  },
  mounted() {
    this.fetchUsers();
    this.checkDevice();
    window.addEventListener("resize", this.checkDevice);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkDevice);
  },
};
</script>



<style scoped>
/* Mobile Cards Styling */
.user-list {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.user-card {
  background-color: #2A2E35;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.user-info {
  flex: 1;
  margin-right: 1rem;
}

.user-info p {
  margin: 0.5rem 0;
  font-size: 0.9rem;
}

.user-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.btn-danger {
  background-color: #d32f2f;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-danger:hover {
  background-color: #b71c1c;
}
</style>
