<template>
    <div class="cBoxProyect">
        <h1>Hello {{userStore.userData.email}}</h1>

        <div class="cProyect">
            <img :src="userStore.iconProyect" alt="">
        </div>
    </div>
</template>

<script setup>

import { useUserStore } from '../stores/user';

const userStore = useUserStore()

</script>

<style scoped>

.cBoxProyect{
    margin: 2rem;
    padding: 2rem;
    background-color: grey;
    border-radius: 2rem;
    min-height: 50vh;
}

.cProyect{
    margin: 2rem;
    cursor: pointer;
}

.cProyect img{
    width: 5%;
}

</style>