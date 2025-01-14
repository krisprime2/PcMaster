<template>
  <v-container fluid class="configurator-container pa-0">
    <!-- Hero Banner -->
    <v-sheet class="banner-wrapper mb-8">
      <v-card flat class="banner-card pa-8">
        <div class="banner-background">
          <div class="circuit-line-1"></div>
          <div class="circuit-line-2"></div>
          <div class="circuit-dot-1"></div>
          <div class="circuit-dot-2"></div>
        </div>
        <v-row align="center" justify="space-between">
          <v-col cols="12" md="6">
            <h1 class="text-h3 font-weight-bold mb-4">PC Konfigurator</h1>
            <p class="text-h6 text-grey-lighten-1">
              Stelle deinen perfekten PC zusammen
            </p>
          </v-col>
          <v-col cols="12" md="6" class="d-flex justify-end">
            <v-progress-linear
                v-model="progressPercentage"
                color="primary"
                height="20"
                rounded
                striped
                class="w-75"
            >
              <template v-slot:default="{ value }">
                <strong class="text-white">{{ Math.ceil(value) }}% Konfiguriert</strong>
              </template>
            </v-progress-linear>
          </v-col>
        </v-row>
      </v-card>
    </v-sheet>

    <!-- Main Content -->
    <v-row no-gutters>
      <!-- Enhanced Sidebar -->
      <v-col cols="12" md="3" lg="2">
        <v-sheet class="component-sidebar h-100" rounded="lg">
          <v-list bg-color="transparent">
            <v-list-item
                v-for="(type, index) in componentTypes"
                :key="index"
                :value="type"
                :active="currentType === type.id"
                @click="currentType = type.id"
                class="mb-2"
                rounded="lg"
            >
              <template v-slot:prepend>
                <v-avatar
                    :color="selectedComponents[type.id] ? 'primary' : 'grey-darken-3'"
                    size="42"
                >
                  <v-icon :icon="getTypeIcon(type.id)" size="24"></v-icon>
                </v-avatar>
              </template>

              <v-list-item-title class="font-weight-medium">
                {{ type.name }}
              </v-list-item-title>

              <template v-slot:append>
                <v-icon
                    v-if="selectedComponents[type.id]"
                    color="success"
                    icon="mdi-check-circle"
                ></v-icon>
              </template>
            </v-list-item>
            <v-divider class="my-4"></v-divider>

            <div class="px-4 pb-4">
              <v-btn
                  block
                  variant="tonal"
                  :disabled="isFirstType"
                  @click="previousType"
                  class="mb-2"
              >
                <v-icon start>mdi-arrow-left</v-icon>
                Previous
              </v-btn>

              <v-btn
                  block
                  color="primary"
                  :disabled="!canContinue"
                  @click="nextType"
              >
                Next
                <v-icon end>mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </v-list>
        </v-sheet>
      </v-col>

      <!-- Enhanced Main Content -->
      <v-col cols="12" md="9" lg="10">
        <v-container>
          <!-- Component Grid -->
          <v-row>
            <v-col
                v-for="component in getCurrentComponents"
                :key="component.id"
                cols="12"
                sm="6"
                md="4"
                lg="3"
            >
              <v-hover v-slot="{ isHovering, props }">
                <v-card
                    v-bind="props"
                    :elevation="isHovering ? 8 : 2"
                    :class="[
                    'component-card',
                    { 'selected-card': isSelected(component) }
                  ]"
                    @click="selectComponent(component)"
                >
                  <v-img
                      :src="getComponentImage(component)"
                      height="200"
                      cover
                      class="bg-grey-darken-4"
                  >
                    <template v-slot:placeholder>
                      <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                      >
                        <v-progress-circular
                            indeterminate
                            color="primary"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>

                  <v-card-title class="pt-4">
                    {{ component.name }}
                    <v-chip
                        v-if="isSelected(component)"
                        color="success"
                        size="small"
                        class="ml-2"
                    >
                      Selected
                    </v-chip>
                  </v-card-title>

                  <v-card-text>
                    <div class="text-h6 primary--text mb-2">
                      €{{ component.price.toFixed(2) }}
                    </div>
                    <div class="text-body-2 text-grey">
                      {{ component.description }}
                    </div>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions class="pa-4">
                    <v-btn
                        variant="text"
                        color="primary"
                        @click.stop="showDetails(component)"
                    >
                      Details
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        :color="isSelected(component) ? 'error' : 'primary'"
                        variant="tonal"
                        @click.stop="selectComponent(component)"
                    >
                      {{ isSelected(component) ? 'Remove' : 'Select' }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>

          <!-- Navigation and Summary -->
          <v-row class="mt-8">
            <v-col cols="12" md="8">
              <v-card class="summary-card">
                <v-card-title class="text-h5 px-6 py-4">
                  Selected Components
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pa-4">
                  <v-timeline density="compact" align="start">
                    <template v-for="(type) in componentTypes" :key="type.id">
                      <v-timeline-item
                          v-if="selectedComponents[type.id]"
                          :dot-color="'primary'"
                          size="small"
                      >
                        <div class="d-flex align-center justify-space-between">
                            <div>
                              <div class="text-caption text-grey mb-1">
                                {{ type.name }}
                              </div>
                              <div class="d-flex align-center justify-space-between">
                                <div class="text-subtitle-1 font-weight-medium">
                                  {{ selectedComponents[type.id].name }}
                                </div>
                                <div class="text-subtitle-1 primary--text ps-4">
                                  €{{ selectedComponents[type.id].price.toFixed(2) }}
                                </div>
                              </div>
                            </div>
                            </div>

                      </v-timeline-item>
                    </template>
                  </v-timeline>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" md="4">
              <v-card class="summary-total-card">
                <v-card-text class="pa-6">
                  <div class="text-h6 mb-4 text-center">Konfigurations Zusammenfassung</div>
                  <v-divider class="my-4"></v-divider>
                  <div class="d-flex justify-space-between align-center">
                    <span class="text-h5">Total</span>
                    <span class="text-h4 primary--text">€{{ totalPrice.toFixed(2) }}</span>
                  </div>

                  <v-btn
                      block
                      color="primary"
                      size="large"
                      class="mt-6"
                      :disabled="!isConfigurationComplete"
                      @click="saveConfiguration"
                  >
                    <v-icon start>mdi-check-circle</v-icon>
                    Complete Configuration
                  </v-btn>
                </v-card-text>
              </v-card>

              <!-- Navigation Buttons -->

            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <!-- Enhanced Details Dialog -->
    <v-dialog v-model="detailsDialog" max-width="600">
      <v-card v-if="selectedDetails">
        <v-img
            :src="getComponentImage(selectedDetails)"
            height="300"
            cover
            class="bg-grey-darken-4"
        ></v-img>
        <v-card-title class="text-h5 pa-4">
          {{ selectedDetails.name }}
        </v-card-title>
        <v-card-text class="pa-4">
          <p class="text-body-1">{{ selectedDetails.description }}</p>
          <div class="d-flex align-center justify-space-between mt-4">
            <div class="text-h6">Price</div>
            <div class="text-h5 primary--text">
              €{{ selectedDetails.price.toFixed(2) }}
            </div>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn
              variant="tonal"
              @click="detailsDialog = false"
          >
            Close
          </v-btn>
          <v-btn
              color="primary"
              @click="selectAndCloseDetails(selectedDetails)"
          >
            Select Component
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

const COMPONENT_TYPES = {
  CPU: '1',
  MOTHERBOARD: '2',
  RAM: '3',
  GPU: '4',
  STORAGE: '5',
  CASE: '6',
  PSU: '7'
};
export default {
  name: 'PcConfigurator',

  data: () => ({
    currentType: COMPONENT_TYPES.CPU,
    detailsDialog: false,
    selectedDetails: null,
    componentTypes: [
      { id: COMPONENT_TYPES.CPU, name: 'Processor' },
      { id: COMPONENT_TYPES.MOTHERBOARD, name: 'Motherboard' },
      { id: COMPONENT_TYPES.RAM, name: 'RAM' },
      { id: COMPONENT_TYPES.GPU, name: 'Graphics Card' },
      { id: COMPONENT_TYPES.STORAGE, name: 'Storage' },
      { id: COMPONENT_TYPES.CASE, name: 'Case' },
      { id: COMPONENT_TYPES.PSU, name: 'Power Supply' }
    ],
    selectedComponents: {},
    components: {},
    loading: false,
    error: null
  }),

  created() {
    // Initialize selectedComponents with null values
    this.componentTypes.forEach(type => {
      this.selectedComponents[type.id] = null;
    });
    this.fetchComponents();
  },



  computed: {

    progressPercentage() {
      const total = Object.keys(this.selectedComponents).length;
      const completed = Object.values(this.selectedComponents).filter(comp => comp !== null).length;
      return (completed / total) * 100;
    },
    getCurrentTypeName() {
      const type = this.componentTypes.find(t => t.id === this.currentType);
      return type ? type.name : '';
    },

    getCurrentComponents() {
      return this.components[this.currentType] || [];
    },

    totalPrice() {
      return Object.values(this.selectedComponents)
          .filter(comp => comp)
          .reduce((sum, comp) => sum + comp.price, 0);
    },

    hasSelectedComponents() {
      return Object.values(this.selectedComponents).some(comp => comp !== null);
    },

    isConfigurationComplete() {
      return Object.values(this.selectedComponents).every(comp => comp !== null);
    },

    isFirstType() {
      return this.componentTypes[0].id === this.currentType;
    },

    canContinue() {
      return this.selectedComponents[this.currentType] !== null;
    }
  },

  methods: {
    getComponentImage(component) {
      // Return component type specific SVG placeholder
      return `data:image/svg+xml,${encodeURIComponent(this.getComponentSVG(this.currentType))}`;
    },

    async fetchComponents() {
  this.loading = true;
  this.error = null;
  try {
    const response = await axios.get('/api/components');
    // Axios automatically throws on error status codes, and data is in response.data
    this.components = this.groupComponentsByCategory(response.data);
  } catch (error) {
    this.error = error.message;
  } finally {
    this.loading = false;
  }
},

    groupComponentsByCategory(components) {
      return components.reduce((acc, component) => {
        acc[component.type] = acc[component.type] || [];
        acc[component.type].push(component);
        return acc;
      }, {});
    },

    getComponentSVG(type) {
      const svgs = {
        [COMPONENT_TYPES.CPU]: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="60" height="60" fill="#333"/>
          <rect x="30" y="30" width="40" height="40" fill="#666"/>
          <circle cx="50" cy="50" r="15" fill="#999"/>
        </svg>`,
        [COMPONENT_TYPES.MOTHERBOARD]: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="80" height="80" fill="#333"/>
          <rect x="20" y="20" width="20" height="20" fill="#666"/>
          <rect x="60" y="20" width="20" height="20" fill="#666"/>
          <rect x="20" y="60" width="60" height="10" fill="#666"/>
        </svg>`,
        [COMPONENT_TYPES.RAM]: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="10" width="60" height="80" fill="#333"/>
          <rect x="25" y="15" width="50" height="5" fill="#666"/>
          <rect x="25" y="25" width="50" height="5" fill="#666"/>
          <rect x="25" y="35" width="50" height="5" fill="#666"/>
        </svg>`,
        [COMPONENT_TYPES.GPU]: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="20" width="80" height="40" fill="#333"/>
          <rect x="20" y="30" width="40" height="20" fill="#666"/>
          <circle cx="75" cy="40" r="10" fill="#666"/>
        </svg>`,
        [COMPONENT_TYPES.STORAGE]: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="30" width="60" height="40" fill="#333"/>
          <circle cx="50" cy="50" r="15" fill="#666"/>
          <circle cx="50" cy="50" r="5" fill="#999"/>
        </svg>`,
        [COMPONENT_TYPES.CASE]: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="10" width="60" height="80" fill="#333"/>
          <rect x="30" y="20" width="40" height="10" fill="#666"/>
          <rect x="30" y="40" width="40" height="40" fill="#666"/>
        </svg>`,
        [COMPONENT_TYPES.PSU]: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="60" height="60" fill="#333"/>
          <circle cx="50" cy="50" r="20" fill="#666"/>
          <path d="M40,50 L60,50 M50,40 L50,60" stroke="#999" stroke-width="4"/>
        </svg>`
      };
      return svgs[type] || svgs[COMPONENT_TYPES.CPU];
    },

    selectComponent(component) {
      if (this.selectedComponents[this.currentType] === component) {
        this.selectedComponents[this.currentType] = null;
      }
      else {
        this.selectedComponents[this.currentType] = component;
      }
    },
    showDetails(component) {
      this.selectedDetails = component;
      this.detailsDialog = true;
    },

    selectAndCloseDetails(component) {
      this.selectComponent(component);
      this.detailsDialog = false;
    },

    getTypeNameById(typeId) {
      const type = this.componentTypes.find(t => t.id === typeId);
      return type ? type.name : '';
    },

    nextType() {
      const currentIndex = this.componentTypes.findIndex(t => t.id === this.currentType);
      if (currentIndex < this.componentTypes.length - 1) {
        this.currentType = this.componentTypes[currentIndex + 1].id;
      }
    },

    previousType() {
      const currentIndex = this.componentTypes.findIndex(t => t.id === this.currentType);
      if (currentIndex > 0) {
        this.currentType = this.componentTypes[currentIndex - 1].id;
      }
    },

    getTypeIcon(typeId) {
      const icons = {
        [COMPONENT_TYPES.CPU]: 'mdi-cpu-64-bit',
        [COMPONENT_TYPES.MOTHERBOARD]: 'mdi-motherboard',
        [COMPONENT_TYPES.RAM]: 'mdi-memory',
        [COMPONENT_TYPES.GPU]: 'mdi-expansion-card',
        [COMPONENT_TYPES.STORAGE]: 'mdi-harddisk',
        [COMPONENT_TYPES.CASE]: 'mdi-desktop-tower',
        [COMPONENT_TYPES.PSU]: 'mdi-power-plug'
      };
      return icons[typeId] || 'mdi-checkbox-blank-circle';
    },

    isSelected(component) {
      const selected = this.selectedComponents[this.currentType];
      return selected && selected.id === component.id;
    },

    async saveConfiguration() {
      // Implement save configuration logic here
      console.log('Configuration saved:', this.selectedComponents);
    }
  }
}
</script>

<style scoped>
.configurator-container {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  min-height: 100vh;
}

.banner-card {
  background: linear-gradient(135deg, #2A2E35 0%, #1E2228 100%) !important;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
}

.banner-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.circuit-line-1, .circuit-line-2 {
  position: absolute;
  background: linear-gradient(90deg, transparent, var(--v-primary-base), transparent);
  height: 2px;
  width: 200px;
}

.circuit-line-1 {
  top: 30%;
  right: 15%;
  transform: rotate(-45deg);
  animation: moveLine 8s infinite;
}

.circuit-line-2 {
  bottom: 40%;
  left: 20%;
  transform: rotate(30deg);
  animation: moveLine 10s infinite reverse;
}

.circuit-dot-1, .circuit-dot-2 {
  position: absolute;
  background: var(--v-primary-base);
  border-radius: 50%;
  opacity: 0.6;
}

.circuit-dot-1 {
  width: 30px;
  height: 30px;
  top: 25%;
  right: 25%;
  animation: pulse 4s infinite;
}

.circuit-dot-2 {
  width: 20px;
  height: 20px;
  bottom: 30%;
  left: 35%;
  animation: pulse 6s infinite;
}

@keyframes moveLine {
  0% {
    opacity: 0;
    transform: translateX(-100%) rotate(-45deg);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateX(100%) rotate(-45deg);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.3;
  }
  100% {
    transform: scale(1);
    opacity: 0.6;
  }
}

.component-sidebar {
  background: linear-gradient(135deg, #2A2E35 0%, #1E2228 100%);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  min-height: calc(100vh - 200px);
  position: sticky;
  top: 24px;
}

.component-card {
  background: linear-gradient(145deg, #2A2E35, #1E2228) !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.component-card:hover {
  transform: translateY(-8px);
  border-color: rgba(var(--v-primary-base), 0.5);
}

.selected-card {
  border: 2px solid var(--v-primary-base) !important;
  box-shadow: 0 0 20px rgba(var(--v-primary-base), 0.2) !important;
}

.summary-card, .summary-total-card {
  background: linear-gradient(145deg, #2A2E35, #1E2228) !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}

.v-timeline-item__body {
  padding: 12px !important;
}

.v-list-item--active {
  background: linear-gradient(90deg, rgba(var(--v-primary-base), 0.1), transparent) !important;
}

/* Smooth transitions */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
