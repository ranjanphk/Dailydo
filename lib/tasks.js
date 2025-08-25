// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { db } from "./firebase";

// export async function createTask(userId, data) {
//   return addDoc(collection(db, "tasks"), {
//     ...data,
//     userId,
//     status: "open",
//     createdAt: serverTimestamp(),
//     updatedAt: serverTimestamp(),
//   });
// }


import { collection, getDocs } from "firebase/firestore";

async function getTasks(userId) {
  const snapshot = await getDocs(collection(db, "users", userId, "tasks"));
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : null,
    };
  });
}
