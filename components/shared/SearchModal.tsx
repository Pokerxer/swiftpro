"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  ArrowRight,
  FileText,
  Briefcase,
  Users,
  Home,
  MessageSquare,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { SERVICES, PROJECTS, BLOG_POSTS, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SearchResult {
  title: string;
  description?: string;
  href: string;
  icon: React.ElementType;
  category: string;
}

const searchData: SearchResult[] = [
  // Services
  {
    title: "IT Infrastructure",
    description: "Robust and scalable IT infrastructure solutions",
    href: "/services/it-infrastructure",
    icon: Briefcase,
    category: "Services",
  },
  {
    title: "Software Development",
    description: "Custom software solutions tailored to your business",
    href: "/services/software-development",
    icon: Briefcase,
    category: "Services",
  },
  {
    title: "Cybersecurity",
    description: "Comprehensive security solutions to protect your digital assets",
    href: "/services/cybersecurity",
    icon: Briefcase,
    category: "Services",
  },
  {
    title: "Cloud Solutions",
    description: "Scalable cloud services for modern business",
    href: "/services/cloud-solutions",
    icon: Briefcase,
    category: "Services",
  },
  {
    title: "IT Consulting",
    description: "Strategic IT guidance to drive business transformation",
    href: "/services/it-consulting",
    icon: Briefcase,
    category: "Services",
  },
  {
    title: "Managed IT Support",
    description: "Reliable managed IT services to keep your business running",
    href: "/services/managed-it-support",
    icon: Briefcase,
    category: "Services",
  },
  // Pages
  {
    title: "Home",
    description: "Welcome to SwiftPro",
    href: "/",
    icon: Home,
    category: "Pages",
  },
  {
    title: "About Us",
    description: "Learn more about our company",
    href: "/about",
    icon: Users,
    category: "Pages",
  },
  {
    title: "Services",
    description: "Explore our IT services",
    href: "/services",
    icon: Briefcase,
    category: "Pages",
  },
  {
    title: "Portfolio",
    description: "View our past projects",
    href: "/portfolio",
    icon: Briefcase,
    category: "Pages",
  },
  {
    title: "Blog",
    description: "Latest news and insights",
    href: "/blog",
    icon: FileText,
    category: "Pages",
  },
  {
    title: "Contact",
    description: "Get in touch with us",
    href: "/contact",
    icon: MessageSquare,
    category: "Pages",
  },
  {
    title: "Privacy Policy",
    description: "Our privacy policy",
    href: "/privacy-policy",
    icon: FileText,
    category: "Pages",
  },
  {
    title: "Terms of Service",
    description: "Our terms of service",
    href: "/terms",
    icon: FileText,
    category: "Pages",
  },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const search = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      const lowerQuery = searchQuery.toLowerCase();
      const filtered = searchData.filter(
        (item) =>
          item.title?.toLowerCase().includes(lowerQuery) ||
          item.description?.toLowerCase().includes(lowerQuery) ||
          (item.category && item.category.toLowerCase().includes(lowerQuery))
      );
      setResults(filtered.slice(0, 8));
      setSelectedIndex(0);
    },
    []
  );

  useEffect(() => {
    search(query);
  }, [query, search]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : results.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (results[selectedIndex]) {
            router.push(results[selectedIndex].href);
            onClose();
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, router, onClose]);

  useEffect(() => {
    const selectedElement = resultsRef.current?.children[selectedIndex] as HTMLElement;
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.category]) {
      acc[result.category] = [];
    }
    acc[result.category].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4"
          >
            <div className="bg-white dark:bg-[#0F172A] rounded-2xl shadow-2xl shadow-primary/10 border border-gray-100 dark:border-slate-700 overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-slate-700">
                <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search services, pages, projects..."
                  className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none text-lg"
                />
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Results */}
              <div ref={resultsRef} className="max-h-[60vh] overflow-y-auto">
                {query && results.length === 0 && (
                  <div className="px-5 py-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-slate-800 mb-4">
                      <Sparkles className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                      No results found for &quot;{query}&quot;
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                      Try searching for services, pages, or contact
                    </p>
                  </div>
                )}

                {!query && (
                  <div className="px-5 py-8">
                    <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">
                      Quick links
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {NAV_LINKS.slice(0, 4).map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={onClose}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                        >
                          <ArrowRight className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {link.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {Object.entries(groupedResults).map(([category, items]) => (
                  <div key={category} className="px-2 py-2">
                    <div className="px-3 py-2">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {category}
                      </p>
                    </div>
                    {items.map((result, idx) => {
                      const globalIndex = results.findIndex(
                        (r) => r.href === result.href
                      );
                      const Icon = result.icon;
                      return (
                        <Link
                          key={result.href}
                          href={result.href}
                          onClick={onClose}
                          className={cn(
                            "flex items-center gap-4 px-4 py-3 rounded-xl mx-2 transition-colors",
                            globalIndex === selectedIndex
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-gray-50 dark:hover:bg-slate-800"
                          )}
                        >
                          <div
                            className={cn(
                              "w-10 h-10 rounded-lg flex items-center justify-center",
                              globalIndex === selectedIndex
                                ? "bg-primary/20"
                                : "bg-gray-100 dark:bg-slate-800"
                            )}
                          >
                            <Icon
                              className={cn(
                                "w-5 h-5",
                                globalIndex === selectedIndex
                                  ? "text-primary"
                                  : "text-gray-500 dark:text-gray-400"
                              )}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 dark:text-white truncate">
                              {result.title}
                            </p>
                            {result.description && (
                              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {result.description}
                              </p>
                            )}
                          </div>
                          {globalIndex === selectedIndex && (
                            <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-slate-700 font-mono">
                        ↑
                      </kbd>
                      <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-slate-700 font-mono">
                        ↓
                      </kbd>
                      <span>to navigate</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-slate-700 font-mono">
                        ↵
                      </kbd>
                      <span>to select</span>
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-slate-700 font-mono">
                      esc
                    </kbd>
                    <span>to close</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function SearchTrigger() {
  return (
    <span className="text-xs text-gray-400">
      <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-slate-700 font-mono">
        ⌘
      </kbd>
      <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-slate-700 font-mono ml-0.5">
        K
      </kbd>
    </span>
  );
}