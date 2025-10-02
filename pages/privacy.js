// pages/privacy-policy.js
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

export default function PrivacyPolicyPage() {
  const router = useRouter();
  const { setTheme } = useTheme();

  // Force light theme on this page
  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <div className="bg-blue-600 text-white py-6 shadow">
        <h1 className="text-3xl font-bold text-center">Privacy Policy</h1>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        <p className="text-gray-600">
          <strong>Effective Date:</strong> 26-09-2025
        </p>

        <p>
          DailyDO (“we,” “our,” or “us”) respects your privacy and is committed to protecting
          your personal information. This Privacy Policy explains how we collect, use, and
          share information when you use our app, website, and related services (collectively,
          the “Services”). By using our Services, you agree to the terms of this Privacy Policy.
        </p>

        <h2 className="text-2xl font-semibold mt-6">1. Information We Collect</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Personal Information:</strong> Name, email, phone number, and payment info you provide.</li>
          <li><strong>Usage Information:</strong> Tasks, projects, device info, log data, and interactions within the app.</li>
          <li><strong>Cookies and Tracking:</strong> Cookies and similar technologies to improve experience and analytics.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Provide, operate, and maintain the Services.</li>
          <li>Improve and personalize the Services.</li>
          <li>Communicate updates, notifications, and support.</li>
          <li>Process transactions securely.</li>
          <li>Analyze usage patterns to enhance performance.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">3. How We Share Your Information</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>With service providers who help us operate the app.</li>
          <li>For legal reasons to comply with laws or regulations.</li>
          <li>In case of business transfers (merger, acquisition, sale of assets).</li>
          <li>With your consent.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">4. Data Security</h2>
        <p>
          We implement reasonable safeguards to protect your data, but no method of transmission
          over the internet or electronic storage is completely secure.
        </p>

        <h2 className="text-2xl font-semibold mt-6">5. Your Rights</h2>
        <p>
          You may access, correct, or delete your personal information, opt-out of marketing
          communications, or restrict processing. Contact us at [Insert Email] to exercise these rights.
        </p>

        <h2 className="text-2xl font-semibold mt-6">6. Children’s Privacy</h2>
        <p>
          DailyDO is not intended for children under 13. If you believe we collected information from a child,
          please contact us to remove it.
        </p>

        <h2 className="text-2xl font-semibold mt-6">7. Third-Party Links</h2>
        <p>
          Our Services may contain links to third-party websites. We are not responsible for their
          privacy practices. Please review their policies.
        </p>

        <h2 className="text-2xl font-semibold mt-6">8. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Updates will be posted on this page
          with an updated effective date. Please review it periodically.
        </p>

        <h2 className="text-2xl font-semibold mt-6">9. Contact Us</h2>
        <p>Email: ranjanuxd at gmail dot com</p>
        <p>Address: Beyondux</p>

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
