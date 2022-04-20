import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/Book',
        name: 'Home',
        component: () => import('../views/Home-comp.vue')
    },
    {
        path: '/Author',
        name: 'Author',
        component: () => import('../views/Author-comp.vue')
    },
    {
        path: '/Special',
        name: "Special",
        component: () => import('../views/Special-comp')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router