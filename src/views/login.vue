<template>
    <div class="cBoxLogin">
        <h2>Login</h2>
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="Ingrese Email" v-model.trim="email">
            <input type="password" placeholder="Ingrese Contraseña" v-model.trim="password">
            <button type="submit" :disabled="userStore.loadingUser">Log In</button>
        </form>
    </div>
</template>

<script setup>

import { ref } from 'vue';
import { useUserStore } from '../stores/user';
//import { useRouter } from 'vue-router';



const userStore = useUserStore()
//const router = useRouter()

const email = ref('pupi@blue.com')
const password = ref('michimichi')

const handleSubmit = async () => {

    if (!email.value || password.value.length < 6) {
        return alert('llena los campos')
    }

    await userStore.loginUser(email.value, password.value)
    //router.push('/')
}

</script>

<style>

.cBoxLogin {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: aquamarine;
}


</style>

