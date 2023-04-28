// import Vue from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('../src/views/SingInPage.vue'),
        props: true,
    },
    {
        path: '/mainPage',
        name: 'MainPage',
        component: () => import('../src/views/mainPage.vue'),
        props: true,
    },
    {
        path: '/RegisterPage',
        component: () => import('../src/views/RegisterPage.vue'),
        props: true,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router