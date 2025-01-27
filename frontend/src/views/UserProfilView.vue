<template>
  <v-app>
    <v-main class="main-content">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="10">
            <v-card class="profile-card">
              <v-card-title class="profile-header d-flex align-center pa-6">
                <div class="d-flex align-center">
                  <v-icon color="primary" size="32" class="mr-3">mdi-account-circle</v-icon>
                  <span class="text-h4 white--text">Mein Profil</span>
                </div>
              </v-card-title>

              <v-tabs
                  v-model="activeTab"
                  dark
                  background-color="transparent"
                  slider-color="primary"
              >
                <v-tab class="px-6">
                  <v-icon left>mdi-account</v-icon>
                  Persönliche Daten
                </v-tab>
                <v-tab class="px-6">
                  <v-icon left>mdi-shopping</v-icon>
                  Bestellungen
                  <v-badge
                      v-if="orderCount > 0"
                      :content="orderCount"
                      color="primary"
                      offset-x="10"
                      offset-y="-8"
                  ></v-badge>
                </v-tab>
              </v-tabs>

              <v-divider></v-divider>

              <v-tabs-items v-model="activeTab">
                <v-tab-item>
                  <UserAddressComponent
                      v-if="activeTab === 0"
                      ref="addressComponent"
                      @error="showError"
                      @saved="handleProfileSaved"
                  />
                </v-tab-item>

                <v-tab-item>
                  <UserOrdersComponent
                      v-if="activeTab === 1"
                      ref="ordersComponent"
                      @error="showError"
                      @order-count-updated="updateOrderCount"
                  />
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-snackbar
          v-model="snackbar.show"
          :color="snackbar.color"
          :timeout="snackbar.timeout"
          top
      >
        {{ snackbar.text }}
        <template v-slot:action="{ attrs }">
          <v-btn
              text
              v-bind="attrs"
              @click="snackbar.show = false"
          >
            Schließen
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import UserAddressComponent from '@/components/UserProfileAdress.vue';
import UserOrdersComponent from '@/components/UserProfileOrders.vue';

export default {
  name: 'UserProfileView',

  components: {
    UserAddressComponent,
    UserOrdersComponent
  },

  data() {
    return {
      activeTab: 0,
      orderCount: 0,
      snackbar: {
        show: false,
        text: '',
        color: 'success',
        timeout: 3000
      }
    };
  },

  methods: {
    showError(message) {
      this.snackbar.text = message;
      this.snackbar.color = 'error';
      this.snackbar.show = true;
    },

    showSuccess(message) {
      this.snackbar.text = message;
      this.snackbar.color = 'success';
      this.snackbar.show = true;
    },

    handleProfileSaved() {
      this.showSuccess('Profil wurde erfolgreich aktualisiert');
    },

    updateOrderCount(count) {
      this.orderCount = count;
    },

    refreshData() {
      if (this.activeTab === 0 && this.$refs.addressComponent) {
        this.$refs.addressComponent.loadProfile();
      } else if (this.activeTab === 1 && this.$refs.ordersComponent) {
        this.$refs.ordersComponent.loadOrders();
      }
    }
  },

  watch: {
    '$route'() {
      this.refreshData();
    },
    activeTab() {
      this.refreshData();
    }
  },

  beforeRouteLeave(to, from, next) {
    const addressComponent = this.$refs.addressComponent;
    if (addressComponent && addressComponent.isEditing) {
      const answer = window.confirm('Sie haben ungespeicherte Änderungen. Möchten Sie die Seite wirklich verlassen?');
      if (answer) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  }
};
</script>

<style scoped>
.main-content {
  background-color: #0A0E1A;
  min-height: 100vh;
  padding: 2rem 0;
}

.profile-card {
  background-color: #2A2E35 !important;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
}

.profile-header {
  background: linear-gradient(180deg, #1E2127 0%, #2A2E35 100%);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

::v-deep .v-tabs {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

::v-deep .v-tab {
  letter-spacing: 0.5px;
  text-transform: none;
  font-weight: 500;
}

::v-deep .v-tab:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

::v-deep .v-tab--active {
  color: var(--v-primary-base) !important;
}

.v-badge__badge {
  font-size: 0.75rem;
  font-weight: 600;
  height: 20px;
  min-width: 20px;
  padding: 0 4px;
}
</style>
