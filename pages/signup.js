// pages/signup.js
import { useState } from "react";
import { useRouter } from "next/router";
import { signupWithEmail, loginWithGoogle } from "../lib/auth";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signupWithEmail(email, password, name);
      router.push("/"); // ✅ redirect after signup
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle();
      router.push("/"); // ✅ redirect after google signup
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
        DailyDo
      </h1>

      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-8 max-w-md w-full">
        <button
          onClick={() => router.back()}
          className="mb-4 text-indigo-600 hover:underline text-sm"
        >
          ← Back
        </button>

        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Sign Up
        </h2>

        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-100 dark:border-gray-800 border border-gray-100 dark:border-gray-800-gray-200 border border-gray-100 dark:border-gray-800 border border-gray-100 dark:border-gray-800-gray-200-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            placeholder="Your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-100 dark:border-gray-800 border border-gray-100 dark:border-gray-800-gray-200 border border-gray-100 dark:border-gray-800 border border-gray-100 dark:border-gray-800-gray-200-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Your password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-100 dark:border-gray-800 border border-gray-100 dark:border-gray-800-gray-200 border border-gray-100 dark:border-gray-800 border border-gray-100 dark:border-gray-800-gray-200-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500 dark:text-gray-100 mb-2">Or continue with</p>
          <button
            onClick={handleGoogleSignup}
            className="w-full border border-gray-100 dark:border-gray-800 border border-gray-100 dark:border-gray-800-gray-200 border border-gray-100 dark:border-gray-800 border border-gray-100 dark:border-gray-800-gray-200-gray-300 py-2 rounded-md hover:bg-gray-50 transition"
          >
            Google
          </button>
        </div>
      </div>
    </div>
  );
}
