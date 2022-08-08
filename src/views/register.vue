<template>
    <div>
        <h2>Register</h2>
        <form @submit.prevent="handleSubmit">
            
            <input type="email" id="iEmal" name="iEmail" placeholder="Email" v-model.trim="email"><br>
            
            <input type="password" id="iPassword" name="iPassword" placeholder="Ingrese Contraseña"
                v-model.trim="password"><br>
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

const email = ref()
const password = ref()

const handleSubmit = async () => {

    if (!email.value || password.value.length < 6) {
        return alert('llena los campos')
    }

    await useStore.registerUser(email.value, password.value)
    
}

</script>

