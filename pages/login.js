import { use, useState } from 'react';
import { useRouter } from 'next/router';
import { loginWithEmail, loginWithGoogle } from '../lib/auth'; // adjust your auth imports
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setTheme } = useTheme();

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await loginWithEmail(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    setTheme('light'); // force light mode
  }, [setTheme]);

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await loginWithGoogle();
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-indigo-50 px-4 py-50 flex-col gap-7">
      <motion.h1
        className="text-6xl font-extrabold text-indigo-700 tracking-tight cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => router.push('/')}
      >
        DailyDo
      </motion.h1>

      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-8 max-w-md w-full">
        <button onClick={() => router.back()} className="mb-4 text-indigo-600 hover:underline text-sm">
          ← Back
        </button>

        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Welcome Back</h2>

        {error && <div className="mb-4 text-red-600 text-sm text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full dark:border-gray-800-gray-200 dark:border-gray-800 border border-gray-100 dark:border-gray-800-gray-200-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full dark:border-gray-800-gray-200 dark:border-gray-800 border border-gray-100 dark:border-gray-800-gray-200-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="flex justify-end text-sm">
            <a href="#" className="text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="text-gray-400">or</span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition flex items-center justify-center gap-2"
        >
          <lucide-google size={16} />
          Login with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Don’t have an account?{' '}
          <a href="/signup" className="text-indigo-600 hover:underline font-medium">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
