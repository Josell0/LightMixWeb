import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAk0bhbTLkCSwaukOHDb05T2aI3MuIosIo",
  authDomain: "lightmixweb.firebaseapp.com",
  projectId: "lightmixweb",
  storageBucket: "lightmixweb.appspot.com",
  messagingSenderId: "174360581683",
  appId: "1:174360581683:web:97c6f4f727b958b79cb546"
};


initializeApp(firebaseConfig);

const auth = getAuth()

export {auth}