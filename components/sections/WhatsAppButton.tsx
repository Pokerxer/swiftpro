"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";
import { generateWhatsAppLink } from "@/lib/utils";

export default function WhatsAppButton() {
  const waLink = generateWhatsAppLink(
    COMPANY_INFO.phoneRaw.replace(/\s/g, ""),
    COMPANY_INFO.whatsappMessage
  );

  return (
    <motion.a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="relative group">
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
        <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
          <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white" />
        </div>
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#1C1C1E] dark:bg-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          <p className="text-xs text-white dark:text-[#1C1C1E] font-medium">
            Chat with us on WhatsApp
          </p>
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-0">
            <div className="border-8 border-transparent border-l-[#1C1C1E] dark:border-l-white" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}
