"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, MessageSquare } from "lucide-react";
import WhatsAppButton from "@/components/sections/WhatsAppButton";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-[#0F172A] dark:via-[#1E293B] dark:to-[#0F172A] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230A2463' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 text-center max-w-2xl">
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative mb-8"
        >
          <span className="text-[180px] md:text-[220px] font-heading font-black text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary to-accent leading-none select-none">
            404
          </span>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-28 md:h-28 bg-white dark:bg-[#1E293B] rounded-full shadow-2xl shadow-primary/20 flex items-center justify-center"
          >
            <Search className="w-10 h-10 md:w-12 md:h-12 text-primary" />
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Oops! The page you&apos;re looking for seems to have wandered off. 
            Let&apos;s get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 group"
            >
              <motion.span
                animate={{ x: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Home className="w-5 h-5" />
              </motion.span>
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-primary hover:text-primary transition-all duration-300 group"
            >
              <MessageSquare className="w-5 h-5" />
              Contact Support
            </Link>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-flex flex-wrap items-center justify-center gap-3"
          >
            <span className="text-sm text-gray-500 dark:text-gray-400">Quick links:</span>
            <Link
              href="/services"
              className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Services
            </Link>
            <span className="text-gray-300 dark:text-slate-600">•</span>
            <Link
              href="/about"
              className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
            >
              About Us
            </Link>
            <span className="text-gray-300 dark:text-slate-600">•</span>
            <Link
              href="/portfolio"
              className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Portfolio
            </Link>
            <span className="text-gray-300 dark:text-slate-600">•</span>
            <Link
              href="/blog"
              className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Blog
            </Link>
          </motion.div>
        </motion.div>

        {/* Back Button */}
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => window.history.back()}
          className="mt-8 inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Go back to previous page</span>
        </motion.button>
      </div>

      <WhatsAppButton />
    </div>
  );
}
