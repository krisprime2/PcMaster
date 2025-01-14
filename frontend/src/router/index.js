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
import Configurator from "@/components/Configurator.vue";
import PrivacyPolicy from "@/components/PrivacyPolicy.vue";
import Copyright from "@/components/Copyright.vue";
import Checkout from "@/components/Checkout.vue";
import OrderDashboardView from "@/views/OrderDashboardView.vue";

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
            meta: { requiresAdmin: true },
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
            meta: { requiresAdmin: true }
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
        },{
            path: '/config',
            name: 'configurator',
            component: Configurator,
            meta: { requiresAuth: true }
        },
        {
            path: '/privacy',
            name: 'privacy',
            component: PrivacyPolicy,
            meta: { requiresAuth: false }
        },
        {
            path: '/copyright',
            name: 'copyright',
            component: Copyright,
            meta: { requiresAuth: false }
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: Checkout,
            meta: { requiresAuth: false }
        },{
            path: '/admin/order',
            name: 'admin-order',
            component: OrderDashboardView,
            meta: { requiresAuth: false }
        },
    ],
})

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();

    // Wait for auth to initialize if it hasn't already
    if (!authStore.isInitialized) {
        await authStore.initializeAuth();
    }
    // Handle routes requiring admin access
    if (to.meta.requiresAdmin && (!authStore.isAuthenticated || authStore.user?.role !== 1)) {
        next('/'); // Redirect to home if not admin
        return;
    }

    // Handle routes requiring authentication
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/login');
        return;
    }

    // Handle routes requiring guest access (optional)
    if (to.meta.requiresGuest && authStore.isAuthenticated) {
        next('/');
        return;
    }

    next();
});
export default router
