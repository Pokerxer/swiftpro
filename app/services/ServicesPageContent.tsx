"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, Server, Code, Shield, Cloud, Briefcase, Headphones,
  CheckCircle2, Zap, Award, Users, Clock, ChevronRight
} from "lucide-react";
import { Service } from "@/types";
import ServiceCard from "@/components/shared/ServiceCard";
import WhatsAppButton from "@/components/sections/WhatsAppButton";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Server, Code, Shield, Cloud, Briefcase, Headphones
};

const features = [
  { icon: Zap, title: "Fast Delivery", description: "Quick turnaround times without compromising quality" },
  { icon: Award, title: "Expert Team", description: "Certified professionals with years of experience" },
  { icon: Users, title: "24/7 Support", description: "Round-the-clock technical assistance" },
  { icon: Clock, title: "On-Time Project", description: "We deliver what we promise, when we promise" },
];

export default function ServicesPageContent({ services }: { services: Service[] }) {
  return (
    <>
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium mb-6 backdrop-blur-sm"
            >
              <Zap className="w-4 h-4" />
              Our Services
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Comprehensive IT Solutions<br className="hidden md:block" />
              <span className="text-secondary">For Your Business</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-8">
              From infrastructure to cybersecurity, we deliver end-to-end technology solutions 
              that help Nigerian businesses thrive in the digital age.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary/90 transition-all duration-300 shadow-lg shadow-secondary/20 hover:shadow-xl"
              >
                Get a Free Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Learn More About Us
              </Link>
            </div>
          </motion.div>

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-2 mt-12 text-white/60"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Services</span>
          </motion.div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="py-8 bg-white dark:bg-[#0F172A] border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{feature.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Our IT Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We provide a comprehensive range of IT services designed to meet the diverse needs of modern businesses.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service: Service, index: number) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
              How We Work
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Our Working Process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A streamlined approach that ensures quality and efficiency in every project we deliver.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery", desc: "We analyze your requirements and understand your business goals" },
              { step: "02", title: "Planning", desc: "Our team creates a detailed roadmap with clear milestones" },
              { step: "03", title: "Development", desc: "We build your solution using modern technologies" },
              { step: "04", title: "Delivery", desc: "Rigorous testing ensures quality before seamless deployment" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="p-6 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 h-full">
                  <span className="text-4xl font-heading font-bold text-primary/20">{item.step}</span>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
                {index < 3 && (
                  <ChevronRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-primary/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-accent relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-secondary/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Let&apos;s discuss how our IT services can help your business grow. Get in touch with us today for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary/90 transition-all duration-300 shadow-lg"
              >
                Contact Us Today
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <WhatsAppButton />
    </>
  );
}
