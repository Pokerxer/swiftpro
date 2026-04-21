"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, CheckCircle2, Award, Users, Zap, Shield, Globe, 
  Target, Rocket, Heart, ShieldCheck, Clock, Trophy, MapPin, Phone, Mail
} from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";
import { getTeamMembers, getWhyChooseUs, getStats } from "@/lib/api";

const stats = [
  { value: "500+", label: "Projects Completed", icon: Trophy },
  { value: "200+", label: "Happy Clients", icon: Users },
  { value: "10+", label: "Years Experience", icon: Clock },
  { value: "98%", label: "Success Rate", icon: Target },
];

const values = [
  { icon: Zap, title: "Innovation", desc: "Embracing cutting-edge technologies" },
  { icon: Shield, title: "Security", desc: "Enterprise-grade protection" },
  { icon: Heart, title: "Client Focus", desc: "Your success is our priority" },
  { icon: Globe, title: "Local Expertise", desc: "Nigeria market knowledge" },
];

const timeline = [
  { id: "founded", year: "2026", title: "Founded", desc: "Company established in Abuja" },
  { id: "projects", year: "2026", title: "First Projects", desc: "Delivering our first solutions" },
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<"story" | "mission" | "values">("story");

  return (
    <section className="py-20 md:py-32 bg-white dark:bg-[#0F172A] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4"
          >
            <Heart className="w-4 h-4" />
            About SwiftPro
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary dark:text-white mb-6">
            Your Partner in{" "}
            <span className="text-secondary">Digital Excellence</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We are a newly established ICT company dedicated to transforming businesses through innovative technology solutions.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Tabs */}
            <div className="flex gap-2 mb-8 p-1 bg-gray-100 dark:bg-slate-800 rounded-xl">
              {(["story", "mission", "values"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-white dark:bg-slate-700 text-primary shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-primary"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === "story" && (
                <motion.div
                  key="story"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    Swift Professional Solutions Limited was founded with a clear vision—to bridge the gap between business needs and reliable technology solutions in a fast-changing digital world.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    In many organizations, technology was often seen as complex, slow, and difficult to manage. Projects were delayed, systems underperformed, and businesses struggled to keep up with the pace of innovation. We saw an opportunity to do things differently.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Driven by a passion for excellence and a commitment to efficiency, Swift Professional Solutions Limited was established to deliver fast, dependable, and high-quality ICT solutions that truly make a difference. From the beginning, our focus has been simple: understand our clients' challenges, respond with speed, and deliver solutions that work—every time.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    We are your trusted partner for businesses seeking not just technology services, but reliable expertise and long-term value. Our strength lies in combining innovation, technical know-how, and integrity to help organizations operate smarter, scale faster, and achieve sustainable success.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Today, Swift Professional Solutions Limited continues to evolve with the ever-changing technology landscape, staying true to our core belief—technology should empower businesses, not slow them down.
                  </p>
                </motion.div>
              )}

              {activeTab === "mission" && (
                <motion.div
                  key="mission"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-primary to-accent">
                    <h4 className="text-white font-bold text-xl mb-3">Our Mission</h4>
                    <p className="text-white/80 leading-relaxed">
                      To empower Nigerian businesses with innovative, reliable, and cost-effective IT solutions 
                      that enhance productivity, drive growth, and create sustainable competitive advantage 
                      in the digital age.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-gradient-to-br from-secondary to-orange-500">
                    <h4 className="text-white font-bold text-xl mb-3">Our Vision</h4>
                    <p className="text-white/80 leading-relaxed">
                      To be the leading ICT solutions provider in Nigeria and across Africa, recognized 
                      for excellence, innovation, and unwavering commitment to client success.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Target, label: "Mission-Driven" },
                      { icon: Rocket, label: "Innovation-Focused" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-slate-800">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium text-primary dark:text-white text-sm">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "values" && (
                <motion.div
                  key="values"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="grid grid-cols-1 gap-4">
                    {values.map((value, index) => (
                      <motion.div
                        key={value.title}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-slate-800 hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                          <value.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary dark:text-white mb-1">{value.title}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{value.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA */}
            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-2xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all duration-300 hover:gap-3 group"
            >
              Learn More About Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Main Card */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#1e40af] to-accent" />
              
              {/* Grid Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '24px 24px',
                  }}
                />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                {/* Year Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: 0.3 }}
                  className="w-36 h-36 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center mb-6 border-4 border-white/30"
                >
                  <div className="text-center">
                    <span className="text-5xl font-bold text-white">{COMPANY_INFO.foundedYear}</span>
                  </div>
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-2">Years of Excellence</h3>
                <p className="text-white/70 text-center mb-8">in IT Solutions</p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="text-center p-3 rounded-xl bg-white/10 backdrop-blur-sm"
                    >
                      <stat.icon className="w-5 h-5 mx-auto mb-1 text-white/70" />
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                      <p className="text-[10px] text-white/60">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Floating Badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute top-6 left-6 p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary dark:text-white text-sm">CAC Registered</p>
                    <p className="text-xs text-gray-500">{COMPANY_INFO.rcNumber}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="absolute bottom-6 right-6 p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary dark:text-white text-sm">ISO 27001</p>
                    <p className="text-xs text-gray-500">Certified</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
          </motion.div>
        </div>

        {/* Contact Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-6 rounded-3xl bg-gray-50 dark:bg-slate-800"
        >
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: MapPin, label: "Location", value: COMPANY_INFO.address },
              { icon: Phone, label: "Phone", value: COMPANY_INFO.phone },
              { icon: Mail, label: "Email", value: COMPANY_INFO.email },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                  <p className="font-medium text-primary dark:text-white">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
