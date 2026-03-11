"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getStats } from "@/lib/api";
import { STATS as FALLBACK_STATS } from "@/lib/constants";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Briefcase, Clock, ThumbsUp, Award, Globe, Star, TrendingUp } from "lucide-react";

const partnerLogos = [
  { name: "Microsoft", color: "#00A4EF" },
  { name: "Google", color: "#4285F4" },
  { name: "AWS", color: "#FF9900" },
  { name: "Cisco", color: "#1BA0D7" },
  { name: "Oracle", color: "#F80000" },
  { name: "IBM", color: "#052FAD" },
];

const achievements = [
  { icon: Award, value: "ISO 27001", label: "Certified" },
  { icon: Globe, value: "50+", label: "Countries" },
  { icon: Star, value: "4.9", label: "Rating" },
];

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [stats, setStats] = useState(FALLBACK_STATS);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const strapiStats = await getStats();
        if (strapiStats.length > 0) {
          setStats(strapiStats);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <>
      {/* Main Stats Section */}
      <section ref={ref} className="relative py-20 md:py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#0d47a1] to-accent" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Orbs */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-accent/30 rounded-full blur-3xl"
          />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: '30px 30px',
              }}
            />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium mb-4 backdrop-blur-sm">
              Our Impact
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
              Numbers That Speak
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              A decade of delivering exceptional IT solutions across Nigeria and beyond
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-white/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6 md:p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all duration-300">
                  <div className="text-center">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 mb-4">
                      {index === 0 && <Users className="w-7 h-7 text-white" />}
                      {index === 1 && <Briefcase className="w-7 h-7 text-white" />}
                      {index === 2 && <Clock className="w-7 h-7 text-white" />}
                      {index === 3 && <ThumbsUp className="w-7 h-7 text-white" />}
                    </div>
                    
                    {/* Counter */}
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                      {isInView && <AnimatedCounter stat={stat} index={index} />}
                    </div>
                    <p className="text-white/70 font-medium">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Achievements Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center gap-6"
          >
            {achievements.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{item.value}</p>
                  <p className="text-xs text-white/60">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partners/Trusted By Section */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary dark:text-accent text-sm font-medium mb-4">
              Our Partners
            </span>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary dark:text-white">
              Trusted by Industry Leaders
            </h3>
          </motion.div>

          {/* Partner Logos - Scrolling Marquee */}
          <div className="relative">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 dark:from-[#0F172A] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 dark:from-[#0F172A] to-transparent z-10" />
            
            {/* Scrolling Logos */}
            <div className="overflow-hidden">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="flex items-center gap-12 md:gap-20"
              >
                {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                  <motion.div
                    key={`${logo.name}-${index}`}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="flex-shrink-0 cursor-pointer group"
                  >
                    <div 
                      className="text-2xl md:text-3xl font-bold transition-all duration-300"
                      style={{ color: logo.color }}
                    >
                      <span className="opacity-40 group-hover:opacity-100 transition-opacity">
                        {logo.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Client Testimonials Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: "98%", label: "Client Retention", icon: TrendingUp },
              { value: "150+", label: "Enterprise Clients", icon: Briefcase },
              { value: "50+", label: "Industry Awards", icon: Award },
              { value: "24/7", label: "Support Available", icon: Clock },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-slate-700"
              >
                <item.icon className="w-8 h-8 mx-auto mb-3 text-primary dark:text-accent" />
                <p className="text-2xl font-bold text-primary dark:text-white">{item.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
