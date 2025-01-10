import { authStore } from './auth';
import { createPinia } from 'pinia'

export const pinia = createPinia()
export default {
    authStore
};