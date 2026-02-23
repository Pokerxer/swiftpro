"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  MapPin, Phone, Mail, Clock, Send, CheckCircle2, Loader2,
  MessageCircle, Globe, ArrowRight, ChevronDown, ChevronUp,
  Search, HelpCircle, X
} from "lucide-react";
import { contactFormSchema, ContactFormValues } from "@/lib/validations";
import { COMPANY_INFO, SERVICE_OPTIONS } from "@/lib/constants";
import { generateWhatsAppLink } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/sections/WhatsAppButton";

const faqCategories = ["All", "Services", "Consultation", "Support", "Industries"];
const faqs = [
  {
    category: "Services",
    question: "What services do you offer?",
    answer: "We offer a comprehensive range of ICT services including IT Infrastructure, Software Development, Cybersecurity, Cloud Solutions, IT Consulting, and Managed IT Support. Our team of certified professionals delivers tailored solutions to meet your business needs."
  },
  {
    category: "Consultation",
    question: "How quickly can you respond to inquiries?",
    answer: "We typically respond to all inquiries within 24 hours. For urgent matters, please call us directly or reach out via WhatsApp for immediate assistance."
  },
  {
    category: "Consultation",
    question: "Do you offer free consultations?",
    answer: "Yes, we offer free initial consultations to understand your needs and recommend the best solutions for your business. Schedule a call with our experts today."
  },
  {
    category: "Industries",
    question: "What industries do you serve?",
    answer: "We serve clients across various industries including banking, healthcare, manufacturing, retail, logistics, education, government, and more. Our diverse experience allows us to understand industry-specific challenges."
  },
  {
    category: "Support",
    question: "Do you offer remote support?",
    answer: "Yes, we provide remote IT support services to clients across Nigeria and beyond. Our remote support team is available 24/7 to resolve issues quickly and efficiently."
  },
  {
    category: "Support",
    question: "What are your support hours?",
    answer: "Our standard support hours are Mon-Fri: 8:00 AM - 6:00 PM. We also offer 24/7 emergency support for critical issues through our managed IT support packages."
  },
  {
    category: "Services",
    question: "Do you provide ongoing maintenance?",
    answer: "Absolutely! We offer comprehensive maintenance packages that include regular updates, security patches, performance monitoring, and proactive support to keep your systems running smoothly."
  },
  {
    category: "Consultation",
    question: "How do I get started?",
    answer: "Simply fill out the contact form above, call us, or reach out via WhatsApp. Our team will schedule a consultation to discuss your needs and propose the best solutions."
  }
];

