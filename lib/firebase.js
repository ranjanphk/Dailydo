// lib/firebase.js

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Optional: import analytics if you need it in future
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAd7Hr6nXfaUIoBkVCy7Pw_L7XqOwRTjdQ",
  authDomain: "heymate-33dae.firebaseapp.com",
  projectId: "heymate-33dae",
  storageBucket: "heymate-33dae.appspot.com", // 🔧 Fixed incorrect `.firebasestorage.app`
  messagingSenderId: "609126387970",
  appId: "1:609126387970:web:0c51f1a1e1dc98b186721b",
  measurementId: "G-EGZECTH8N1"
};

// Only initialize once (important in dev with Fast Refresh)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
// Optional: const analytics = getAnalytics(app);

export { auth, db };
