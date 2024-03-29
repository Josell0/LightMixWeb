import {createRouter, createWebHistory,} from 'vue-router';
import {useUserStore} from './stores/user'

import Home from './views/home.vue'
import userHome from './views/userHome.vue'
import Login from './views/login.vue'
import Register from './views/register.vue'
import Project from './views/project.vue'

const requireAuth = async(to, from, next) => {
    const userStore = useUserStore();
    userStore.loadingSesion = true;
    const user = await userStore.currentUser()
    if(user){
        next();
    }else{
        next()
    }
    userStore.loadingSesion = false;
};

const routes = [
    {path: '/', component: Home},
    {path: '/:userHome', component: userHome, beforeEnter: requireAuth},
    {path: '/project/:pid', component: Project},
    {path: '/login', component: Login},
    {path: '/register', component: Register}
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;