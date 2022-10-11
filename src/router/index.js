import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
    },
    {
        path: '/prestamos',
        name: 'prestamos',
        component: () =>
            import(
                /* webpackChunkName: "prestamos" */ '../views/PrestamosView.vue'
            ),
    },
    {
        path: '/admin',
        name: 'admin',
        meta: { requiresAuth: true },
        component: () =>
            import(/* webpackChunkName: "admin" */ '../views/AdminView.vue'),
    },
    {
        path: '/:idSection',
        name: 'section',
        component: () =>
            import(
                /* webpackChunkName: "section" */ '../views/SectionView.vue'
            ),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

const isAuthenticatedGuard = () => {
    if (store.state.authState === 'authenticated') return true;
    return false;
};

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticatedGuard()) {
        return next('/login');
    } else {
        return next();
    }
});

export default router;
