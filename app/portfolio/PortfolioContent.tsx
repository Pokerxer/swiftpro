"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, Code, Shield, Cloud, Server } from "lucide-react";
import PortfolioCard from "@/components/shared/PortfolioCard";
import { PROJECTS } from "@/lib/constants";
import { getProjects } from "@/lib/api";
import { Project } from "@/types";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  label: string;
  icon: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Briefcase, Code, Shield, Cloud, Server
};

export default function PortfolioContent({ categories }: { categories: Category[] }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [loading, setLoading] = useState(true);

  // Fetch from Strapi
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const strapiProjects = await getProjects();
        if (strapiProjects.length > 0) {
          setProjects(strapiProjects);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, projects]);

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Briefcase;
            return (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                  activeFilter === category.id
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-primary/10 border border-gray-100 dark:border-slate-700"
                )}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
        </div>

        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredProjects.map((project, index) => (
            <PortfolioCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}