"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/sections/WhatsAppButton";
import PageHeader from "@/components/shared/PageHeader";
import PortfolioCard from "@/components/shared/PortfolioCard";
import { PROJECTS, PORTFOLIO_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return PROJECTS;
    return PROJECTS.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="Our Portfolio"
          description="Explore our recent projects and see how we've helped businesses transform"
          breadcrumbs={[{ label: "Portfolio" }]}
        />

        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {PORTFOLIO_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={cn(
                    "px-5 py-2 rounded-full text-sm font-medium transition-all",
                    activeFilter === category
                      ? "bg-primary text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary/10"
                  )}
                >
                  {category === "all" ? "All Projects" : category}
                </button>
              ))}
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
                <p className="text-gray-500">No projects found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
