// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "blogapp-21b59.firebaseapp.com",
  projectId: "blogapp-21b59",
  storageBucket: "blogapp-21b59.appspot.com",
  messagingSenderId: "401929966183",
  appId: "1:401929966183:web:54a0d5388f09f405c3fac2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);