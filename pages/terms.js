// pages/terms-of-service.js
import React from "react";
import { useRouter } from "next/router";

export default function TermsOfServicePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white py-6 shadow">
        <h1 className="text-3xl font-bold text-center">Terms of Service</h1>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        <p className="text-gray-600 dark:text-gray-300"><strong>Effective Date:</strong> 26-09-2025</p>

        <p>
          Welcome to DailyDO (“we,” “our,” or “us”). By accessing or using our app, website, or services (collectively, the “Services”), you agree to comply with these Terms of Service (“Terms”). 
          Please read them carefully before using our Services.
        </p>

        <h2 className="text-2xl font-semibold mt-6">1. Acceptance of Terms</h2>
        <p>
          By using DailyDO, you agree to these Terms and our Privacy Policy. If you do not agree, you must not use the Services.
        </p>

        <h2 className="text-2xl font-semibold mt-6">2. User Accounts</h2>
        <p>
          You may need to create an account to access certain features. You are responsible for maintaining the security of your account and for all activities that occur under it.
        </p>

        <h2 className="text-2xl font-semibold mt-6">3. Use of the Services</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>You must use the Services in accordance with all applicable laws.</li>
          <li>You may not misuse the Services or interfere with other users’ access.</li>
          <li>We reserve the right to suspend or terminate accounts for violations of these Terms.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">4. Payments and Subscriptions</h2>
        <p>
          Some features may require payment. All payments are processed securely through third-party providers. Subscription fees are non-refundable unless required by law.
        </p>

        <h2 className="text-2xl font-semibold mt-6">5. Intellectual Property</h2>
        <p>
          All content, design, logos, and software on DailyDO are our property or licensed to us. You may not copy, modify, or distribute any part of the Services without permission.
        </p>

        <h2 className="text-2xl font-semibold mt-6">6. Termination</h2>
        <p>
          We may suspend or terminate your access at any time for violations of these Terms or for other reasons, with or without notice.
        </p>

        <h2 className="text-2xl font-semibold mt-6">7. Limitation of Liability</h2>
        <p>
          DailyDO is provided “as-is” and we are not liable for any damages resulting from your use of the Services. Use the Services at your own risk.
        </p>

        <h2 className="text-2xl font-semibold mt-6">8. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless DailyDO and its affiliates from any claims, damages, or expenses arising from your use of the Services.
        </p>

        <h2 className="text-2xl font-semibold mt-6">9. Changes to Terms</h2>
        <p>
          We may update these Terms from time to time. Changes will be posted on this page with an updated effective date. Your continued use of the Services constitutes acceptance of the updated Terms.
        </p>

        <h2 className="text-2xl font-semibold mt-6">10. Governing Law</h2>
        <p>
          These Terms are governed by the laws of [Insert Jurisdiction]. Any disputes will be resolved in the courts of [Insert Jurisdiction].
        </p>

        {/* Back to Home Button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
