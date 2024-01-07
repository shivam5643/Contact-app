// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1pou0pIpwo2h-H4979pn27A-zo0CaThc",
  authDomain: "vite-conatact-app.firebaseapp.com",
  projectId: "vite-conatact-app",
  storageBucket: "vite-conatact-app.appspot.com",
  messagingSenderId: "378546389158",
  appId: "1:378546389158:web:8411d5d87bea1fb28a3467"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db=getFirestore(app);