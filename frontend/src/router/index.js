import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import LandingPage from "@/components/LandingPage.vue";
import Register from "@/components/Register.vue";
import Admin from "@/components/Admin.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'LandingPage',
            component: LandingPage,
        }, {
            path: '/login',
            name: 'login',
            component: Login,
        },{
            path: '/register',
            name: 'register',
            component: Register,
        },{
            path: '/admin/user',
            name: 'admin-user',
            component: Admin,
        },


    ],
})

export default router
