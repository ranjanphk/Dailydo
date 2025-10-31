const admin = require("firebase-admin");
const XLSX = require("xlsx");
const fs = require("fs");
const serviceAccount = require("./firebase-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function exportEmails() {
  const snapshot = await db.collection("users").get(); // change collection name if needed
  const data = [];

  snapshot.forEach((doc) => {
    const user = doc.data();
    data.push({
      Email: user.email || "",
      Name: user.name || "",
      CreatedAt: user.createdAt
        ? new Date(user.createdAt._seconds * 1000).toLocaleString()
        : "",
    });
  });

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

  XLSX.writeFile(workbook, "users_emails.xlsx");
  console.log("✅ Export completed: users_emails.xlsx");
}

exportEmails();
