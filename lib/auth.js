import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { createUserIfNotExists } from "./firestore";

export const auth = getAuth();
const provider = new GoogleAuthProvider();

export const loginWithEmail = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  await createUserIfNotExists(userCredential.user);
  return userCredential.user;
};

export const signupWithEmail = async (email, password, name) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  if (name) {
    await updateProfile(userCredential.user, { displayName: name });
  }
  await createUserIfNotExists(userCredential.user);
  return userCredential.user;
};

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  await createUserIfNotExists(result.user);
  return result.user;
};
