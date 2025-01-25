import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue'
import LandingPage from "@/views/LandingPageView.vue"
import Register from "@/views/RegisterView.vue"
import Inquiries from "@/views/InqiuriesView.vue"
import ArticleDashboardView from "@/views/ArticleDashboardView.vue"
import ShoppingCart from "@/views/ShoppingCartView.vue"
import ArticleView from "@/views/ArticleView.vue"
import { useAuthStore } from '@/store/auth'
import Configurator from "@/views/ConfiguratorView.vue";
import PrivacyPolicy from "@/views/PrivacyPolicyView.vue";
import Copyright from "@/views/CopyrightView.vue";
import Checkout from "@/views/CheckoutView.vue";
import OrderDashboardView from "@/views/OrderDashboardView.vue";
import UserProfilView from "@/views/UserProfilView.vue";
import OrderSuccess from "@/views/OrderSuccessView.vue";
import ForgotPassword from "@/views/ForgotPasswordView.vue";
import Contact from "@/views/ContactView.vue";
import UserDashboardView from "@/views/UserDashboardView.vue";

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
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
        }, {
            path: '/forgot-password',
            name: 'forgot-password',
            component: ForgotPassword,
        },
        {
            path: '/admin/user',
            name: 'admin-user',
            component: UserDashboardView,
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
            meta: { requiresAuth: true }
        },{
            path: '/admin/orders',
            name: 'admin-order',
            component: OrderDashboardView,
            meta: { requiresAdmin: true }
        },{
            path: '/profil',
            name: 'user-profil',
            component: UserProfilView,
            meta: { requiresAuth: true }
        },{
            path: '/order-success',
            name: 'order-success',
            component: OrderSuccess,
            meta: { requiresAuth: true }
        },{
            path: '/contact',
            name: 'contact',
            component: Contact,
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
