"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, ChevronLeft, Zap, Shield, Cloud, Code, Server, Briefcase, Headphones, CheckCircle, Play } from "lucide-react";

const slides = [
  {
    id: 1,
    subtitle: "Leading ICT Company in Nigeria",
    title: "Empowering Businesses with",
    highlight: "Cutting-Edge ICT Solutions",
    description: "Swift Professional Solutions Limited delivers world-class IT services across Nigeria — from Lagos to Abuja and beyond. Transform your business with innovative technology solutions.",
    cta: { text: "Get a Free Consultation", href: "/contact" },
    secondaryCta: { text: "View Our Services", href: "/services" },
    features: [
      { icon: Code, label: "Custom Software" },
      { icon: Shield, label: "Cyber Security" },
      { icon: Cloud, label: "Cloud Solutions" },
    ],
    stats: [
      { value: "200+", label: "Clients" },
      { value: "500+", label: "Projects" },
      { value: "98%", label: "Success Rate" },
    ],
    bgGradient: "from-primary via-primary to-[#1e3a8a]",
  },
  {
    id: 2,
    subtitle: "Enterprise Security Solutions",
    title: "Protect Your Business with",
    highlight: "Advanced Cybersecurity",
    description: "Comprehensive security solutions to safeguard your digital assets. From vulnerability assessments to 24/7 monitoring, we keep your business secure against evolving threats.",
    cta: { text: "Explore Security Services", href: "/services/cybersecurity" },
    secondaryCta: { text: "Get a Security Audit", href: "/contact" },
    features: [
      { icon: Shield, label: "Penetration Testing" },
      { icon: Zap, label: "24/7 Monitoring" },
      { icon: CheckCircle, label: "Compliance" },
    ],
    stats: [
      { value: "500+", label: "Systems Secured" },
      { value: "100%", label: "Threat Detection" },
      { value: "24/7", label: "Support" },
    ],
    bgGradient: "from-[#1e3a8a] via-[#0f172a] to-[#020617]",
  },
  {
    id: 3,
    subtitle: "Cloud Transformation",
    title: "Scale Your Business with",
    highlight: "Cloud Solutions",
    description: "Transform your infrastructure with our cloud services. We provide seamless migration, architecture design, and management for AWS, Azure, and Google Cloud platforms.",
    cta: { text: "Cloud Services", href: "/services/cloud-solutions" },
    secondaryCta: { text: "Contact Us", href: "/contact" },
    features: [
      { icon: Cloud, label: "Cloud Migration" },
      { icon: Server, label: "Infrastructure" },
      { icon: Zap, label: "Cost Optimization" },
    ],
    stats: [
      { value: "99.9%", label: "Uptime" },
      { value: "50%", label: "Cost Savings" },
      { value: "100+", label: "Migrations" },
    ],
    bgGradient: "from-[#0891b2] via-[#0f172a] to-[#020617]",
  },
  {
    id: 4,
    subtitle: "Software Development",
    title: "Build Your Vision with",
    highlight: "Custom Software",
    description: "From web applications to enterprise solutions, our expert developers create scalable, secure, and user-friendly software tailored to your business needs.",
    cta: { text: "Development Services", href: "/services/software-development" },
    secondaryCta: { text: "View Portfolio", href: "/portfolio" },
    features: [
      { icon: Code, label: "Web Apps" },
      { icon: Briefcase, label: "Enterprise" },
      { icon: Headphones, label: "Mobile" },
    ],
    stats: [
      { value: "200+", label: "Apps Built" },
      { value: "50+", label: "Developers" },
      { value: "100%", label: "Custom" },
    ],
    bgGradient: "from-[#7c3aed] via-[#4f46e5] to-[#1e1b4b]",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section 
      className="relative min-h-screen overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].bgGradient}`}
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
                  backgroundSize: '60px 60px',
                }}
              />
            </div>
            
            {/* Floating Orbs */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-20 -left-20 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 10, repeat: Infinity, delay: 2 }}
              className="absolute bottom-20 -right-20 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl"
            />
            
            {/* Tech Particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.2, 0.6, 0.2],
                  y: [0, -30, 0],
                }}
                transition={{ 
                  duration: 3 + i * 0.5, 
                  repeat: Infinity,
                  delay: i * 0.3 
                }}
                className="absolute w-1.5 h-1.5 bg-white/40 rounded-full"
                style={{
                  left: `${15 + i * 12}%`,
                  top: `${20 + (i % 4) * 15}%`,
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 h-full flex items-center">
            <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                  </span>
                  {slides[currentSlide].subtitle}
                </motion.div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-6 leading-tight">
                  {slides[currentSlide].title}{" "}
                  <span className="block mt-2">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
                      {slides[currentSlide].highlight}
                    </span>
                  </span>
                </h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl text-white/80 mb-8 max-w-xl leading-relaxed"
                >
                  {slides[currentSlide].description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 mb-10"
                >
                  <Link
                    href={slides[currentSlide].cta.href}
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-primary font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1"
                  >
                    {slides[currentSlide].cta.text}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href={slides[currentSlide].secondaryCta.href}
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                  >
                    {slides[currentSlide].secondaryCta.text}
                  </Link>
                </motion.div>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-4"
                >
                  {slides[currentSlide].features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                    >
                      <feature.icon className="w-4 h-4 text-white/80" />
                      <span className="text-sm text-white/90">{feature.label}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right Content - Stats Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="hidden lg:block"
              >
                <div className="relative">
                  {/* Main Card */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
                  >
                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-6 mb-8">
                      {slides[currentSlide].stats.map((stat, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="text-center"
                        >
                          <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
                          <p className="text-sm text-white/60">{stat.label}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Feature Highlights */}
                    <div className="space-y-3">
                      {slides[currentSlide].features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
                        >
                          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                            <feature.icon className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-white font-medium">{feature.label}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Floating Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute -top-4 -right-4 w-24 h-24 bg-secondary rounded-2xl shadow-xl flex items-center justify-center"
                  >
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">10+</p>
                      <p className="text-[10px] text-white/80">Years</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1 }}
                    className="absolute -bottom-4 -left-4 p-4 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-white">Online Support</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors hidden md:flex"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </motion.button>
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors hidden md:flex"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </motion.button>

      {/* Dots Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2"
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative"
          >
            <div 
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? "bg-white w-8" 
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
            {currentSlide === index && (
              <motion.div
                layoutId="active-dot"
                className="absolute inset-0 bg-white/20 rounded-full"
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 right-8 hidden md:flex items-center gap-2 text-white/50"
      >
        <span className="text-xs font-medium">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronRight className="w-4 h-4 -rotate-90" />
        </motion.div>
      </motion.div>
    </section>
  );
}
