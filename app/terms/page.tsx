import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/sections/WhatsAppButton";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Terms of Service | Swift Professional Solutions Limited",
  description: "Terms of Service - Swift Professional Solutions Limited",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="Terms of Service"
          description="The terms and conditions governing your use of our services"
          breadcrumbs={[{ label: "Terms of Service" }]}
        />

        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                <strong>Effective Date:</strong> January 1, 2024
              </p>

              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Welcome to Swift Professional Solutions Limited. By accessing and using 
                our website and services, you agree to be bound by these Terms of Service.
              </p>

              <h2 className="text-2xl font-heading font-bold text-primary dark:text-white mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                By accessing and using this website, you accept and agree to be bound 
                by the terms and provision of this agreement.
              </p>

              <h2 className="text-2xl font-heading font-bold text-primary dark:text-white mb-4">
                2. Description of Services
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Swift Professional Solutions Limited provides IT services including but not 
                limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <li>IT Infrastructure Solutions</li>
                <li>Software Development</li>
                <li>Cybersecurity Services</li>
                <li>Cloud Solutions</li>
                <li>IT Consulting</li>
                <li>Managed IT Support</li>
              </ul>

              <h2 className="text-2xl font-heading font-bold text-primary dark:text-white mb-4">
                3. User Obligations
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                As a user of our website, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account</li>
                <li>Not use the website for any unlawful purpose</li>
                <li>Not attempt to gain unauthorized access to any part of the website</li>
                <li>Not interfere with the proper working of the website</li>
              </ul>

              <h2 className="text-2xl font-heading font-bold text-primary dark:text-white mb-4">
                4. Intellectual Property
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                The content on this website, including but not limited to text, graphics, 
                logos, images, and software, is the property of Swift Professional Solutions 
                Limited and is protected by copyright and other intellectual property laws.
              </p>

              <h2 className="text-2xl font-heading font-bold text-primary dark:text-white mb-4">
                5. Limitation of Liability
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Swift Professional Solutions Limited shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages resulting from 
                your use of or inability to use the website or services.
              </p>

              <h2 className="text-2xl font-heading font-bold text-primary dark:text-white mb-4">
                6. Disclaimer of Warranties
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                The website and services are provided &quot;as is&quot; and &quot;as available&quot; 
                without any warranties of any kind, either express or implied.
              </p>

              <h2 className="text-2xl font-heading font-bold text-primary dark:text-white mb-4">
                7. Governing Law
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                These Terms of Service shall be governed by and construed in accordance 
                with the laws of the Federal Republic of Nigeria.
              </p>

              <h2 className="text-2xl font-heading font-bold text-primary dark:text-white mb-4">
                8. Changes to Terms
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We reserve the right to modify these terms at any time. Your continued 
                use of the website after any such changes constitutes your acceptance of 
                the new terms.
              </p>

              <h2 className="text-2xl font-heading font-bold text-primary dark:text-white mb-4">
                9. Contact Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                If you have any questions about these Terms of Service, please contact us at:
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
