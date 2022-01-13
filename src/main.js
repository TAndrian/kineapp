import { createApp } from "vue";
import App from "./App.vue";
import "./assets/general.css";
import router from "./router";
import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyC51TLBu1b_5zkipu_RY4ig3iV0U6ZUAEE",
  authDomain: "kineapp-bd34f.firebaseapp.com",
  projectId: "kineapp-bd34f",
  storageBucket: "kineapp-bd34f.appspot.com",
  messagingSenderId: "453827417711",
  appId: "1:453827417711:web:7d21baf8150188f9685f9a",
};

export const db = firebase.initializeApp(firebaseConfig).firestore();

createApp(App).use(router).mount("#app");
