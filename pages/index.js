// pages/index.js

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { CheckCircle, BarChart3, Calendar, Users, Instagram, Linkedin, Twitter } from "lucide-react";


export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-indigo-100 flex flex-col">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-24 px-6">
        <motion.h1
          className="text-6xl font-extrabold text-indigo-700 tracking-tight flex-horizontal gap-4 flex items-center justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
                    DailyDo
        </motion.h1>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl">
          Your smart productivity companion. Manage tasks, track performance, and create estimates — all in one intuitive dashboard.
        </p>
        <div className="mt-8 flex justify-center gap-6">
          {/* Instagram */}
          <a 
            href="https://www.instagram.com/heydailydo/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <Instagram className="w-6 h-6" />
          </a>

          {/* LinkedIn */}
          <a 
            href="https://www.linkedin.com/company/heydailydo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <Linkedin className="w-6 h-6" />
          </a>

          {/* Twitter */}
          <a 
            href="https://twitter.com/heydailydo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <Twitter className="w-6 h-6" />
          </a>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-white py-20 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Why Choose DailyDo?
        </h2>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          <FeatureCard icon={<CheckCircle className="text-indigo-600 w-8 h-8" />} title="Effortless Task Management" description="Stay on top of daily productivity with a simple, powerful task system." />
          <FeatureCard icon={<BarChart3 className="text-indigo-600 w-8 h-8" />} title="Visual Performance Tracking" description="Measure progress with clear, insightful visuals and analytics." />
          <FeatureCard icon={<Calendar className="text-indigo-600 w-8 h-8" />} title="Estimate Time & Effort" description="Use built-in calculators to plan and allocate resources wisely." />
          <FeatureCard icon={<Users className="text-indigo-600 w-8 h-8" />} title="For Educators & Solopreneurs" description="Built with online educators, freelancers, and small teams in mind." />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-indigo-900 text-gray-300 py-8 px-6 text-center">
        <p>© {new Date().getFullYear()} DailyDo by BeyondUX. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-6 text-sm">
          <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          <Link href="mailto:ranjanuxd@gmail.com" className="hover:text-white">Contact</Link>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      className="bg-indigo-50 rounded-2xl shadow p-6 flex flex-col items-center text-center"
      whileHover={{ scale: 1.05 }}
    >
      {icon}
      <h3 className="mt-4 text-lg font-semibold text-gray-800">{title}</h3>
      <p className="mt-2 text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
}
