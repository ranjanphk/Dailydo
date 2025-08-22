import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function createTask(userId, data) {
  return addDoc(collection(db, "users", userId, "tasks"), {
    ...data,
    status: "open",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}
