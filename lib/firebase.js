// lib/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAd7Hr6nXfaUIoBkVCy7Pw_L7XqOwRTjdQ",
  authDomain: "heymate-33dae.firebaseapp.com",
  projectId: "heymate-33dae",
  storageBucket: "heymate-33dae.appspot.com", // 🔧 Fixed incorrect `.firebasestorage.app`
  messagingSenderId: "609126387970",
  appId: "1:609126387970:web:0c51f1a1e1dc98b186721b",
  measurementId: "G-EGZECTH8N1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
export const db = getFirestore(app);
