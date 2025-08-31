import { useState } from "react";
import { useRouter } from "next/router";

export default function RequestInvitePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const r = await fetch("/api/request-invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Failed to request invite");

      setSent(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-indigo-50 px-4 flex-col gap-8">
      <h1
        className="text-5xl font-extrabold text-indigo-700 cursor-pointer"
        onClick={() => router.push("/")}
      >
        Heymate
      </h1>

      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <button
          onClick={() => router.back()}
          className="mb-4 text-indigo-600 hover:underline text-sm"
        >
          ← Back
        </button>

        {!sent ? (
          <>
            <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
              Request an Invite
            </h2>
            {error && (
              <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
            )}

            <form onSubmit={submit} className="space-y-4">
              <input
                type="text"
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="email"
                placeholder="Your email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Request Invite
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
              Request sent ✅
            </h2>
            <p className="text-gray-600">
              Your request has been submitted. An admin will review it soon.
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-6 px-6 py-2 border rounded-lg text-indigo-600"
            >
              Go Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
// signup.js --- IGNORE ---