const categoryColors: Record<string, string> = {
  Services: "from-blue-500 to-cyan-500",
  Consultation: "from-purple-500 to-pink-500",
  Support: "from-green-500 to-emerald-500",
  Industries: "from-amber-500 to-orange-500",
};

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [faqCategory, setFaqCategory] = useState("All");
  const [faqSearch, setFaqSearch] = useState("");

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = faqCategory === "All" || faq.category === faqCategory;
    const matchesSearch = faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(faqSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit form");
      }

      setSubmitStatus("success");
      setIsSubmitted(true);
      reset();

      setTimeout(() => {
        setIsSubmitted(false);
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const waLink = generateWhatsAppLink(
    COMPANY_INFO.phoneRaw.replace(/\s/g, ""),
    COMPANY_INFO.whatsappMessage
  );

  const contactInfo = [
    { icon: MapPin, label: "Office Address", value: COMPANY_INFO.address, color: "from-blue-500 to-cyan-500" },
    { icon: Phone, label: "Phone", value: COMPANY_INFO.phone, href: `tel:${COMPANY_INFO.phone}`, color: "from-green-500 to-emerald-500" },
    { icon: Mail, label: "Email", value: COMPANY_INFO.email, href: `mailto:${COMPANY_INFO.email}`, color: "from-purple-500 to-pink-500" },
    { icon: Clock, label: "Business Hours", value: "Mon - Fri: 8:00 AM - 6:00 PM", color: "from-amber-500 to-orange-500" },
  ];

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
              <MessageCircle className="w-4 h-4" />
              Get In Touch
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Let&apos;s Start a<br className="hidden md:block" />
              <span className="text-secondary">Conversation</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Have questions? Our team of experts is ready to help you find the perfect ICT solutions for your business
            </p>
          </motion.div>

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-2 mt-8 text-white/60"
          >
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <span className="text-white">Contact</span>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" className="dark:fill-[#0F172A]" />
          </svg>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white dark:bg-[#0F172A] -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={info.label}
                  href={info.href || "#"}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="block p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:border-transparent shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{info.label}</p>
                  <p className="font-semibold text-primary dark:text-white">{info.value}</p>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Send className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-heading font-bold text-primary dark:text-white">
                    Send us a Message
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">We&apos;ll get back to you within 24 hours</p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <p className="text-green-700 dark:text-green-400 text-sm font-medium">
                      Thank you! Your message has been sent successfully.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1C1C1E] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1C1C1E] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1C1C1E] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="+234 800 000 0000"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company (Optional)
                    </label>
                    <input
                      {...register("company")}
                      type="text"
                      id="company"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1C1C1E] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="Your Company Ltd"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Service Interest *
                    </label>
                    <select
                      {...register("service")}
                      id="service"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1C1C1E] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    >
                      <option value="">Select a service</option>
                      {SERVICE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="mt-1 text-sm text-red-500">{errors.service.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register("message")}
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1C1C1E] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                    placeholder="Tell us about your project or requirements..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>

                {submitStatus === "error" && (
                  <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitStatus === "loading"}
                  className="w-full py-3.5 px-6 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-xl"
                >
                  {submitStatus === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Sidebar Info */}
            <div className="space-y-8">
              {/* WhatsApp Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#25D366] to-[#20BD5A] text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageCircle className="w-8 h-8" />
                    <h3 className="text-xl font-heading font-bold">Quick Chat</h3>
                  </div>
                  <p className="text-white/80 mb-6">
                    Prefer WhatsApp? Send us a message and we&apos;ll respond as soon as possible.
                  </p>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#25D366] font-semibold hover:bg-gray-100 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp
                  </a>
                </div>
              </motion.div>

              {/* Map Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700"
              >
                <h3 className="text-lg font-heading font-bold text-primary dark:text-white mb-4">
                  Visit Our Office
                </h3>
                <div className="aspect-video rounded-2xl bg-gray-100 dark:bg-slate-700 overflow-hidden mb-4">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.647814044066!2d3.379185674839495!3d6.42841499354485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae2aeb4df%3A0x4c477bb1cd8c5a2c!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Globe className="w-4 h-4" />
                  <span>Lagos, Nigeria</span>
                </div>
              </motion.div>

              {/* CAC Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-6 md:p-8 rounded-3xl bg-primary text-white"
              >
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 className="w-6 h-6 text-secondary" />
                  <h3 className="text-lg font-heading font-bold">Legally Registered</h3>
                </div>
                <p className="text-white/80 text-sm mb-2">
                  {COMPANY_INFO.name} is a legally registered company with the Corporate Affairs Commission (CAC).
                </p>
                <p className="font-semibold">RC Number: {COMPANY_INFO.rcNumber}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 -left-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 -right-20 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary dark:text-accent text-sm font-medium mb-4"
            >
              <HelpCircle className="w-4 h-4" />
              FAQ
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
              Find answers to common questions about our services, consultation process, and support options
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full pl-12 pr-10 py-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
              {faqSearch && (
                <button
                  onClick={() => setFaqSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {faqCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFaqCategory(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    faqCategory === category
                      ? "bg-primary text-white shadow-lg shadow-primary/25"
                      : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-primary/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const isOpen = openFaq === index;
                const gradient = categoryColors[faq.category] || "from-primary to-accent";
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="border border-gray-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-800/50"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-5 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-3 pr-4">
                        <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${gradient} text-white text-xs font-medium`}>
                          {faq.category}
                        </span>
                        <span className="font-semibold text-primary dark:text-white">{faq.question}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0"
                      >
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-primary" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-5 pb-5">
                            <div className="pt-3 border-t border-gray-100 dark:border-slate-700">
                              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-primary dark:text-white mb-2">No questions found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </motion.div>
            )}
          </div>

          {/* Still Have Questions CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-primary to-accent text-white text-center"
          >
            <h3 className="text-xl font-heading font-bold mb-2">Still have questions?</h3>
            <p className="text-white/80 mb-6">Can&apos;t find the answer you&apos;re looking for? Our team is here to help.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
