import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "careernex-8c9ed.firebaseapp.com",
  projectId: "careernex-8c9ed",
  storageBucket: "careernex-8c9ed.firebasestorage.app",
  messagingSenderId: "494185261174",
  appId: "1:494185261174:web:cab920efbfe5ff45561757"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider};