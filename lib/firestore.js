// lib/firestore.js
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase'; // make sure firebase.js exports db

export const createUserIfNotExists = async (user) => {
  if (!user || !user.uid) return;

  const userRef = doc(db, 'users', user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || '',
      createdAt: new Date().toISOString(),
    });
  }
};
