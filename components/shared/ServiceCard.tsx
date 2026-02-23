"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Server, Code, Shield, Cloud, Briefcase, Headphones } from "lucide-react";
import { Service } from "@/types";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Server,
  Code,
  Shield,
  Cloud,
  Briefcase,
  Headphones,
};

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Server;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/services/${service.slug}`}>
        <div className="h-full p-6 md:p-8 rounded-2xl bg-white dark:bg-[#262626] border border-gray-100 dark:border-gray-800 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
            <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-xl font-heading font-semibold text-primary dark:text-white mb-3 group-hover:text-primary transition-colors">
            {service.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {service.shortDescription}
          </p>
          <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
            Learn More
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
