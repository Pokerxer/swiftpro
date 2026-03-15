import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/sections/WhatsAppButton";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy | Swift Professional Solutions Limited",
  description: "Privacy Policy - Swift Professional Solutions Limited - Compliant with Nigeria Data Protection Act (NDPA)",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="Privacy Policy"
          description="Our commitment to protecting your personal information"
          breadcrumbs={[{ label: "Privacy Policy" }]}
        />

        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                <strong>Effective Date:</strong> January 1, 2024
              </p>

              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Swift Professional Solutions Limited (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to 
                protecting your privacy. This Privacy Policy explains how we collect, use, 
                disclose, and safeguard your information when you visit our website or use our services.
              </p>

              <h2 className="text-2xl font-heading font-bold text-primary dark:text-white mb-4">
                1. Information We Collect
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <li>Fill out contact forms on our website</li>
                <li>Request a consultation or quote</li>
                <li>Subscribe to our newsletter</li>
                <li>Engage with us on social media</li>
                <li>Apply for a job position</li>
              </ul>

              <h2 className="text-2xl font-heading font-bold text-primary dark:text-white mb-4">
                2. Types of Information We Collect
              </h2>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, phone number, company name, job title</li>
                <li><strong>Technical Information:</strong> IP address, browser type, operating system, access times</li>
                <li><strong>Usage Data:</strong> Pages visited, time spent on pages, links clicked</li>
              </ul>

              <h2 className="text-2xl font-heading font-bold text-primary dark:text-white mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We may use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <li>Provide and improve our services</li>
                <li>Respond to your inquiries and requests</li>
                <li>Send you marketing and promotional materials</li>
                <li>Comply with legal obligations</li>
                <li>Protect our rights and prevent fraud</li>
              </ul>

              <h2 className="text-2xl font-heading font-bold text-primary dark:text-white mb-4">
                4. Information Sharing
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We do not sell, trade, or otherwise transfer your personal information to 
                outside parties except as described below:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <li>Service providers who assist in our operations</li>
                <li>Legal requirements when required by law</li>
                <li>Business transfers in the event of a merger or acquisition</li>
              </ul>

              <h2 className="text-2xl font-heading font-bold text-primary dark:text-white mb-4">
                5. Data Security
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We implement appropriate technical and organizational security measures 
                to protect your personal information against unauthorized access, alteration, 
                disclosure, or destruction.
              </p>

              <h2 className="text-2xl font-heading font-bold text-primary dark:text-white mb-4">
                6. Your Rights (NDPA Compliance)
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Under the Nigeria Data Protection Act (NDPA), you have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <li>Access your personal information</li>
                <li>Rectify inaccurate personal information</li>
                <li>Request erasure of your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Request restriction of processing</li>
                <li>Data portability</li>
              </ul>

              <h2 className="text-2xl font-heading font-bold text-primary dark:text-white mb-4">
                7. Cookies
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We use cookies to enhance your experience. You can instruct your browser 
                to refuse all cookies or to indicate when a cookie is being sent.
              </p>

              <h2 className="text-2xl font-heading font-bold text-primary dark:text-white mb-4">
                8. Third-Party Links
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our website may contain links to third-party websites. We are not 
                responsible for the privacy practices of these websites.
              </p>

              <h2 className="text-2xl font-heading font-bold text-primary dark:text-white mb-4">
                9. Changes to This Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We may update this privacy policy from time to time. We will notify you 
                of any changes by posting the new policy on this page.
              </p>

              <h2 className="text-2xl font-heading font-bold text-primary dark:text-white mb-4">
                10. Contact Us
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <ul className="list-none pl-0 text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <li><strong>Email:</strong> info@swiftpro.com.ng</li>
                <li><strong>Phone:</strong> +234 800 SWIFT PRO</li>
                <li><strong>Address:</strong> Central Business District, Abuja, Nigeria</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
