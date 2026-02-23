import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/sections/WhatsAppButton";
import PageHeader from "@/components/shared/PageHeader";
import { SERVICES, COMPANY_INFO } from "@/lib/constants";
import { generateWhatsAppLink } from "@/lib/utils";
import { ArrowLeft, CheckCircle2, Server, Code, Shield, Cloud, Briefcase, Headphones } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Server,
  Code,
  Shield,
  Cloud,
  Briefcase,
  Headphones,
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  
  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.title} | Swift Professional Solutions Limited`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.icon] || Server;
  const waLink = generateWhatsAppLink(
    COMPANY_INFO.phoneRaw.replace(/\s/g, ""),
    `Hello, I'm interested in ${service.title} services.`
  );

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title={service.title}
          description={service.shortDescription}
          breadcrumbs={[
            { label: "Services", href: "/services" },
            { label: service.title },
          ]}
        />

        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Services
                </Link>

                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-primary" />
                </div>

                <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary dark:text-white mb-6">
                  About {service.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                  {service.fullDescription}
                </p>

                <h3 className="text-xl font-heading font-semibold text-primary dark:text-white mb-4">
                  Key Features
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mb-12">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-heading font-semibold text-primary dark:text-white mb-6">
                  Our Process
                </h3>
                <div className="space-y-6">
                  {service.processSteps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary dark:text-white mb-1">
                          {step.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="p-6 rounded-2xl bg-white dark:bg-[#262626] border border-gray-100 dark:border-gray-800 mb-6">
                    <h3 className="font-heading font-semibold text-lg text-primary dark:text-white mb-4">
                      Get Started
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                      Ready to transform your business? Contact us today for a free consultation.
                    </p>
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 px-4 rounded-xl bg-secondary text-white text-center font-semibold hover:bg-secondary/90 transition-colors"
                    >
                      Request Quote
                    </a>
                  </div>

                  <div className="p-6 rounded-2xl bg-primary text-white">
                    <h3 className="font-heading font-semibold text-lg mb-4">
                      Related Services
                    </h3>
                    <ul className="space-y-3">
                      {SERVICES.filter((s) => s.id !== service.id)
                        .slice(0, 3)
                        .map((s) => (
                          <li key={s.id}>
                            <Link
                              href={`/services/${s.slug}`}
                              className="text-white/80 hover:text-white text-sm transition-colors"
                            >
                              {s.title}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
