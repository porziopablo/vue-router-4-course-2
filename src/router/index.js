import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';

function getRouteProps(route) {
    return {
        ...route.params,
        id: parseInt(route.params.id), 
    };
};

const routes = [
    { path: '/', name: 'Home', component: Home },
    {
        path: '/destination/:id/:slug',
        name: 'destination.show',
        component: () => import ('@/views/DestinationShow.vue'),
        props: getRouteProps,
    },
    {
        path: '/destination/:id/:slug/:experienceSlug',
        name: 'experience.show',
        component: () => import('@/views/ExperienceShow.vue'),
        props: getRouteProps,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'vue-school-active-link',
});

export default router;
