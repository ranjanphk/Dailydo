// pages/index.js
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { CheckCircle, BarChart3, Calendar, Users } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex flex-col">
      {/* Hero Section */}
      <header className="relative flex flex-col items-center justify-center text-center py-28 px-6">
        {/* Background Glow */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 left-1/3 w-72 h-72 bg-indigo-300/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <motion.h1
          className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text leading-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          DailyDo <br className="leading-10" />
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-2 tracking-wider">v1.0</span>
        </motion.h1>

        <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed">
          The <span className="font-semibold text-indigo-600">smarter way</span> to manage tasks, track performance, and
          plan your time — all in one elegant dashboard.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {user ? (
            <Link href="/dashboard">
              <button className="px-8 py-4 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition font-medium">
                Go to Dashboard
              </button>
            </Link>
          ) : (
            <>
              <Link href="/signup">
                <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg hover:opacity-90 transition font-medium">
                  Get Started Free
                </button>
              </Link>
              <Link href="/login">
                <button className="px-8 py-4 border border-gray-300 bg-white/70 backdrop-blur-md text-indigo-700 rounded-xl hover:bg-white transition font-medium">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Social Media Icons */}
        <div className="mt-10 flex justify-center space-x-6">
          <a
            href="https://www.linkhttps://www.linkedin.com/company/heydailydo"
            className="p-3 rounded-full bg-gradient-to-tr from-blue-500 to-blue-600 text-white shadow-lg hover:scale-110 transition-transform"
          >
            <i className="fab fa-linkedin-in text-lg"></i>
          </a>
          <a
            href="https://www.instagram.com/heydailydo/"
            className="p-3 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 text-white shadow-lg hover:scale-110 transition-transform"
          >
            <i className="fab fa-instagram text-lg"></i>
          </a>
          <a
            href="https://x.com/heyDailyDo"
            className="p-3 rounded-full bg-gradient-to-tr from-sky-400 to-sky-600 text-white shadow-lg hover:scale-110 transition-transform"
          >
            <i className="fab fa-twitter text-lg"></i>
          </a>
        </div>
      </header>

      {/* Features */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-indigo-50">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-14">Why Choose DailyDo?</h2>
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          <FeatureCard
            icon={<CheckCircle className="text-indigo-600 w-8 h-8" />}
            title="Effortless Task Management"
            description="Stay on top of productivity with a simple yet powerful task system."
          />
          <FeatureCard
            icon={<BarChart3 className="text-indigo-600 w-8 h-8" />}
            title="Visual Performance Tracking"
            description="Measure progress with beautiful, insightful analytics dashboards."
          />
          <FeatureCard
            icon={<Calendar className="text-indigo-600 w-8 h-8" />}
            title="Estimate Time & Effort"
            description="Plan smarter with built-in calculators for resources and effort."
          />
          <FeatureCard
            icon={<Users className="text-indigo-600 w-8 h-8" />}
            title="Built for Solopreneurs"
            description="Perfect for online educators, freelancers, and small teams."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-gray-300 py-10 px-6 text-center">
        <p>© {new Date().getFullYear()} DailyDo by BeyondUX. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-8 text-sm">
          <Link href="/privacy">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          </Link>
          <Link href="/terms">
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </Link>
          <Link href="mailto:ranjanuxd@gmail.com">
            <span className="hover:text-white cursor-pointer">Contact</span>
          </Link>
          <Link href="/sale/page">
            <span className="hover:text-white cursor-pointer">Buy DailyDo</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100 hover:shadow-2xl transition"
      whileHover={{ y: -5, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <div className="p-4 bg-indigo-100 rounded-full">{icon}</div>
      <h3 className="mt-6 text-lg font-semibold text-gray-800">{title}</h3>
      <p className="mt-3 text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
}
