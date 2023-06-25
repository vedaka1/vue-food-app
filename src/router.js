// import Vue from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from './main';
import { doc, getDoc } from 'firebase/firestore';


const routes = [
    {
        path: '/SignInPage',
        component: () => import('../src/views/SignInPage.vue'),
        props: true,
        meta: {
            requiresAuth: false,
            requiresAdmin: false,
          },
    },
    {
        path: '/',
        name: 'MainPage',
        component: () => import('../src/views/MainPage.vue'),
        props: true,
        meta: {
            requiresAuth: true,
            requiresAdmin: false,
          },
    },
    {
        path: '/RegisterPage',
        component: () => import('../src/views/RegisterPage.vue'),
        props: true,
        meta: {
            requiresAuth: false,
            requiresAdmin: false,
          },
    },
    {
        path: '/ProfilePage',
        component: () => import('../src/views/ProfilePage.vue'),
        props: true,
        meta: {
            requiresAuth: true,
            requiresAdmin: false,
          },
    },
    {
        path: '/BasketPage',
        component: () => import('../src/views/BasketPage.vue'),
        props: true,
        meta: {
            requiresAuth: true,
            requiresAdmin: false,
          },
    },
    {
        path: '/SpendingsPage',
        component: () => import('../src/views/SpendingsPage.vue'),
        props: true,
        meta: {
            requiresAuth: true,
            requiresAdmin: false,
          },
    },
    {
        path: '/:id',
        name: 'menu',
        component: () => import('../src/views/MenuPage.vue'),
        props: true,
        meta: {
            requiresAuth: true,
            requiresAdmin: false,
          },
    },
    {
        path: '/:id/:food_id',
        name: 'food',
        component: () => import('../src/views/FoodPage.vue'),
        props: true,
        meta: {
            requiresAuth: true,
            requiresAdmin: false,
          },
    },
    {
        path: '/:id/:food_id/NewReview',
        name: 'review',
        component: () => import('../src/views/NewReview.vue'),
        props: true,
        meta: {
            requiresAuth: true,
            requiresAdmin: false,
          },
    },
    {
        path: '/NewBuilding',
        name: 'new_building',
        component: () => import('../src/views/NewBuilding.vue'),
        props: true,
        meta: {
            requiresAuth: true,
            requiresAdmin: true,
          },
    },
    {
        path: '/:id/NewDish',
        name: 'new_dish',
        component: () => import('../src/views/NewDish.vue'),
        props: true,
        meta: {
            requiresAuth: true,
            requiresAdmin: true,
          },
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);   
            },
            reject
        );
    });
};

const getUserRole = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            async (user) => {
                removeListener();
                let snapshot = await getDoc(doc(db, 'users', user.uid));
                resolve(snapshot.data().role)
            },
            reject
        );    
    })
};

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);
    const isAuthenticated = await getCurrentUser();
    if (isAuthenticated) {
        const isAdmin = await getUserRole();
        if (requiresAdmin && isAdmin != 'admin') {
            router.go(-1)
        }
    }
    if (requiresAuth && !isAuthenticated) {
        next("/SignInPage");
    } else if (
        (to.path === "/SignInPage" || to.path === "/RegisterPage") &&
        isAuthenticated
    ) {
        next("/");
    } else {
        next();
    }
});

export default router