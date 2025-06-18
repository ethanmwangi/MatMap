// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import getFirestore
 import { getAuth } from "firebase/auth"; // Import getAuth
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCU0gt5LCjca3XyENvzSAuACwbR2WcRMQA",
  authDomain: "matmap-cd8d1.firebaseapp.com",
  projectId: "matmap-cd8d1",
  storageBucket: "matmap-cd8d1.firebasestorage.app",
  messagingSenderId: "203514445154",
  appId: "1:203514445154:web:7b5238ba096a45c21e003b",
  measurementId: "G-X7N0WYRK9P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);