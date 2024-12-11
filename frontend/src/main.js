import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createVuetify } from "vuetify";
import "vuetify/styles"; // Vuetify CSS
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'dark',
        themes: {
            dark: {
                dark: true, // Wichtig für den Darkmode
                colors: {
                    primary: '#1E88E5',
                    secondary: '#FFCDD2',
                },
            },
        },
    },
});

const app = createApp(App)
app.use(vuetify)
app.use(router)
app.mount('#app')
