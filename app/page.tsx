import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/sections/WhatsAppButton";
import StrapiHeroSection from "@/components/sections/StrapiHeroSection";
import StatsSection from "@/components/sections/StatsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogSection from "@/components/sections/BlogSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Swift Professional Solutions Limited | Driving Digital Transformation Across Nigeria",
  description: "Swift Professional Solutions Limited delivers world-class IT services across Nigeria. From IT Infrastructure, Software Development, Cybersecurity, Cloud Solutions, and Managed IT Support.",
  keywords: ["ICT", "IT Solutions", "Nigeria", "Lagos", "Software Development", "Cybersecurity", "Cloud Solutions", "IT Consulting"],
  openGraph: {
    title: "Swift Professional Solutions Limited",
    description: "Driving Digital Transformation Across Nigeria",
    type: "website",
    locale: "en_NG",
    siteName: "Swift Professional Solutions Limited",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <StrapiHeroSection />
        <StatsSection />
        <ServicesSection />
        <AboutSection />
        <PortfolioSection />
        <TestimonialsSection />
        <BlogSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
