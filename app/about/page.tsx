"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Linkedin, CheckCircle2, MapPin, Phone, Mail, 
  Award, Users, Briefcase, Globe, ArrowRight,
  Target, Eye, Heart, Sparkles, Calendar, Star,
  Trophy, Shield, Clock, TrendingUp
} from "lucide-react";
import { TEAM, WHY_CHOOSE_US, STATS } from "@/lib/constants";
import { useCompanyInfo } from "@/components/providers/CompanyInfoProvider";
import { getTeamMembers, getStats, getWhyChooseUs } from "@/lib/api";
import { TeamMember, Stat } from "@/types";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/sections/WhatsAppButton";

const timeline = [
  { id: "founded", year: "2026", title: "Company Founded", description: "Started with a vision to transform Nigerian businesses through technology" },
  { id: "launch", year: "2026", title: "Launch Operations", description: "Began serving our first clients with dedicated IT solutions" },
];

const values = [
  { 
    title: "Excellence", 
    desc: "Delivering the highest quality in everything we do",
    icon: Star,
    gradient: "from-amber-500 to-orange-500"
  },
  { 
    title: "Innovation", 
    desc: "Embracing new technologies and creative solutions",
    icon: Sparkles,
    gradient: "from-purple-500 to-pink-500"
  },
  { 
    title: "Integrity", 
    desc: "Building trust through transparency and honesty",
    icon: Shield,
    gradient: "from-green-500 to-emerald-500"
  },
  { 
    title: "Client Focus", 
    desc: "Prioritizing client needs and exceeding expectations",
    icon: Heart,
    gradient: "from-red-500 to-rose-500"
  },
];

const whyChooseIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  MapPin, Award, Clock, Trophy, TrendingUp, Briefcase
};

const tabs = [
  { id: "story", label: "Our Story", icon: BookOpen },
  { id: "mission", label: "Mission & Vision", icon: Target },
  { id: "values", label: "Core Values", icon: Heart },
];

