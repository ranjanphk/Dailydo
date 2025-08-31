// pages/admin/invites.js
import { useEffect, useState } from "react";
import { db } from "../../lib/firebaseClient"; // client SDK
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function InvitesPage() {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvites = async () => {
      const snapshot = await getDocs(collection(db, "invites"));
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setInvites(list);
      setLoading(false);
    };
    fetchInvites();
  }, []);

  const approveInvite = async (id) => {
    try {
      await updateDoc(doc(db, "invites", id), { status: "approved" });
      setInvites((prev) =>
        prev.map((invite) =>
          invite.id === id ? { ...invite, status: "approved" } : invite
        )
      );
    } catch (err) {
      console.error("Error approving invite:", err);
    }
  };

  if (loading) return <p className="p-8">Loading invites...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Invites</h1>
      {invites.length === 0 ? (
        <p>No invites yet.</p>
      ) : (
        <ul className="space-y-4">
          {invites.map((invite) => (
            <li
              key={invite.id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow"
            >
              <div>
                <p className="font-medium">{invite.email}</p>
                <p className="text-sm text-gray-600">
                  Status: {invite.status || "pending"}
                </p>
              </div>
              {invite.status !== "approved" && (
                <button
                  onClick={() => approveInvite(invite.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                >
                  Approve
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
