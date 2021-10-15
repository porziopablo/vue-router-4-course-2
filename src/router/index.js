import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';

import sourceData from '@/data.json';

function getRouteProps(route) {
    return {
        ...route.params,
        id: parseInt(route.params.id), 
    };
};

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
    },
    {
        path: '/protected',
        name: 'protected',
        component: () => import('@/views/Protected.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/destination/:id/:slug',
        name: 'destination.show',
        component: () => import ('@/views/DestinationShow.vue'),
        props: getRouteProps,
        beforeEnter(to) {
            const exists = sourceData.destinations.find(
                destination => destination.id === parseInt(to.params.id)
            );

            if (!exists) return {
                name: 'NotFound',
                params: { pathMatch: to.path.split('/').slice(1) },
                query: to.query,
                hash: to.hash,
            };
        },
        children: [
            {
                path: ':experienceSlug',
                name: 'experience.show',
                component: () => import('@/views/ExperienceShow.vue'),
                props: getRouteProps,
            },
        ],
    },
];

function scrollBehavior(to, from, savedPosition) {
    function waitUntilTransitionEnds(resolve) {
        setTimeout(() => resolve({ top: 0, behaviour: 'smooth' }), 300);
    }; 

    return savedPosition || new Promise(waitUntilTransitionEnds);
};

function checkIfRequiresAuth(to) {
    if (to.meta.requiresAuth && !window.user) {
        return { name: 'login' };
    }
};

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'vue-school-active-link',
    scrollBehavior,
});

router.beforeEach(checkIfRequiresAuth);

export default router;
