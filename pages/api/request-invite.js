// /pages/api/request-invite.js
import { adminDb } from "../../lib/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    await adminDb.collection("invites").add({
      email,
      name: name || "",
      status: "pending",
      createdAt: new Date(),
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Request Invite Error:", error);
    res.status(500).json({ error: "Failed to save invite request" });
  }
}
