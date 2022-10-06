import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

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

export default router;
