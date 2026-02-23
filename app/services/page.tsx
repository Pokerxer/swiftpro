import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/sections/WhatsAppButton";
import PageHeader from "@/components/shared/PageHeader";
import ServiceCard from "@/components/shared/ServiceCard";
import { SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services | Swift Professional Solutions Limited",
  description: "Explore our comprehensive IT services including IT Infrastructure, Software Development, Cybersecurity, Cloud Solutions, IT Consulting, and Managed IT Support.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="Our Services"
          description="Comprehensive IT solutions tailored to meet your business needs"
          breadcrumbs={[{ label: "Services" }]}
          className="!pb-0"
        />

        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {SERVICES.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
