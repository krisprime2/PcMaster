import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createVuetify } from "vuetify";
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import axios from "axios";
import {createPinia} from "pinia";
import {useAuthStore} from "@/store/auth.js";

axios.defaults.baseURL = 'http://localhost:1337'; // API-Base-URL

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
const pinia = createPinia();
app.use(vuetify)
app.use(router)
app.use(pinia)

const authStore = useAuthStore()
await authStore.checkAuth()

app.mount('#app')
