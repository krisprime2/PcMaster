import axios from 'axios';
import { reactive } from 'vue';

export const authStore = reactive({
    user: null, // Benutzer-Daten
    token: null, // Authentifizierungstoken
    isAuthenticated: false,

    // Login-Methode
    async login(email, password) {
        try {
            const response = await axios.post('http://localhost:1337/auth/login', { email, password });
            this.token = response.data.token; // Token speichern
            this.isAuthenticated = true;
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

            // Token im lokalen Speicher speichern
            localStorage.setItem('authToken', this.token);

            // Benutzer-Daten abrufen
            await this.fetchUser();
        } catch (error) {
            console.error('Login fehlgeschlagen:', error);
            throw error.response?.data?.message || 'Unbekannter Fehler';
        }
    },

    // Abrufen der Benutzerdaten
    async fetchUser() {
        try {
            const response = await axios.get('http://localhost:1337/user/me');
            this.user = response.data; // Benutzerdaten speichern
        } catch (error) {
            console.error('Fehler beim Abrufen der Benutzerdaten:', error);
            this.logout();
        }
    },

    // Logout-Methode
    logout() {
        this.user = null;
        this.token = null;
        this.isAuthenticated = false;

        // Token aus den Headern entfernen
        delete axios.defaults.headers.common['Authorization'];

        // Token aus dem lokalen Speicher entfernen
        localStorage.removeItem('authToken');
    },

    // Prüfen, ob der Benutzer eingeloggt ist
    checkAuth() {
        const token = localStorage.getItem('authToken');
        if (token) {
            this.token = token;
            this.isAuthenticated = true;
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
            this.fetchUser();
        }
    }
});
