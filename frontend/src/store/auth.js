// src/stores/auth.js
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        isAuthenticated: !!localStorage.getItem('user'),
        loading: false,
        error: null
    }),

    getters: {
        isAdmin: (state) => state.user?.role === 1,
        isUser: (state) => state.user?.role === 2
    },

    actions: {
        async register(userData) {
            try {
                this.loading = true
                this.error = null
                const response = await axios.post('/register', {
                    name: userData.username,
                    email: userData.email,
                    password: userData.password,
                })

                this.user = response.data
                this.isAuthenticated = true
                localStorage.setItem('user', JSON.stringify(response.data))
                router.push('/')
            } catch (error) {
                this.error = error.response?.data?.message || 'Registration failed'
                throw error
            } finally {
                this.loading = false
            }
        },

        async login(credentials) {
            try {
                const response = await axios.post('/login', credentials)
                this.user = response.data.user
                this.isAuthenticated = true
                localStorage.setItem('user', JSON.stringify(response.data.user))
                await this.checkAuth() // Add this line

                if (this.isAdmin) {
                    router.push('/admin/user')
                } else {
                    router.push('/')
                }
            } catch (error) {
                throw error
            }
        },

        async logout() {
            try {
                await axios.post('/logout')
                this.user = null
                this.isAuthenticated = false
                localStorage.removeItem('user')
                router.push('/login')
            } catch (error) {
                console.error('Logout failed:', error)
            }
        },

        async checkAuth() {
            try {
                const response = await axios.get('/api/user/current')
                this.user = response.data
                this.isAuthenticated = true
                localStorage.setItem('user', JSON.stringify(response.data))
            } catch (error) {
                this.user = null
                this.isAuthenticated = false
                localStorage.removeItem('user')
                if (router.currentRoute.value.meta.requiresAuth) {
                    router.push('/login')
                }
            }
        },

        initializeAuth() {
            const user = localStorage.getItem('user')
            if (user) {
                this.user = JSON.parse(user)
                this.isAuthenticated = true
            }
        }
    }
})
