import { useState } from "react";
import { login } from "../lib/auth";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/dashboard"); // Redirect after login
    } catch (err) {
      alert(err.message); // Show error message
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80 mx-auto mt-10">
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
      <button type="submit" className="bg-green-600 text-white py-2 rounded">
        Login
      </button>
    </form>
  );
}
