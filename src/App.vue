<template>
  <div class="cBodyApp">
    <nav class="cNav">
      <div class="navLogo">
        <router-link to="/">
          <Logo></Logo>
        </router-link>
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

import Logo from './components/Logo.vue'

const userStore = useUserStore()


</script>



<style >
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.cBodyApp {
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
  color: rgb(0, 0, 0);

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

