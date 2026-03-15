import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, Code, Shield, Cloud, Server } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PortfolioContent from "./PortfolioContent";
import WhatsAppButton from "@/components/sections/WhatsAppButton";

export const metadata: Metadata = {
  title: "Portfolio | Swift Professional Solutions Limited",
  description: "Explore our IT projects and case studies showcasing our expertise in Software Development, Cybersecurity, Cloud Solutions, and IT Infrastructure in Nigeria.",
};

const categories = [
  { id: "all", label: "All Projects", icon: "Briefcase" },
  { id: "Web", label: "Web Development", icon: "Code" },
  { id: "Software", label: "Software Solutions", icon: "Server" },
  { id: "Security", label: "Cybersecurity", icon: "Shield" },
  { id: "Infrastructure", label: "IT Infrastructure", icon: "Cloud" },
];

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent" />
        <div className="absolute inset-0">
          <div className="absolute top-20 -left-20 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 -right-20 w-[300px] h-[300px] bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium mb-6 backdrop-blur-sm">
              <Briefcase className="w-4 h-4" />
              Our Work
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Our Portfolio
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-8">
              Showcasing our recent projects and the innovative solutions we&apos;ve delivered 
              to help businesses transform their operations.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 mt-12 text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Portfolio</span>
          </div>
        </div>
      </section>

      <PortfolioContent categories={categories} />

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-accent relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-secondary/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Have a Project in Mind?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Let&apos;s discuss how we can help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary/90 transition-all duration-300 shadow-lg"
            >
              Start a Project
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}