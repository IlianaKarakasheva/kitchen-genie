import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

initializeApp({
    // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    apiKey: "AIzaSyBPYH12puRj-gIOA5HvEZq8wN4ljP_f22Y",
    authDomain: "kitchengenie-fe11b.firebaseapp.com",
    projectId: "kitchengenie-fe11b",
    storageBucket: "kitchengenie-fe11b.appspot.com",
    messagingSenderId: "1052979622894",
    appId: "1:1052979622894:web:399785216d437ad72854ff"
  
});

const firestore = getFirestore();
const storage = getStorage();

export { firestore, storage};
