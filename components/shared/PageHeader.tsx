"use client";

import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  className?: string;
}

export default function PageHeader({
  title,
  description,
  breadcrumbs,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("pt-32 pb-12 md:pt-40 md:pb-16 bg-gray-50 dark:bg-[#1C1C1E]", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <span key={index} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4" />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-primary transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-primary font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-heading font-bold text-primary dark:text-white mb-4"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl"
          >
            {description}
          </motion.p>
        )}
      </div>
    </div>
  );
}
