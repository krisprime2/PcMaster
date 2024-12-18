import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import LandingPage from "@/components/LandingPage.vue";
import Register from "@/components/Register.vue";
import Admin from "@/components/Admin.vue";
import Inquiries from "@/components/Inqiuries.vue";
import {authStore} from "@/store/auth.js";
import ArticleDashboardView from "@/views/ArticleDashboardView.vue";

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
            meta: { requiresAuth: true },
        },{
            path: '/inquiry',
            name: 'sell-inquiry',
            component: Inquiries,
        },{
            path: '/admin/articles',
            name: 'admin-article',
            component: ArticleDashboardView,
        },
    ],
})

export default router
