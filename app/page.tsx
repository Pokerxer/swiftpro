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
  title: "Swift Professional Solutions Limited | IT Solutions for Nigerian Businesses",
  description: "Swift Professional Solutions Limited is a CAC-registered ICT company in Abuja, Nigeria — providing Software Development, Cybersecurity, Cloud Solutions, IT Infrastructure and Managed IT Support.",
  keywords: ["ICT", "IT Solutions", "Nigeria", "Abuja", "Software Development", "Cybersecurity", "Cloud Solutions", "IT Consulting"],
  openGraph: {
    title: "Swift Professional Solutions Limited",
    description: "Helping Nigerian Businesses Build Secure, Scalable IT Systems",
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
