<template>
  <div class="cBodyApp">
    <nav class="cNav">
      <div class="navLogo">
        <router-link to="/"><span class="cLight">lightmix</span><span class="cWeb">WEB</span></router-link>
      </div>
      <p class="cNavUser">{{userStore.userData?.email}}</p>
      <div class="navButtons" v-if="!userStore.loadingSesion">
        <div v-if="!userStore.userData">
          <router-link to="/login">Login</router-link>

          <span>|</span>

          <router-link to="/register" v-if="!userStore.userData">Register</router-link>
        </div>

        <router-link to="/userHome" v-if="userStore.userData">My Proyect</router-link>
        <span>|</span>
        <button @click="userStore.logOutUser" v-if="userStore.userData">Logout</button>

      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>

import { useUserStore } from './stores/user'

const userStore = useUserStore()


</script>



<style >
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.cBodyApp{
  width: 100%;
}

nav {
  width: 100%;
  display: flex;
  font-family: sans-serif;
  
  position: absolute;
  z-index: 1000;


}


nav a {
  text-decoration: none;
  font-weight: bold;
}

nav .navLogo {
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

nav .navButtons {
  display: flex;
  position: absolute;
  padding-top: 1rem;
  padding-right: 1rem;
  right: 0%;
  
  
  
  
  
}


nav .navButtons a,
nav .navButtons button,
nav .navButtons span {

  padding-right: .5rem;
  padding-left: .5rem;
  color: rgba(0, 0, 0, 0.1);

}

nav .navButtons button {
  background-color: transparent;
  border: none;
  font-family: sans-serif;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

nav .navButtons a:hover,
nav .navButtons button:hover {
  color: red;


}

@media screen and (max-width: 450px) {
  .cNav {
    display: none;
    visibility: hidden;
  }
}




</style>

