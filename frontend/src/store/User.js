import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        isAuthenticated: false,
    }),
    actions: {
        async register(name, email, password) {
            try {
                console.log(password)
                const response = await axios.post('/register', {
                    name,
                    email,
                    password,
                });
                this.user = response.data.user;
                this.isAuthenticated = true;
                return response.data;
            } catch (error) {
                // Fehler mit Originalnachricht weiterreichen
                throw error;
            }
        },
        async login(email, password) {
            try {
                const response = await axios.post('/login', { email, password });
                this.user = response.data.user;
                this.isAuthenticated = true;
                return response.data;
            } catch (error) {
                // Auch hier den Original-Fehler weiterreichen
                throw error;
            }
        },
        async logout() {
            await axios.post('/logout');
            this.user = null;
            this.isAuthenticated = false;
        },
    },
});
