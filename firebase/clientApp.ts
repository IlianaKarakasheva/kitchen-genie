import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

initializeApp({
  apiKey: "AIzaSyBPYH12puRj-gIOA5HvEZq8wN4ljP_f22Y",
  authDomain: "kitchengenie-fe11b.firebaseapp.com",
  projectId: "kitchengenie-fe11b",
  storageBucket: "kitchengenie-fe11b.appspot.com",
  messagingSenderId: "1052979622894",
  appId: "1:1052979622894:web:399785216d437ad72854ff",
});

const firestore = getFirestore();
const storage = getStorage();
const auth = getAuth();

export { firestore, storage, auth };
