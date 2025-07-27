// pages/signup.js

import { useState } from "react";
import { signup } from "../lib/auth"; // will define this soon
import { useRouter } from "next/router";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      router.push("/dashboard"); // redirect after successful signup
    } catch (err) {
      alert(err.message); // or show toast
    }
  };

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-4 w-80 mx-auto mt-10">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border"
        required
      />
      <button type="submit" className="bg-blue-600 text-white py-2 rounded">
        Sign Up
      </button>
    </form>
  );
}
