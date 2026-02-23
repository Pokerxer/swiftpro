"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Testimonial } from "@/types";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export default function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <div className="h-full p-6 md:p-8 rounded-2xl bg-white dark:bg-[#262626] border border-gray-100 dark:border-gray-800 relative">
        <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold">
              {testimonial.name.charAt(0)}
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-primary dark:text-white">
              {testimonial.name}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
