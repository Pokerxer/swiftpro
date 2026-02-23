"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, X, ArrowRight, Calendar, User, Clock, BookOpen,
  PenTool, TrendingUp, Shield, Cloud, Mail, Send
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/sections/WhatsAppButton";
import { BLOG_POSTS } from "@/lib/constants";

const categories = [
  { id: "all", label: "All Posts", icon: BookOpen },
  { id: "Digital Transformation", label: "Digital Transformation", icon: TrendingUp },
  { id: "Cybersecurity", label: "Cybersecurity", icon: Shield },
  { id: "Cloud Solutions", label: "Cloud Solutions", icon: Cloud },
];

const categoryColors: Record<string, string> = {
  "Digital Transformation": "from-blue-500 to-cyan-500",
  "Cybersecurity": "from-red-500 to-orange-500",
  "Cloud Solutions": "from-sky-500 to-blue-500",
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredPosts = useMemo(() => {
    const filtered = BLOG_POSTS.filter((post) => {
      const matchesCategory = activeCategory === "all" || post.category === activeCategory;
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    return filtered;
  }, [activeCategory, searchQuery]);

  const featuredPost = BLOG_POSTS[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

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
              <PenTool className="w-4 h-4" />
              Our Blog
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Insights &<br className="hidden md:block" />
              <span className="text-secondary">Resources</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Stay updated with the latest trends, insights, and expert perspectives on technology and business transformation
            </p>
          </motion.div>

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-2 mt-8 text-white/60"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Blog</span>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" className="dark:fill-[#0F172A]" />
          </svg>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 bg-white dark:bg-[#0F172A] -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent"
          >
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/20 rounded-full blur-3xl" />
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
                backgroundSize: '30px 30px',
              }} />
            </div>
            
            <div className="relative grid lg:grid-cols-2 gap-8 items-center p-8 md:p-12">
              <div className="order-2 lg:order-1">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium mb-4">
                  Featured Post
                </span>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-white/80 mb-6 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-white/70 text-sm mb-6">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {featuredPost.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-semibold hover:bg-gray-100 transition-colors"
                >
                  Read Article
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="order-1 lg:order-2">
                <div className="aspect-video lg:aspect-square rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm flex items-center justify-center">
                  <BookOpen className="w-24 h-24 text-white/50" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-gray-50 dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-4 items-center justify-between"
          >
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeCategory === category.id
                        ? "bg-primary text-white shadow-lg shadow-primary/25"
                        : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-primary/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.label}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-auto min-w-[280px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {filteredPosts.length > 0 ? (
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {filteredPosts.map((post, index) => {
                  const gradient = categoryColors[post.category] || "from-purple-500 to-pink-500";
                  
                  return (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <div className="group h-full rounded-2xl overflow-hidden bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:border-transparent transition-all duration-300 hover:shadow-xl">
                          <div className="relative aspect-[3/2] overflow-hidden">
                            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`} />
                            <div className="absolute inset-0 opacity-20" style={{
                              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                              backgroundSize: '20px 20px',
                            }} />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <BookOpen className="w-7 h-7 text-white" />
                              </div>
                            </div>
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                                {post.category}
                              </span>
                            </div>
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <span className="px-4 py-2 rounded-xl bg-white text-primary font-medium">
                                Read Article
                              </span>
                            </div>
                          </div>
                          <div className="p-5">
                            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                              <span className="flex items-center gap-1">
                                <User className="w-3.5 h-3.5" />
                                {post.author}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {post.date}
                              </span>
                            </div>
                            <h3 className="text-lg font-heading font-semibold text-primary dark:text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock className="w-3.5 h-3.5" />
                                {post.readTime}
                              </span>
                              <motion.div
                                whileHover={{ x: 3 }}
                                className="flex items-center gap-1 text-primary font-semibold text-sm"
                              >
                                Read More
                                <ArrowRight className="w-4 h-4" />
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-primary dark:text-white mb-2">No articles found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-accent relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Mail className="w-12 h-12 text-white/80 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Get the latest insights, trends, and expert perspectives delivered straight to your inbox. No spam, unsubscribe anytime.
            </p>
            
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-white font-medium"
              >
                <Send className="w-5 h-5" />
                Thanks for subscribing!
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-5 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-white text-primary font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                >
                  Subscribe
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
