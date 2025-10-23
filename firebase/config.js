// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAd7Hr6nXfaUIoBkVCy7Pw_L7XqOwRTjdQ',
  authDomain: 'heymate-33dae.firebaseapp.com',
  projectId: 'heymate-33dae',
  storageBucket: 'heymate-33dae.firebasestorage.app',
  messagingSenderId: '609126387970',
  appId: '1:609126387970:web:0c51f1a1e1dc98b186721b',
  measurementId: 'G-EGZECTH8N1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