function BookOpen({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

export default function AboutPage() {
  const COMPANY_INFO = useCompanyInfo();
  const [activeTab, setActiveTab] = useState("story");
  const [team, setTeam] = useState(TEAM);
  const [stats, setStats] = useState(STATS);
  const [whyChooseUs, setWhyChooseUs] = useState(WHY_CHOOSE_US);

  // Fetch from Strapi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [strapiTeam, strapiStats, strapiWhy] = await Promise.all([
          getTeamMembers(),
          getStats(),
          getWhyChooseUs(),
        ]);
        
        if (strapiTeam.length > 0) setTeam(strapiTeam);
        if (strapiStats.length > 0) setStats(strapiStats);
        if (strapiWhy.length > 0) setWhyChooseUs(strapiWhy);
      } catch (error) {
        console.error("Error fetching about page data:", error);
      }
    };
    fetchData();
  }, []);
  
  return (
    <>
      <Navbar />
      <main>
        {/* Enhanced Page Header */}
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
              <Users className="w-4 h-4" />
              About Our Company
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Empowering Businesses with<br className="hidden md:block" />
              <span className="text-secondary">Innovation</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              We are a CAC-registered ICT company backed by over 10 years of combined team experience — delivering secure, scalable technology solutions for Nigerian businesses.
            </p>
          </motion.div>

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-2 mt-8 text-white/60"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">About Us</span>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" className="dark:fill-[#0F172A]" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 -left-10 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 -right-10 w-[250px] h-[250px] bg-secondary/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <AnimatedCounter key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Tabbed Content Section */}
      <section className="py-20 md:py-28 bg-gray-50 dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-primary text-white shadow-lg shadow-primary/25"
                      : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-primary/10"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "story" && (
              <motion.div
                key="story"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <div className="order-2 lg:order-1">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary dark:text-white mb-6">
                    Our Journey
                  </h2>
                  <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                    <p>
                      Swift Professional Solutions Limited was founded with a clear vision—to bridge the gap between business needs and reliable technology solutions in a fast-changing digital world.
                    </p>
                    <p>
                      In many organizations, technology was often seen as complex, slow, and difficult to manage. Projects were delayed, systems underperformed, and businesses struggled to keep up with the pace of innovation. We saw an opportunity to do things differently.
                    </p>
                    <p>
                      Driven by a passion for excellence and a commitment to efficiency, Swift Professional Solutions Limited was established to deliver fast, dependable, and high-quality ICT solutions that truly make a difference. From the beginning, our focus has been simple: understand our clients' challenges, respond with speed, and deliver solutions that work—every time.
                    </p>
                    <p>
                      We are your trusted partner for businesses seeking not just technology services, but reliable expertise and long-term value. Our strength lies in combining innovation, technical know-how, and integrity to help organizations operate smarter, scale faster, and achieve sustainable success.
                    </p>
                    <p>
                      Today, Swift Professional Solutions Limited continues to evolve with the ever-changing technology landscape, staying true to our core belief—technology should empower businesses, not slow them down.
                    </p>
                    <p className="font-medium">
                      We are not just service providers. We are partners in progress, committed to delivering speed, precision, and excellence in everything we do.
                    </p>
                  </div>
                </div>
                <div className="order-1 lg:order-2 relative">
                  <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary to-accent p-1">
                    <div className="w-full h-full rounded-3xl bg-white dark:bg-slate-800 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-7xl md:text-8xl font-heading font-bold text-primary">{COMPANY_INFO.foundedYear}</p>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Year Established</p>
                      </div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="absolute -top-4 -right-4 w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <Trophy className="w-10 h-10 text-white" />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === "mission" && (
              <motion.div
                key="mission"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid md:grid-cols-2 gap-8"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-8 rounded-3xl bg-gradient-to-br from-primary to-primary/80 text-white"
                >
                  <Target className="w-12 h-12 mb-4 opacity-90" />
                  <h3 className="text-2xl font-heading font-bold mb-4">Our Mission</h3>
                  <p className="text-white/80 leading-relaxed">
                    To provide world-class ICT and professional solutions by leveraging innovation, expertise and integrity, empowering businesses to achieve sustainable success with speed, precision and excellence.
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-8 rounded-3xl bg-gradient-to-br from-secondary to-orange-600 text-white"
                >
                  <Eye className="w-12 h-12 mb-4 opacity-90" />
                  <h3 className="text-2xl font-heading font-bold mb-4">Our Vision</h3>
                  <p className="text-white/80 leading-relaxed">
                    To be the leading and trusted provider of ICT and professional solutions, recognized for innovation, expertise and for empowering businesses to achieve sustainable success in a fast-evolving digital world.
                  </p>
                </motion.div>
              </motion.div>
            )}

            {activeTab === "values" && (
              <motion.div
                key="values"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-center group cursor-default"
                    >
                      <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-heading font-semibold text-lg text-primary dark:text-white mb-2">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {value.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 md:py-28 bg-white dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary dark:text-accent text-sm font-medium mb-4">
              <Calendar className="w-4 h-4" />
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary dark:text-white">
              Milestones That Define Us
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary hidden md:block" />

            <div className="space-y-12 md:space-y-0">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center md:justify-${index % 2 === 0 ? 'start' : 'end'} md:grid md:grid-cols-2 md:gap-8`}
                >
                  <div className={`md:col-span-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:col-start-2 md:text-left md:pl-12'}`}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-white text-sm font-medium mb-2">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-heading font-bold text-primary dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                  </div>
                  {/* Dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-[#0F172A] z-10" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-gray-50 dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
              <Briefcase className="w-4 h-4" />
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary dark:text-white">
              What Sets Us Apart
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => {
              const Icon = whyChooseIcons[item.icon] || Award;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 group hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-primary dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
</div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Let's discuss how our ICT solutions can help your business grow. Contact us today for a free consultation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-semibold hover:bg-gray-100 transition-colors"
                >
                  Get in Touch
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-white text-white font-semibold hover:bg-white hover:text-primary transition-colors"
                >
                  Our Services
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid gap-4"
            >
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">Visit Our Office</p>
                  <p className="text-white/70 text-sm">{COMPANY_INFO.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">Call Us</p>
                  <p className="text-white/70 text-sm">{COMPANY_INFO.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">Email Us</p>
                  {COMPANY_INFO.emails.map((email) => (
                    <p key={email} className="text-white/70 text-sm">{email}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CAC Registration */}
      <section className="py-8 bg-gray-50 dark:bg-[#1C1C1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="text-gray-600 dark:text-gray-300">CAC Registered Company</span>
            </div>
            <span className="hidden md:block text-gray-300">•</span>
            <p className="text-gray-600 dark:text-gray-300">
              RC Number: <span className="font-semibold text-primary dark:text-white">{COMPANY_INFO.rcNumber}</span>
            </p>
          </div>
        </div>
      </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
