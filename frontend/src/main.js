import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createVuetify } from "vuetify";
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import axios from "axios";
import {createPinia} from "pinia";
import {useAuthStore} from "@/store/auth.js";
import {validate} from "vee-validate";


axios.defaults.withCredentials = true;
if (!import.meta.env.PROD) {
    console.log("--> Development Mode")
    axios.defaults.baseURL = "http://localhost:1337";
} else {
    console.log("--> Production Mode")
    axios.defaults.baseURL = "https://pcmaster.onrender.com";
}

export const BASE_IMAGE_URL = process.env.NODE_ENV === 'production'
    ? 'https:/pcmaster.onrender.com/'
    : '/src/';

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
app.use(pinia)
app.use(vuetify)
app.use(router)
app.use(validate)
const authStore = useAuthStore()

app.mount('#app')
