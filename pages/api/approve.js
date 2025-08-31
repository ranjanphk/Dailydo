import { adminDb } from "../../lib/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id, status } = req.body; // id of the Firestore doc, status = "approved" | "rejected"

  try {
    await adminDb.collection("invites").doc(id).update({
      status,
      updatedAt: new Date(),
    });

    res.status(200).json({ success: true, message: `Invite ${status}` });
  } catch (error) {
    console.error("Approve Invite Error:", error);
    res.status(500).json({ error: "Failed to update invite" });
  }
}
