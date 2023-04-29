// import Vue from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('../src/views/SingInPage.vue'),
        props: true,
    },
    {
        path: '/MainPage',
        name: 'MainPage',
        component: () => import('../src/views/MainPage.vue'),
        props: true,
    },
    {
        path: '/RegisterPage',
        component: () => import('../src/views/RegisterPage.vue'),
        props: true,
    },
    {
        path: '/ProfilePage',
        component: () => import('../src/views/ProfilePage.vue'),
        props: true,
    },
    {
        path: '/BasketPage',
        component: () => import('../src/views/BasketPage.vue'),
        props: true,
    },
    {
        path: '/LocationPage',
        component: () => import('../src/views/LocationPage.vue'),
        props: true,
    },
    {
        path: '/MenuPage',
        component: () => import('../src/views/MenuPage.vue'),
        props: true,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router