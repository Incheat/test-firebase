import './assets/main.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const firebaseConfig = {
    apiKey: "AIzaSyA3UlXycsTI2SOyU5D87Yv7-BpXA2USNPM",
    authDomain: "alan-host-project.firebaseapp.com",
    projectId: "alan-host-project",
    storageBucket: "alan-host-project.appspot.com",
    messagingSenderId: "509964097557",
    appId: "1:509964097557:web:e07bf26762bc1a4f93161c",
    measurementId: "G-9RYTJ63777"
  };
  

const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
