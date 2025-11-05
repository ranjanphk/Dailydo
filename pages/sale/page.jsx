'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Download, Printer, CheckCircle, XCircle } from 'lucide-react';
import { useRef } from 'react';

export default function SalePage() {
  const pageRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    import('html2pdf.js').then((html2pdf) => {
      const element = pageRef.current;
      html2pdf.default().from(element).save('DailyDo_Investor_Pitch.pdf');
    });
  };

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black text-gray-800 dark:text-gray-100"
    >
      {/* HERO SECTION */}
      <section className="text-center py-20 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          DailyDo — Smart Productivity & Performance Platform
        </motion.h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          A complete task, trading & performance management app with{' '}
          <strong>221 users</strong> and <strong>50 active weekly users</strong>. Now open for{' '}
          <strong>investment and scaling</strong>.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition"
          >
            Contact to Invest
          </motion.a>

          <button
            onClick={handleDownload}
            className="bg-white text-gray-800 px-6 py-3 rounded-full font-medium shadow flex items-center gap-2 hover:bg-gray-100 transition"
          >
            <Download size={18} /> Download PDF
          </button>

          <button
            onClick={handlePrint}
            className="bg-gray-200 dark:bg-gray-700 px-6 py-3 rounded-full font-medium shadow flex items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            <Printer size={18} /> Print
          </button>
        </div>
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
          DailyDo is a fast, easy productivity platform that helps freelancers, teams, and traders
          manage their tasks, track performance, and stay consistent. Version 1 is live and fully
          functional with AI integration and trading task templates in development.
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
        <h2 className="text-2xl font-semibold mb-4 text-center">Key Highlights</h2>
        <ul className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
          <li>✅ Task creation, management & completion tracking</li>
          <li>📊 Performance analytics dashboard</li>
          <li>💹 Trading Analysis & Tracking (upcoming paid feature)</li>
          <li>🤖 AI-powered insights (in progress)</li>
          <li>🌍 221 total users | 50 active weekly users</li>
          <li>⚡ Fast, modern & intuitive (Next.js + Firebase)</li>
        </ul>
      </section>

      {/* COMPETITION SECTION */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-2xl font-semibold mb-8 text-center">Competitive Landscape</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          DailyDo stands out from complex tools like Odoo and Asana by focusing on simplicity,
          speed, and purpose-built design for freelancers and small teams.
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 text-center text-sm md:text-base">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="border border-gray-300 p-3 text-left">Features</th>
                <th className="border border-gray-300 p-3">Odoo</th>
                <th className="border border-gray-300 p-3">Asana</th>
                <th className="border border-gray-300 p-3">DailyDo</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Simple & Fast Interface', false, true, true],
                ['Built for Freelancers', false, true, true],
                ['AI Insights', false, false, true],
                ['Trading Task Templates', false, false, true],
                ['Performance Analytics', true, true, true],
                ['Easy Customization', false, false, true],
                ['Lightweight & Fast', false, false, true],
              ].map(([feature, odoo, asana, dailydo], idx) => (
                <tr key={idx} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800">
                  <td className="border border-gray-300 p-3 text-left">{feature}</td>
                  {[odoo, asana, dailydo].map((val, i) => (
                    <td key={i} className="border border-gray-300 p-3">
                      {val ? (
                        <CheckCircle className="text-green-500 mx-auto" size={18} />
                      ) : (
                        <XCircle className="text-red-400 mx-auto" size={18} />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ROADMAP SECTION */}
      <section className="max-w-5xl mx-auto py-16 px-6 bg-gray-100 dark:bg-gray-800 rounded-2xl">
        <h2 className="text-2xl font-semibold mb-8 text-center">Next 6 Months Roadmap</h2>
        <div className="grid md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300 text-lg">
          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow">💼 Paid Team Plan</div>
          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow">
            📊 Paid Trading Template Tasks
          </div>
          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow">📱 Mobile Application</div>
          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow">🧩 Paid Project Plan</div>
        </div>
      </section>

      {/* ABOUT FOUNDER */}
      <section className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">About the Founder</h2>
        <Image
          src="/images/founder.png"
          alt="Founder"
          width={160}
          height={160}
          className="rounded-full mx-auto mb-6 border border-gray-300 dark:border-gray-600"
        />
        <p className="text-gray-600 dark:text-gray-300 mb-3">
          <strong>Ranjan Pathak</strong> — Designer, Strategist, and Founder of DailyDo.  
          Passionate about simplifying productivity systems for professionals and freelancers
          worldwide.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          On a mission to scale DailyDo into a global platform for performance tracking, project
          collaboration, and AI-assisted productivity.
        </p>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="bg-gray-900 text-white text-center py-16 px-6 rounded-t-3xl">
        <h2 className="text-3xl font-bold mb-4">Interested in Investing?</h2>
        <p className="mb-4 text-gray-300">
          Contact me directly to discuss the opportunity and view the live demo.
        </p>
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
