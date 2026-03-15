"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1500);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setIsVisible(false);
  };

  if (hasInteracted && !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 100, x: "-50%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-6 left-1/2 z-50 w-[95%] max-w-4xl"
        >
          <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-2xl shadow-primary/10 border border-gray-100 dark:border-slate-700 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Icon */}
              <div className="hidden sm:flex w-14 h-14 bg-primary/10 rounded-2xl items-center justify-center flex-shrink-0">
                <Cookie className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-2">
                  We value your privacy
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  We use cookies and similar technologies to enhance your browsing experience, 
                  provide personalized content, and analyze our traffic. By clicking &quot;Accept All&quot;, 
                  you consent to our use of cookies in accordance with our{" "}
                  <Link href="/privacy-policy" className="text-primary hover:underline font-medium">
                    Privacy Policy
                  </Link>
                  {" "}and{" "}
                  <Link href="/terms" className="text-primary hover:underline font-medium">
                    Terms of Service
                  </Link>
                  . This is compliant with NDPA (Nigeria Data Protection Act).
                </p>
              </div>

              {/* Close Button (for minimal interaction) */}
              <button
                onClick={handleDecline}
                className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors md:hidden"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6 pt-6 border-t border-gray-100 dark:border-slate-700">
              <button
                onClick={handleAccept}
                className="flex-1 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20"
              >
                Accept All Cookies
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 px-6 py-3 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              >
                Decline All
              </button>
              <button
                onClick={() => setHasInteracted(true)}
                className="sm:hidden text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Manage Preferences
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
