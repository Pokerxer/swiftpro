"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, Quote, ChevronLeft, ChevronRight, 
  Building2, MessageCircle, ThumbsUp, Award
} from "lucide-react";
import { Testimonial } from "@/types";
import { getTestimonials } from "@/lib/api";

const fallbackTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Dr. Adedamola Okonkwo",
    company: "Reddington Hospital",
    role: "Chief Medical Director",
    quote: "Swift Professional Solutions transformed our hospital operations with their comprehensive IT solution. Their team was professional, knowledgeable, and delivered beyond our expectations. The system improved our efficiency by 40%.",
    rating: 5,
  },
  {
    id: "2",
    name: "Mr. Chukwuemeka Nwachukwu",
    company: "Heritage Bank",
    role: "Head of Digital Banking",
    quote: "The fintech mobile app they developed has been instrumental in our digital transformation journey. User adoption exceeded 150% of our targets. Their technical expertise is unmatched in the industry.",
    rating: 5,
  },
  {
    id: "3",
    name: "Mrs. Folake Adeyemi",
    company: "Shoprite Nigeria",
    role: "E-Commerce Director",
    quote: "Our online sales increased by 300% after launching the new e-commerce platform. The team's attention to detail and technical expertise is unmatched. They're true partners in our success.",
    rating: 5,
  },
  {
    id: "4",
    name: "Mr. Olumide Williams",
    company: "Manufacturing Corp Nigeria",
    role: "CEO",
    quote: "The ERP system has revolutionized how we operate. Inventory turnover improved by 45% and we have real-time visibility into all our operations. Best investment we made.",
    rating: 5,
  },
  {
    id: "5",
    name: "Mr. Ibrahim Suleiman",
    company: "First Bank Nigeria",
    role: "CISO",
    quote: "Their cybersecurity expertise is world-class. They identified vulnerabilities we didn't know existed and secured our infrastructure comprehensively. Professional and thorough.",
    rating: 5,
  },
];

const stats = [
  { icon: Building2, value: "200+", label: "Clients" },
  { icon: ThumbsUp, value: "98%", label: "Satisfaction" },
  { icon: Award, value: "50+", label: "Industries" },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const strapiTestimonials = await getTestimonials();
        if (strapiTestimonials.length > 0) {
          setTestimonials(strapiTestimonials);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    
    fetchTestimonials();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    intervalRef.current = setInterval(nextSlide, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying]);

  return (
    <section 
      className="py-20 md:py-32 bg-gray-50 dark:bg-[#0F172A] relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />
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
            <MessageCircle className="w-4 h-4" />
            Testimonials
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary dark:text-white mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Trusted by leading organizations across Nigeria and beyond
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white dark:bg-slate-800 shadow-lg"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xl font-bold text-primary dark:text-white">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 hidden md:flex"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 hidden md:flex"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Main Card */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden">
                  {/* Quote Background */}
                  <div className="h-3 bg-gradient-to-r from-primary via-accent to-secondary" />
                  
                  <div className="p-8 md:p-12">
                    {/* Quote Icon */}
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                        <Quote className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Stars */}
                      <div className="flex gap-1">
                        {[...Array(testimonials[currentIndex]?.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>

                    {/* Quote Text */}
                    <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed mb-10 italic">
                      &ldquo;{testimonials[currentIndex]?.quote}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-6 border-t border-gray-100 dark:border-slate-700">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-xl">
                          {testimonials[currentIndex]?.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-primary dark:text-white text-lg">
                          {testimonials[currentIndex]?.name}
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400">
                          {testimonials[currentIndex]?.role}
                        </p>
                        <p className="text-primary dark:text-accent font-medium">
                          {testimonials[currentIndex]?.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="group relative"
              >
                <div 
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? "bg-primary w-8" 
                      : "bg-gray-300 dark:bg-slate-600 hover:bg-primary/60"
                  }`}
                />
                {currentIndex === index && (
                  <motion.div
                    layoutId="testimonial-dot"
                    className="absolute inset-0 bg-primary/20 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Ready to join our satisfied clients?
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-secondary text-white font-semibold hover:bg-secondary/90 transition-colors shadow-lg shadow-secondary/25"
          >
            Get Started Today
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
