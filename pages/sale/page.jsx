'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function SalePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black text-gray-800 dark:text-gray-100">
      {/* HERO SECTION */}

      <section className="text-center py-20 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          DailyDo — Fully Functional Productivity App for Sale
        </motion.h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          A complete task & performance management app with <strong>140 active global users</strong>. Includes full
          codebase, domain, and concept.
        </p>
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition"
        >
          Contact to Buy – $5,000 Offer
        </motion.a>
      </section>
      <section>
        <Image
          src="/screens/cover.png"
          alt="cover"
          width={1080}
          height={400}
          className="rounded-xl border border-gray-200 dark:border-gray-700 mx-auto"
        />
      </section>

      {/* OVERVIEW */}
      <section className="max-w-5xl mx-auto py-12 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">About DailyDo</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          DailyDo is an independent productivity platform for managing tasks, tracking performance, and boosting
          personal or team efficiency. Built with modern technologies and ready for immediate deployment.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <Image
            src="/screens/dashboard.png"
            alt="Dashboard"
            width={400}
            height={250}
            className="rounded-xl border border-gray-200 dark:border-gray-700"
          />
          <Image
            src="/screens/tasks.png"
            alt="Task List"
            width={400}
            height={250}
            className="rounded-xl border border-gray-200 dark:border-gray-700"
          />
          <Image
            src="/screens/overview.png"
            alt="Overview"
            width={400}
            height={250}
            className="rounded-xl border border-gray-200 dark:border-gray-700"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-4xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Key Features</h2>
        <ul className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
          <li>✅ Task creation, management & completion tracking</li>
          <li>📅 Daily and weekly productivity overview</li>
          <li>📈 Performance analytics dashboard</li>
          <li>🧩 Fully independent module (plug & play)</li>
          <li>🌍 140 active global users</li>
          <li>💻 Built with Next.js, React, Tailwind, Firebase</li>
        </ul>
      </section>

      {/* TRACTION */}
      <section className="bg-gray-100 dark:bg-gray-800 py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">User Traction</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          DailyDo currently serves <strong>140 users across 20+ countries</strong>, proving global appeal and consistent
          engagement.
        </p>
        <div className="flex justify-center items-center gap-2 flex-wrap">
          <Image
            src="/screens/analytics.png"
            alt="User Analytics"
            width={500}
            height={280}
            className="rounded-xl border border-gray-300 dark:border-gray-700"
          />
          <Image
            src="/screens/map.png"
            alt="Worldside Users"
            width={500}
            height={280}
            className="rounded-xl border border-gray-300 dark:border-gray-700"
          />
        </div>
      </section>

      {/* OFFER SECTION */}
      <section className="max-w-3xl mx-auto text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-4">Ownership Offer – $5,000</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Includes full source code, domain transfer, and 1-day post-sale setup support. Available for a{' '}
          <strong>48-hour limited sale</strong> – first come, first served.
        </p>
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          className="inline-block bg-green-600 text-white px-8 py-3 rounded-full font-medium hover:bg-green-700 transition"
        >
          Buy DailyDo Now
        </motion.a>
      </section>
      <section className="bg-gray-100  mx-auto py-12 px-6 text-center items-center flex-col">
        <h2 className="text-2xl py-2">
          <strong>How to Use DailyDo – </strong>The Best Productivity & Task Management App
        </h2>
        <p className="py-2 mb-6 w-9/12 flex items-center mx-auto">
          DailyDo is designed to help you organize your tasks, track progress, and boost productivity—all in one clean
          and intuitive interface. With 140 active users across the globe, it’s a proven tool for staying on top of your
          goals.
        </p>
        <iframe
          src="https://www.youtube.com/embed/oD71KPH2olE?si=Tjs1F1W1Xjy_Jm4j"
          title="DailyDo Demo"
          allowFullScreen
          className="w-9/12 h-[480px] rounded-lg items-center mx-auto"
        ></iframe>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="bg-gray-900 text-white text-center py-16 px-6 rounded-t-3xl">
        <h2 className="text-3xl font-bold mb-4">Interested in Buying?</h2>
        <p className="mb-4 text-gray-300">Contact me directly to discuss the transfer and see the live demo.</p>
        <div className="space-y-2">
          <p>
            📧{' '}
            <a href="mailto:ranjanuxd@gmail.com" className="underline">
              ranjanuxd@gmail.com
            </a>
          </p>
          <p>
            💬 LinkedIn:{' '}
            <a href="https://linkedin.com/in/ranjanpathak" className="underline">
              Ranjan Pathak
            </a>
          </p>
          <p>
            🐦 Twitter:{' '}
            <a href="https://x.com/rpathak_" className="underline">
              @rpathak_
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
