<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card class="user-edit-card">
      <v-card-title class="headline">Profil bearbeiten</v-card-title>
      <v-card-text>
        <v-form ref="editForm" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field
                  v-model="editedUser.name"
                  label="Name"
                  :rules="[v => !!v || 'Name ist erforderlich']"
                  required
                  variant="outlined"
                  density="compact"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  v-model="editedUser.email"
                  label="E-Mail"
                  :rules="[v => !!v || 'E-Mail ist erforderlich', v => /.+@.+\..+/.test(v) || 'E-Mail muss gültig sein']"
                  required
                  variant="outlined"
                  density="compact"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false" variant="text">Abbrechen</v-btn>
        <v-btn
            color="primary"
            @click="saveUser"
            :disabled="!valid"
        >
          Speichern
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      valid: false,
      editedUser: { ...this.user },
    }
  },
  methods: {
    openDialog() {
      this.dialog = true;
      this.editedUser = { ...this.user };
    },
    async saveUser() {
      if (!this.$refs.editForm.validate()) return;

      try {
        const updateData = {
          name: this.editedUser.name,
          email: this.editedUser.email,
        };

        const response = await axios.put(`http://localhost:1337/user/${this.user.id}`, updateData);

        this.$emit('user-updated', response.data.updatedUser);
        this.dialog = false;
        this.$emit('show-success', 'Profil erfolgreich aktualisiert');
      } catch (error) {
        this.$emit('show-error', `Fehler beim Aktualisieren: ${error.message}`);
        console.error('Update error:', error);
      }
    }
  }
}
</script>

<style scoped>
.user-edit-card {
  background-color: #1c2128;
  color: white;
}

:deep(.v-field__input) {
  color: white !important;
}

:deep(.v-input__details) {
  color: #999 !important;
}
</style>

