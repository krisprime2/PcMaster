import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import LandingPage from "@/components/LandingPage.vue"
import Register from "@/components/Register.vue"
import Admin from "@/components/Admin.vue"
import Inquiries from "@/components/Inqiuries.vue"
import ArticleDashboardView from "@/views/ArticleDashboardView.vue"
import ShoppingCart from "@/components/ShoppingCart.vue"
import ArticleView from "@/views/ArticleView.vue"
import { useAuthStore } from '@/store/auth'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'HomeView',
            component: LandingPage,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: { requiresGuest: false }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: { requiresGuest: false }
        },
        {
            path: '/admin/user',
            name: 'admin-user',
            component: Admin,
            meta: { requiresAdmin: false },
        },
        {
            path: '/inquiry',
            name: 'sell-inquiry',
            component: Inquiries,
            meta: { requiresAuth: false }
        },
        {
            path: '/admin/articles',
            name: 'admin-article',
            component: ArticleDashboardView,
            meta: { requiresAdmin: false }
        },
        {
            path: '/cart',
            name: 'cart',
            component: ShoppingCart,
            meta: { requiresAuth: false }
        },
        {
            path: '/articles',
            name: 'articles',
            component: ArticleView,
            meta: { requiresAuth: false }
        },
    ],
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    console.log('Auth state:', {
        isAuthenticated: authStore.isAuthenticated,
        user: authStore.user
    }) // Add this for debugging

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/login')
    }
    else if (to.meta.requiresAdmin && !authStore.isAdmin) {
        next('/')
    }
    else if (to.meta.requiresGuest && authStore.isAuthenticated) {
        next('/')
    }
    else {
        next()
    }
});

export default router
