import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "@firebase/firestore"
//Permisos
const firebaseConfig = {
  apiKey: "AIzaSyADAxX_LjCSjRdfoh4zAs9tGpmu0JRvwBw",
  authDomain: "veterinaria-9798f.firebaseapp.com",
  projectId: "veterinaria-9798f",
  storageBucket: "veterinaria-9798f.appspot.com",
  messagingSenderId: "165560722575",
  appId: "1:165560722575:web:f0839c7b2e4fe537f47cfa"
};

// Inicializo Firebase
const app = initializeApp(firebaseConfig);
// Inicializo Firebase Authentication
export const auth = getAuth(app);
//Inicializo Firebase Firestore
export const db = getFirestore(app);