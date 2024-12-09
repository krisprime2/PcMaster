<template>
  <div class="admin-page">
    <h1>Admin-Seite: Benutzerverwaltung</h1>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-if="loading" class="spinner">Laden...</div>

    <!-- Desktop: Tabelle -->
    <table v-if="users.length && !isMobile" class="table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Benutzername</th>
        <th>E-Mail</th>
        <th>Status</th>
        <th>Aktionen</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>
          <select @change="updateStatus(user.id, $event.target.value)">
            <option value="1" :selected="user.status === 1">Aktiv</option>
            <option value="2" :selected="user.status === 2">Gesperrt</option>
          </select>
        </td>
        <td>
          <button class="btn btn-danger" @click="deleteUser(user.id)">Löschen</button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Mobile: Kartenansicht -->
    <div v-else-if="users.length && isMobile" class="user-list">
      <div v-for="user in users" :key="user.id" class="user-card">
        <div class="user-info">
          <p><strong>ID:</strong> {{ user.id }}</p>
          <p><strong>Benutzername:</strong> {{ user.name }}</p>
          <p><strong>E-Mail:</strong> {{ user.email }}</p>
          <p><strong>Status:</strong>
            <select @change="updateStatus(user.id, $event.target.value)">
              <option value="1" :selected="user.status === 1">Aktiv</option>
              <option value="2" :selected="user.status === 2">Gesperrt</option>
            </select>
          </p>
        </div>
        <div class="user-actions">
          <button class="btn btn-danger" @click="deleteUser(user.id)">Löschen</button>
        </div>
      </div>
    </div>

    <div v-else class="alert alert-info">Keine Benutzer gefunden.</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [],
      loading: false,
      error: null,
      isMobile: false,
    };
  },
  methods: {
    async fetchUsers() {
      this.loading = true;
      try {
        const response = await axios.get("http://localhost:1337/user");
        this.users = response.data;
      } catch (err) {
        this.error = "Fehler beim Laden der Benutzer.";
      } finally {
        this.loading = false;
      }
    },
    async updateStatus(userId, status) {
      try {
        await axios.patch(`http://localhost:1337/user/${userId}/${status}`);
        alert("Status erfolgreich aktualisiert.");
      } catch (err) {
        this.error = "Fehler beim Aktualisieren des Status.";
      }
    },
    async deleteUser(id) {
      if (!confirm("Möchtest du diesen Benutzer wirklich löschen?")) return;
      try {
        await axios.delete(`http://localhost:1337/user/${id}`);
        this.users = this.users.filter((user) => user.id !== id);
        alert("Benutzer erfolgreich gelöscht.");
      } catch (err) {
        this.error = "Fehler beim Löschen des Benutzers.";
      }
    },
    checkDevice() {
      this.isMobile = window.innerWidth <= 768;
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
/* Allgemeines Styling */
.admin-page {
  padding: 1rem;
  background-color: #0A0E1A;
  color: white;
  font-family: 'Inter', sans-serif;
}

h1 {
  text-align: center;
  font-size: 1.8rem;
}

.alert {
  padding: 1rem;
  border-radius: 5px;
  margin-top: 1rem;
  font-size: 0.9rem;
  text-align: center;
}

.spinner {
  text-align: center;
  font-size: 1.2rem;
}

/* Tabelle */
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: #1c1f26;
  color: white;
}

.table th, .table td {
  padding: 0.5rem;
  text-align: left;
  border: 1px solid #444;
}

.table th {
  background-color: #2A2E35;
}

.table select {
  padding: 0.3rem;
  background-color: #2A2E35;
  color: white;
  border: 1px solid #444;
  border-radius: 5px;
}

/* Kartenansicht für Mobile */
.user-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.user-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2A2E35;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
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
  gap: 0.5rem;
}

select {
  padding: 0.4rem;
  background-color: #2A2E35;
  color: white;
  border: 1px solid #444;
  border-radius: 5px;
}

.btn {
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.btn-danger {
  background-color: #d32f2f;
  border: none;
  color: white;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.btn-danger:hover {
  background-color: #b71c1c;
}
</style>
