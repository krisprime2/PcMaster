<template>
  <v-container fluid class="configurator-container">
    <!-- Progress bar -->
    <v-row>
      <v-col cols="12" class="py-8">
        <div class="progress-container">
          <div class="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <!-- Left sidebar with component types -->
      <v-col cols="2" class="component-sidebar">
        <v-list dense dark>
          <v-list-item
              v-for="(type, index) in componentTypes"
              :key="index"
              @click="currentType = type.id"
              :class="{
              'selected-type': currentType === type.id,
              'completed-type': selectedComponents[type.id] !== null
            }"
          >
            <v-list-item-icon>
              <v-icon>{{ getTypeIcon(type.id) }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ type.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>

      <!-- Main content area -->
      <v-col cols="10" class="component-content">
        <v-row>
          <v-col cols="12">
            <h2 class="text-h5 mb-4 white--text">
              {{ getCurrentTypeName }}
            </h2>
          </v-col>
        </v-row>

        <v-row>
          <v-col
              v-for="component in getCurrentComponents"
              :key="component.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
          >
            <v-card
                dark
                class="component-card"
                :class="{ 'selected-card': isSelected(component) }"
                @click="selectComponent(component)"
            >
              <v-img
                  :src="getComponentImage(component)"
                  height="200"
                  contain
                  class="grey darken-4"
              ></v-img>

              <v-card-title class="text-subtitle-1">
                {{ component.name }}
              </v-card-title>

              <v-card-text>
                <div class="text-h6 primary--text mb-2">
                  €{{ component.price }}
                </div>
                <div class="text-caption">
                  {{ component.description }}
                </div>
              </v-card-text>

              <v-card-actions>
                <v-btn
                    text
                    color="primary"
                    @click.stop="showDetails(component)"
                >
                  DETAILS
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    @click.stop="selectComponent(component)"
                >
                  {{ isSelected(component) ? 'DESELECT' : 'SELECT' }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Navigation buttons -->
        <v-row class="mt-4">
          <v-col>
            <v-btn
                color="grey"
                dark
                @click="previousType"
                :disabled="isFirstType"
            >
              BACK
            </v-btn>
            <v-btn
                color="primary"
                class="ml-4"
                @click="nextType"
                :disabled="!canContinue"
            >
              CONTINUE
            </v-btn>
          </v-col>
        </v-row>

        <!-- Configuration Summary -->
        <v-row v-if="hasSelectedComponents" class="mt-6">
          <v-col cols="12">
            <v-card dark elevation="4" class="summary-card">
              <v-card-title class="headline">
                Deine Konfiguration
                <v-spacer></v-spacer>
                <div class="text-h4 orange--text">
                  €{{ totalPrice }}
                </div>
              </v-card-title>

              <v-divider class="mx-4"></v-divider>

              <v-card-text>
                <v-row>
                  <v-col cols="12" md="8">
                    <div class="selected-components">
                      <template v-for="(component, typeId) in selectedComponents" :key="typeId">
                        <v-sheet
                            v-if="component"
                            class="component-summary pa-4 mb-3"
                            rounded
                            elevation="2"
                        >
                          <div class="d-flex align-center">
                            <v-avatar
                                size="50"
                                class="mr-4"
                                :color="'grey darken-3'"
                            >
                              <v-icon size="24">{{ getTypeIcon(typeId) }}</v-icon>
                            </v-avatar>
                            <div class="flex-grow-1">
                              <div class="subtitle-1 grey--text text--lighten-1">
                                {{ getTypeNameById(typeId) }}
                              </div>
                              <div class="title">{{ component.name }}</div>
                            </div>
                            <div class="text-h6">
                              €{{ component.price }}
                            </div>
                          </div>
                        </v-sheet>
                      </template>
                    </div>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-card class="summary-details" outlined>
                      <v-card-text>
                        <div class="text-subtitle-1 mb-2">Zusammenfassung</div>
                        <div class="d-flex justify-space-between mb-2">
                          <span class="grey--text">Komponenten</span>
                          <span>{{ Object.values(selectedComponents).filter(c => c).length }}</span>
                        </div>
                        <div class="d-flex justify-space-between mb-2">
                          <span class="grey--text">Durchschnittspreis</span>
                          <span>€{{ (totalPrice / Object.values(selectedComponents).filter(c => c).length).toFixed(2) }}</span>
                        </div>
                        <v-divider class="my-3"></v-divider>
                        <div class="d-flex justify-space-between text-h6">
                          <strong>Gesamtpreis</strong>
                          <strong class="orange--text">€{{ totalPrice }}</strong>
                        </div>
                      </v-card-text>
                    </v-card>

                    <v-btn
                        color="orange"
                        x-large
                        block
                        class="mt-4"
                        elevation="2"
                        @click="saveConfiguration"
                        :disabled="!isConfigurationComplete"
                    >
                      <v-icon left>mdi-content-save</v-icon>
                      Konfiguration speichern
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Details Dialog -->
    <v-dialog v-model="detailsDialog" max-width="500">
      <v-card dark v-if="selectedDetails">
        <v-card-title>{{ selectedDetails.name }}</v-card-title>
        <v-card-text>
          <v-img
              :src="getComponentImage(selectedDetails)"
              height="250"
              contain
          ></v-img>
          <div class="mt-4">
            <p>{{ selectedDetails.description }}</p>
            <p class="text-h6">Price: €{{ selectedDetails.price }}</p>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="detailsDialog = false">Close</v-btn>
          <v-btn
              color="primary"
              @click="selectAndCloseDetails(selectedDetails)"
          >
            Select
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
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
    selectedComponents: {
      [COMPONENT_TYPES.CPU]: null,
      [COMPONENT_TYPES.MOTHERBOARD]: null,
      [COMPONENT_TYPES.RAM]: null,
      [COMPONENT_TYPES.GPU]: null,
      [COMPONENT_TYPES.STORAGE]: null,
      [COMPONENT_TYPES.CASE]: null,
      [COMPONENT_TYPES.PSU]: null
    },
    // Sample components for each category
    components: {
      [COMPONENT_TYPES.CPU]: [
        { id: 1, name: 'Intel Core i7', price: 499.99, description: 'High-performance CPU with 8 cores' },
        { id: 2, name: 'AMD Ryzen 9', price: 549.99, description: 'Premium CPU for gaming and content creation' }
      ],
      [COMPONENT_TYPES.MOTHERBOARD]: [
        { id: 3, name: 'ASUS ROG', price: 299.99, description: 'Gaming motherboard with RGB' },
        { id: 4, name: 'MSI MPG', price: 259.99, description: 'Reliable motherboard for gaming' }
      ],
      [COMPONENT_TYPES.RAM]: [
        { id: 5, name: 'Corsair 32GB', price: 159.99, description: 'High-speed DDR4 RAM' },
        { id: 6, name: 'G.Skill 16GB', price: 89.99, description: 'Reliable gaming memory' }
      ],
      [COMPONENT_TYPES.GPU]: [
        { id: 7, name: 'NVIDIA RTX 4080', price: 799.99, description: 'High-end gaming graphics' },
        { id: 8, name: 'AMD RX 6800', price: 649.99, description: 'Excellent 4K gaming performance' }
      ],
      [COMPONENT_TYPES.STORAGE]: [
        { id: 9, name: 'Samsung 2TB SSD', price: 199.99, description: 'Fast NVMe storage' },
        { id: 10, name: 'WD Black 1TB', price: 149.99, description: 'Reliable gaming SSD' }
      ],
      [COMPONENT_TYPES.CASE]: [
        { id: 11, name: 'Lian Li PC-O11', price: 149.99, description: 'Premium ATX case' },
        { id: 12, name: 'NZXT H510', price: 99.99, description: 'Clean minimal design' }
      ],
      [COMPONENT_TYPES.PSU]: [
        { id: 13, name: 'Corsair 850W', price: 129.99, description: '80+ Gold certified' },
        { id: 14, name: 'EVGA 750W', price: 109.99, description: 'Reliable power supply' }
      ]
    }
  }),

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
.banner-wrapper {
  position: relative;
  width: 100%;
  margin-bottom: 32px;
}

