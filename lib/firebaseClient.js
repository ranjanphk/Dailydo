// lib/firebaseClient.js
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAd7Hr6nXfaUIoBkVCy7Pw_L7XqOwRTjdQ',
  authDomain: 'heymate-33dae.firebaseapp.com',
  projectId: 'heymate-33dae',
  storageBucket: 'heymate-33dae.appspot.com', // 🔧 Fixed incorrect `.firebasestorage.app`
  messagingSenderId: '609126387970',
  appId: '1:609126387970:web:0c51f1a1e1dc98b186721b',
  measurementId: 'G-EGZECTH8N1',
};

// Prevent re-initialization during hot reloads
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
