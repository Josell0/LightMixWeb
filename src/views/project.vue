<template>
    <div>
        <h1>Project View</h1>


    </div>
</template>

<script setup>


import { async } from "@firebase/util";
import { collection, doc, getDoc } from "firebase/firestore";
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {useDataProjectStore} from '../stores/dataProject';
import { db } from '../firebaseConfig';

import 'firebase/firestore';


const dataBaseProject = useDataProjectStore()

const route = useRoute()







onMounted(async()=>{

    console.log(route.params.pid)
    
    const path = ref(route.params.pid)
    
    
    dataBaseProject.getProjectLayers(route.params.pid)


});


</script>