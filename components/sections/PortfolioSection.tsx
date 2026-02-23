"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Layers, Server, Code, Lock, Eye, 
  Calendar, Building2, ArrowUpRight, Filter
} from "lucide-react";
import { PROJECTS } from "@/lib/constants";

const categoryIcons = {
  Web: Code,
  Infrastructure: Server,
  Software: Layers,
  Security: Lock,
};

const categories = ["all", "Web", "Infrastructure", "Software", "Security"] as const;

const projects = PROJECTS.map(p => ({
  ...p,
  gradient: {
    Web: "from-blue-500 to-cyan-500",
    Infrastructure: "from-sky-500 to-blue-500",
    Software: "from-purple-500 to-pink-500",
    Security: "from-red-500 to-orange-500",
  }[p.category]
}));

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section className="py-20 md:py-32 bg-white dark:bg-[#0F172A] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 -left-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 -right-40 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl" />
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary dark:text-accent text-sm font-medium mb-4"
          >
            <Eye className="w-4 h-4" />
            Our Portfolio
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary dark:text-white mb-6">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Explore our recent work delivering exceptional results for clients across Nigeria
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "text-white"
                  : "text-gray-600 dark:text-gray-300 hover:text-primary"
              }`}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="portfolio-category"
                  className="absolute inset-0 bg-primary rounded-xl"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {category === "all" ? <Filter className="w-4 h-4" /> : 
                  category === "Web" ? <Code className="w-4 h-4" /> :
                  category === "Infrastructure" ? <Server className="w-4 h-4" /> :
                  category === "Software" ? <Layers className="w-4 h-4" /> :
                  <Lock className="w-4 h-4" />
                }
                {category === "all" ? "All Projects" : category}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const Icon = categoryIcons[project.category] || Layers;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="group h-full rounded-3xl overflow-hidden bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:border-transparent transition-all duration-500">
                    {/* Image Area */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-90`} />
                      
                      {/* Grid Pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <div 
                          className="absolute inset-0"
                          style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                            backgroundSize: '20px 20px',
                          }}
                        />
                      </div>

                      {/* Center Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{ 
                            scale: hoveredProject === project.id ? 1.1 : 1,
                            rotate: hoveredProject === project.id ? 5 : 0
                          }}
                          className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
                        >
                          <Icon className="w-10 h-10 text-white" />
                        </motion.div>
                      </div>

                      {/* Hover Overlay */}
                      <AnimatePresence>
                        {hoveredProject === project.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
                          >
                            <Link
                              href="/portfolio"
                              className="px-6 py-3 rounded-xl bg-white text-primary font-semibold flex items-center gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              View Details
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1.5">
                          <Icon className="w-3.5 h-3.5" />
                          {project.category}
                        </span>
                      </div>

                      {/* Year Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {project.year}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-heading font-bold text-primary dark:text-white mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Client */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-primary dark:text-white">{project.client}</span>
                        </div>
                        <motion.div
                          whileHover={{ x: 3 }}
                          className="flex items-center gap-1 text-primary text-sm font-medium"
                        >
                          Details
                          <ArrowUpRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1"
          >
            View All Projects
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
