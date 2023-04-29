// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfSbmIV77tD2ZYQ4hlpRZhhFbneSEamHg",
  authDomain: "stolovka-app.firebaseapp.com",
  projectId: "stolovka-app",
  storageBucket: "stolovka-app.appspot.com",
  messagingSenderId: "736907800776",
  appId: "1:736907800776:web:bf7b87c51c163e574875fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = app.firestore();