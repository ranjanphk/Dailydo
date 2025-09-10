import { useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function Migrate() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const migrateOrders = async () => {
      const snap = await getDocs(collection(db, "tasks"));
      const batch = writeBatch(db);

      let index = 0;
      snap.forEach((d) => {
        const data = d.data();
        if (data.userId === user.uid) {
          const ref = doc(db, "tasks", d.id);
          batch.update(ref, { order: index });
          index++;
        }
      });

      if (index > 0) {
        await batch.commit();
        console.log(`✅ Migration done: set order for ${index} tasks`);
      } else {
        console.log("ℹ️ No tasks found for this user");
      }
    };

    migrateOrders();
  }, [user]);

  return <div className="p-10">Running migration... check console logs</div>;
}
