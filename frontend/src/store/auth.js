import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        isAuthenticated: false,
        isInitialized: false

    }),

    actions: {
        async login(email, password) {
            try {
                const response = await axios.post('/api/auth/login', {
                    email,
                    password
                });
                this.user = response.data.user;
                this.isAuthenticated = true;
                return { success: true };
            } catch (error) {
                console.error('Login error:', error.response?.data?.message || error.message);
                return {
                    success: false,
                    message: error.response?.data?.message || 'Login fehlgeschlagen'
                };
            }
        },

        async register(userData) {

            try {
                const response = await axios.post('/api/auth/register', {
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                });
                this.user = response.data.user;
                this.isAuthenticated = true;
                return { success: true };
            } catch (error) {
                return {
                    success: false,
                    message: error.response?.data?.message || 'Registrierung fehlgeschlagen'
                };
            }
        },

        async logout() {
            try {
                await axios.post('/api/auth/logout');
                this.user = null;
                this.isAuthenticated = false;
                return { success: true };
            } catch (error) {
                console.error('Logout error:', error);
                return { success: false };
            }
        },

        async initializeAuth() {
            try {
                const response = await axios.get('/api/auth/check');
                this.user = response.data.user;
                this.isAuthenticated = response.data.isAuthenticated;
            } catch (error) {
                this.user = null;
                this.isAuthenticated = false;
            } finally {
                this.isInitialized = true;
            }
        },
    }
});
