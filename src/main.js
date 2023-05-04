import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDfSbmIV77tD2ZYQ4hlpRZhhFbneSEamHg",
  authDomain: "stolovka-app.firebaseapp.com",
  projectId: "stolovka-app",
  storageBucket: "stolovka-app.appspot.com",
  messagingSenderId: "736907800776",
  appId: "1:736907800776:web:bf7b87c51c163e574875fd"
};

// Initialize Firebase
const dbapp = initializeApp(firebaseConfig);
getStorage(dbapp);
createApp(App).use(router).mount('#app')
