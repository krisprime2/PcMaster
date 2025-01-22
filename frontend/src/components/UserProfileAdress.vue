<!-- UserAddressComponent.vue -->
<template>
  <div class="address-component">
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <div class="profile-section">
          <div class="section-header">
            <v-icon color="primary" class="mr-2">mdi-account</v-icon>
            <span class="text-h6 white--text">Persönliche Informationen</span>
          </div>

          <v-row>
            <v-col cols="12" md="6">
              <div class="info-item">
                <div class="info-label">Benutzername</div>
                <template v-if="isEditing">
                  <v-text-field
                      v-model="editedProfile.name"
                      :rules="[v => !!v || 'Benutzername ist erforderlich']"
                      outlined
                      dense
                      dark
                  ></v-text-field>
                </template>
                <div v-else class="info-value">{{ profile.name || '-' }}</div>
              </div>
            </v-col>

            <v-col cols="12" md="6">
              <div class="info-item">
                <div class="info-label">E-Mail</div>
                <template v-if="isEditing">
                  <v-text-field
                      v-model="editedProfile.email"
                      :rules="[
                      v => !!v || 'E-Mail ist erforderlich',
                      v => /.+@.+\..+/.test(v) || 'E-Mail muss gültig sein'
                    ]"
                      outlined
                      dense
                      dark
                  ></v-text-field>
                </template>
                <div v-else class="info-value">{{ profile.email || '-' }}</div>
              </div>
            </v-col>

            <v-col cols="12" md="6">
              <div class="info-item">
                <div class="info-label">Vorname</div>
                <template v-if="isEditing">
                  <v-text-field
                      v-model="editedProfile.firstName"
                      outlined
                      dense
                      dark
                  ></v-text-field>
                </template>
                <div v-else class="info-value">{{ profile.firstName || '-' }}</div>
              </div>
            </v-col>

            <v-col cols="12" md="6">
              <div class="info-item">
                <div class="info-label">Nachname</div>
                <template v-if="isEditing">
                  <v-text-field
                      v-model="editedProfile.lastName"
                      outlined
                      dense
                      dark
                  ></v-text-field>
                </template>
                <div v-else class="info-value">{{ profile.lastName || '-' }}</div>
              </div>
            </v-col>
          </v-row>
        </div>

        <div class="profile-section mt-6">
          <div class="section-header">
            <v-icon color="primary" class="mr-2">mdi-home</v-icon>
            <span class="text-h6 white--text">Adresse</span>
          </div>

          <v-row>
            <v-col cols="12" md="8">
              <div class="info-item">
                <div class="info-label">Straße</div>
                <template v-if="isEditing">
                  <v-text-field
                      v-model="editedProfile.street"
                      outlined
                      dense
                      dark
                  ></v-text-field>
                </template>
                <div v-else class="info-value">{{ profile.street || '-' }}</div>
              </div>
            </v-col>

            <v-col cols="12" md="4">
              <div class="info-item">
                <div class="info-label">Hausnummer</div>
                <template v-if="isEditing">
                  <v-text-field
                      v-model="editedProfile.streetNumber"
                      type="number"
                      outlined
                      dense
                      dark
                  ></v-text-field>
                </template>
                <div v-else class="info-value">{{ profile.streetNumber || '-' }}</div>
              </div>
            </v-col>

            <v-col cols="12" md="6">
              <div class="info-item">
                <div class="info-label">Stadt</div>
                <template v-if="isEditing">
                  <v-text-field
                      v-model="editedProfile.city"
                      outlined
                      dense
                      dark
                  ></v-text-field>
                </template>
                <div v-else class="info-value">{{ profile.city || '-' }}</div>
              </div>
            </v-col>

            <v-col cols="12" md="6">
              <div class="info-item">
                <div class="info-label">PLZ</div>
                <template v-if="isEditing">
                  <v-text-field
                      v-model="editedProfile.postalNumber"
                      type="number"
                      outlined
                      dense
                      dark
                  ></v-text-field>
                </template>
                <div v-else class="info-value">{{ profile.postalNumber || '-' }}</div>
              </div>
            </v-col>

            <v-col cols="12">
              <div class="info-item">
                <div class="info-label">Land</div>
                <template v-if="isEditing">
                  <v-text-field
                      v-model="editedProfile.country"
                      outlined
                      dense
                      dark
                  ></v-text-field>
                </template>
                <div v-else class="info-value">{{ profile.country || '-' }}</div>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-form>

      <div class="d-flex justify-end mt-4">
        <v-btn
            v-if="isEditing"
            color="primary"
            @click="saveProfile"
            :disabled="!valid"
            class="mr-2"
        >
          <v-icon left>mdi-content-save</v-icon>
          Speichern
        </v-btn>
        <v-btn
            color="primary"
            @click="toggleEdit"
        >
          <v-icon left>{{ isEditing ? 'mdi-close' : 'mdi-pencil' }}</v-icon>
          {{ isEditing ? 'Abbrechen' : 'Bearbeiten' }}
        </v-btn>
      </div>
    </v-card-text>
  </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '@/store/auth';

export default {
  name: 'UserAddressComponent',

  data() {
    return {
      valid: true,
      isEditing: false,
      profile: {
        name: '',
        email: '',
        firstName: '',
        lastName: '',
        street: '',
        streetNumber: null,
        city: '',
        postalNumber: null,
        country: ''
      },
      editedProfile: {}
    }
  },

  methods: {
    async loadProfile() {
      try {
        const authStore = useAuthStore();
        const response = await axios.get(`/user/${authStore.user.id}`);
        this.profile = { ...response.data };
      } catch (error) {
        this.$emit('error', 'Fehler beim Laden des Profils');
      }
    },

    toggleEdit() {
      if (this.isEditing) {
        this.editedProfile = {};
        this.$refs.form.reset();
      } else {
        this.editedProfile = { ...this.profile };
      }
      this.isEditing = !this.isEditing;
    },

    async saveProfile() {
      try {
        if (!this.$refs.form.validate()) return;

        const authStore = useAuthStore();
        await axios.put(`/user/${authStore.user.id}`, this.editedProfile);

        this.profile = { ...this.editedProfile };
        this.isEditing = false;
        this.$emit('saved', this.profile);
      } catch (error) {
        this.$emit('error', 'Fehler beim Speichern des Profils');
      }
    }
  },

  mounted() {
    this.loadProfile();
  }
}
</script>

<style scoped>
.profile-section {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(99, 106, 232, 0.3);
}

.info-item {
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
  padding: 1rem;
  height: 100%;
  transition: background-color 0.2s ease;
}

.info-item:hover {
  background-color: rgba(255, 255, 255, 0.06);
}

.info-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.info-value {
  color: white;
  font-size: 1rem;
  font-weight: 500;
}
</style>
