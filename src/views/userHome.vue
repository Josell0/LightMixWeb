<template>
    <div class="cBoxUserHome">

        <div class="cBoxProyect">

            <div class="cProyectUser">
                <h1>Hello {{userStore.userData.email}}</h1>

                <hr>
            </div>
            <p v-if="dataBaseStore.loadingLayers">Loading Layers...</p>
            <div class="cProyectLayersUploaded" v-else>

                <div class="cMainLayers">
                    <ul v-for="item of dataBaseStore.documents.mainLayers">
                        <li>{{item.name}}</li>
                    </ul>
                </div>

                <div class="cSecondaryLayers">
                    <ul v-for="item of dataBaseStore.documents.secondaryLayers">
                        <li>{{item.name}}</li>
                    </ul>
                </div>

            </div>
            <hr>
            
            <div class="cProyectLayersUpload">

                <div class="cMainLayers">
                    <div>
                        <p>Main Layers</p>
                    </div>
                    <form @submit.prevent="handleMainSubmit">
                        <input type="text" placeholder="Introduce Layer's Name" v-model="layerMainName">
                        
                        <input type="file">
                        
                        <button type="submit" :disabled="userStore.loadingUser">Upload Layer</button>
                    </form>
                </div>

                <div class="cSecondaryLayers">

                    <div>
                        <p>Secondary Layers</p>
                    </div>
                    <form @submit.prevent="handleSecondarySubmit">
                        <input type="text" placeholder="Introduce Layer's Name" v-model="layerSecondaryName">
                        
                        <input type="file">
                        
                        <button type="submit" :disabled="userStore.loadingUser">Upload Layer</button>
                    </form>

                </div>

            </div>





        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue';
import { useUserStore } from '../stores/user';
import {useDataBaseStore} from '../stores/dataBase';

const userStore = useUserStore()
const dataBaseStore = useDataBaseStore()

dataBaseStore.getLayers()

const layerMainName = ref('')
const layerSecondaryName = ref('')

const handleMainSubmit = () => {
    
}
const handleSecondarySubmit = () => {
    
}


</script>

<style scoped>
.cBoxUserHome {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: aquamarine;
}

.cBoxProyect {
    width: 80%;

    margin: 2rem;
    padding: 2rem;
    background-color: grey;
    border-radius: 2rem;
    min-height: 50vh;
}

.cProyect {
    margin: 2rem;
    cursor: pointer;
}

.cProyect img {
    width: 5%;
}

.cProyectLayersUpload, .cProyectLayersUploaded{
    display: flex;
    margin-top: 2rem;
    margin-bottom: 2rem;
}

.cMainLayers, .cSecondaryLayers{
    width: 50%;
}

input, button{
    display: block;
    margin-top: 1rem;

}
</style>