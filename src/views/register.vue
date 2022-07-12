<template>
    <div>
        <h2>Register</h2>
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="Ingrese Email" v-model.trim="email">
            <input type="password" placeholder="Ingrese Contraseña" v-model.trim="password">
            <button type="submit" :disabled="useStore.loadingUser">Crear Usuario</button>
        </form>
    </div>
</template>

<script setup>

import { ref } from 'vue';
import { useUserStore } from '../stores/user';
//import { useRouter } from 'vue-router';



const useStore = useUserStore()
//const router = useRouter()

const email = ref('pupi@michi.com')
const password = ref('blueblue')

const handleSubmit = async() => {

    if (!email.value || password.value.length < 6) {
        return alert('llena los campos')
    }

    await useStore.registerUser(email.value, password.value)
    //router.push('/')
}

</script>

