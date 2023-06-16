import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "walterio-funes.firebaseapp.com",
    projectId: "walterio-funes",
    storageBucket: "walterio-funes.appspot.com",
    messagingSenderId: "458110689075",
    appId: "1:458110689075:web:e991ddcb9e9b7a06bda846"
  
  /* Original por Samuelito
  apiKey: "AIzaSyAKqlFcAWy5VaTyY8T2_8WVQ8p29V2n9c0",
  authDomain: "tienda-supermercado.firebaseapp.com",
  projectId: "tienda-supermercado",
  storageBucket: "tienda-supermercado.appspot.com",
  messagingSenderId: "723164346165",
  appId: "1:723164346165:web:59d5dd3618d73054f4be7c"
  */
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);