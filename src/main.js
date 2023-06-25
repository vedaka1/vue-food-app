import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDfSbmIV77tD2ZYQ4hlpRZhhFbneSEamHg",
  authDomain: "stolovka-app.firebaseapp.com",
  projectId: "stolovka-app",
  storageBucket: "stolovka-app.appspot.com",
  messagingSenderId: "736907800776",
  appId: "1:736907800776:web:bf7b87c51c163e574875fd"
};

if (localStorage.getItem('theme') == 'dark') {
    document.body.classList.add('dark-theme')
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseApp = getApp();
getStorage(firebaseApp, "gs://stolovka-app.appspot.com/");
createApp(App).use(router).mount('#app')
export const db = getFirestore(); 
export const auth = getAuth(app);
