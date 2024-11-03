// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgnM8HkLrSttTkdY0ju8QWt49mj6dGoF4",
  authDomain: "spotoolfy.firebaseapp.com",
  projectId: "spotoolfy",
  storageBucket: "spotoolfy.firebasestorage.app",
  messagingSenderId: "403346297857",
  appId: "1:403346297857:web:849d2bdb3b59f77c7e1c00",
  measurementId: "G-8MD31NR3LE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);