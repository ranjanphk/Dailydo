// pages/index.js

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-indigo-100 flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl font-extrabold text-indigo-700 tracking-tight">
        Heymate
      </h1>
      <p className="mt-4 text-lg text-gray-600 max-w-xl">
        Your smart productivity companion. Manage tasks, track performance, and create estimates — all in one intuitive dashboard.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {user ? (
          <Link href="/dashboard">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
              Go to Dashboard
            </button>
          </Link>
        ) : (
          <>
            <Link href="/signup">
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
                Get Started Free
              </button>
            </Link>
            <Link href="/login">
              <button className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition">
                Login
              </button>
            </Link>
          </>
        )}
      </div>

      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Why Choose Heymate?
        </h2>
        <ul className="text-gray-600 space-y-2 text-left sm:text-center">
          <li>📌 Effortless task management for daily productivity</li>
          <li>📊 Visual performance tracking to measure progress</li>
          <li>📅 Estimate time & effort with built-in calculators</li>
          <li>🎯 Built for online educators, freelancers & solopreneurs</li>
        </ul>
      </section>

      <footer className="mt-24 text-gray-400 text-sm">
        © {new Date().getFullYear()} Heymate by Hoping Mind. All rights reserved.
      </footer>
    </div>
  );
}
