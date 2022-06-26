import {createRouter, createWebHistory,} from 'vue-router'

import Home from './views/home.vue'
import Login from './views/login.vue'
import Register from './views/register.vue'

const routes = [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/register', component: Register}
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;