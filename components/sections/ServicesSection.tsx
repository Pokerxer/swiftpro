"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Server, Code, Shield, Cloud, Briefcase, Headphones, 
  ArrowUpRight, CheckCircle2, Zap, ShieldCheck, Lock, CloudLightning, 
  Code2, Users, Database
} from "lucide-react";
import { getServices } from "@/lib/api";
import { SERVICES as fallbackServices } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  server: Server, code: Code, shield: Shield, cloud: Cloud, briefcase: Briefcase, headphones: Headphones,
  code2: Code2, lock: Lock, cloudlightning: CloudLightning, zap: Zap, shieldcheck: ShieldCheck, users: Users, database: Database,
  Server, Code, Shield, Cloud, Briefcase, Headphones, Code2, Lock, CloudLightning, Zap, ShieldCheck, Users, Database
};

const gradientMap: Record<string, string> = {
  Server: "from-blue-500 to-cyan-500",
  Code: "from-purple-500 to-pink-500",
  Shield: "from-red-500 to-orange-500",
  Cloud: "from-sky-500 to-blue-500",
  Briefcase: "from-green-500 to-emerald-500",
  Headphones: "from-indigo-500 to-purple-500",
};

const servicesData = fallbackServices.map((s, index) => ({
  ...s,
  category: s.category || "development",
  icon: iconMap[s.icon] || Server,
  gradient: gradientMap[s.icon] || Object.values(gradientMap)[index % 6],
  features: s.features?.slice(0, 4) || [],
  stats: ["99.9% Uptime", "500+ Networks", "100+ Data Centers"],
}));

const categories = [
  { id: "all", label: "All Services" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "development", label: "Development" },
  { id: "security", label: "Security" },
  { id: "consulting", label: "Consulting" },
];

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [services, setServices] = useState<any[]>(servicesData);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const strapiServices = await getServices();
        if (strapiServices.length > 0) {
          const mapped = strapiServices.map((s: any, index: number) => ({
            id: s.id,
            slug: s.slug,
            title: s.title,
            category: s.category || "development",
            shortDescription: s.shortDescription,
            icon: iconMap[s.icon] || Server,
            gradient: gradientMap[s.icon] || Object.values(gradientMap)[index % 6],
            features: s.features?.slice(0, 4) || [],
            stats: ["99.9% Uptime", "500+ Networks", "100+ Data Centers"],
          }));
          setServices(mapped);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = activeCategory === "all" 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <section className="py-20 md:py-32 bg-gray-50 dark:bg-[#0F172A] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary dark:text-accent text-sm font-medium mb-4"
          >
            <Zap className="w-4 h-4" />
            Our Services
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary dark:text-white mb-6">
            Comprehensive IT Solutions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We deliver end-to-end technology solutions tailored to drive your business forward in the digital age.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "text-white"
                  : "text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white"
              }`}
            >
              {activeCategory === category.id && (
                <motion.div
                  layoutId="active-category"
                  className="absolute inset-0 bg-primary rounded-xl"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <Link href={`/services/${service.slug}`} className="group block h-full">
                  <div className="relative h-full p-6 md:p-8 rounded-3xl bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-slate-700 hover:border-transparent transition-all duration-500 overflow-hidden">
                    {/* Gradient Background on Hover */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />
                    
                    {/* Animated Border */}
                    <div className="absolute inset-0 rounded-3xl p-px bg-gradient-to-r from-gray-200 to-gray-200 dark:from-slate-700 dark:to-slate-700 group-hover:from-transparent group-hover:to-transparent transition-all duration-500">
                      <div className="absolute inset-0 rounded-3xl bg-white dark:bg-[#1E293B]" />
                    </div>

                    {/* Content */}
                    <div className="relative">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg`}
                      >
                        <service.icon className="w-8 h-8 text-white" />
                      </motion.div>

                      {/* Title */}
                      <h3 className="text-xl font-heading font-bold text-primary dark:text-white mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {service.shortDescription}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {service.features.slice(0, 3).map((feature: string, i: number) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 text-xs font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-slate-700">
                        {service.stats.map((stat: string, i: number) => (
                          <div key={i} className="text-center">
                            <p className="text-sm font-bold text-primary dark:text-white">{stat}</p>
                          </div>
                        ))}
                      </div>

                      {/* Learn More */}
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-primary font-semibold text-sm"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>

                    {/* Corner Accent */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: hoveredService === service.id ? 1 : 0, scale: hoveredService === service.id ? 1 : 0 }}
                      className="absolute top-0 right-0 w-24 h-24"
                    >
                      <div className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br ${service.gradient} opacity-20`} />
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1"
          >
            Explore All Services
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.span>
          </Link>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-wrap justify-center items-center gap-8 opacity-60"
        >
          {[
            { icon: ShieldCheck, label: "ISO 27001 Certified" },
            { icon: CheckCircle2, label: "10+ Years Experience" },
            { icon: Zap, label: "24/7 Support" },
          ].map((badge, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <badge.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{badge.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
