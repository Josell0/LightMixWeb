<template>
  <div>
    <nav>
      <div class="navLogo">
        <router-link to="/"><span class="cLight">lightmix</span><span class="cWeb">WEB</span></router-link>
      </div>
      <div class="navButtons" v-if="!useStore.loadingSesion">
        <div v-if="!useStore.userData">
          <router-link to="/login" >Login</router-link>
          <span>|</span>

        </div>
        
        <router-link to="/register" v-if="!useStore.userData">Register</router-link>
        <button @click="useStore.logOutUser" v-if="useStore.userData">Logout</button>

      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>

import {useUserStore} from './stores/user'

const useStore = useUserStore()


</script>



<style >

*{
    margin: 0;
    padding: 0;
}

nav {
  font-family: sans-serif;
  display: inline-flex;
  
  width: 100%;
 

}


nav a {
  text-decoration: none;
  font-weight: bold;
}

nav .navLogo{
  padding-top: 1rem;
  padding-left: 1rem;
}

nav .navLogo a {

  font-size: 2em;
}

nav .navLogo a .cWeb {
  font-weight: 600;
  color: rgb(255, 255, 255);
  text-transform: capitalize;
  background: linear-gradient(-45deg, #eeaa52, #e73c6f, #2394d5, #2af3b7);
  background-size: 200%, 200%;
  -webkit-background-clip: text;
  -webkit-text-stroke: 4px transparent;
  animation: gradient 5s ease infinite;
  opacity: 50%;

}

nav .navLogo a .cLight {
  color: rgb(250, 250, 250);
  letter-spacing: 2px;
  text-shadow: 2px 2px 2px rgb(32, 32, 32), -2px -2px 2px rgb(32, 32, 32);
  opacity: 50%;

}



@keyframes gradient {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

nav .navButtons{
  width: 100%;
  padding-top: 1rem;
  padding-right: 1rem;
 display: flex;
 justify-content: right;
 align-items: center;
}


nav .navButtons a, nav .navButtons button {
  
  padding-right: .5rem;
  padding-left: .5rem;
  color: red;
  
}

</style>