.banner-card {
  background: linear-gradient(135deg, #232730 0%, #1a1d24 100%) !important;
  overflow: hidden;
  position: relative;
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
  background: linear-gradient(90deg, transparent, #FF9800, transparent);
  height: 2px;
  width: 150px;
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
  background: #FF9800;
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

.summary-card {
  background-color: #2A2E35 !important;
  border-radius: 12px;
}

.component-summary {
  background-color: #232730 !important;
  transition: transform 0.2s ease;
}

.component-summary:hover {
  transform: translateX(8px);
}

.summary-details {
  background-color: #232730 !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
}

.configurator-container {
  background-color: #1E1E1E;
  min-height: 100vh;
}

.component-sidebar {
  background-color: #2A2E35;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.component-content {
  padding: 24px;
}

.component-card {
  background-color: #2A2E35 !important;
  transition: all 0.3s ease;
  height: 100%;
}

.component-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.selected-card {
  border: 2px solid var(--v-primary-base);
}

.selected-type {
  background-color: rgba(var(--v-primary-base), 0.1);
}

.completed-type {
  color: var(--v-primary-base);
}

.progress-container {
  width: 100%;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.progress-bar {
  height: 100%;
  background-color: #FF9800; /* Orange color */
  transition: width 0.3s ease;
}

.v-list-item {
  border-radius: 4px;
  margin: 4px 0;
}

.configurator-container {
  background-color: #1E1E1E;
  min-height: 100vh;
}

.component-sidebar {
  background-color: #2A2E35;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.component-content {
  padding: 24px;
}

.component-card {
  background-color: #2A2E35 !important;
  transition: all 0.3s ease;
  height: 100%;
}

.component-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.selected-card {
  border: 2px solid var(--v-primary-base);
}

.selected-type {
  background-color: rgba(var(--v-primary-base), 0.1);
}

.completed-type {
  color: var(--v-primary-base);
}


.v-list-item {
  border-radius: 4px;
  margin: 4px 0;
}
</style>
