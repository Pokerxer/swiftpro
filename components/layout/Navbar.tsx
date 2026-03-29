"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { 
  Menu, X, Moon, Sun, ChevronDown, Briefcase, Shield, Cloud, 
  Code, Server, Headphones, Search, Bell, Phone, Zap
} from "lucide-react";
import { toggleMobileMenu } from "@/store/slices/uiSlice";
import { RootState } from "@/store";
import { NAV_LINKS, SERVICES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useTheme } from "@/components/providers/ThemeProvider";
import SearchModal from "@/components/shared/SearchModal";
import { Service } from "@/types";

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Server, Code, Shield, Cloud, Briefcase, Headphones
};

export default function Navbar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { isMobileMenuOpen } = useSelector((state: RootState) => state.ui);
  const { isScrolled, scrollDirection, scrollPosition } = useScrollPosition();
  const { theme, toggleTheme } = useTheme();
  const mounted = useMounted();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const isHidden = isScrolled && scrollDirection === "down" && !isMobileMenuOpen;
  const showBg = scrollPosition > 50;

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -120 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          showBg
            ? "bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-2xl shadow-lg shadow-primary/5 border-b border-gray-100 dark:border-slate-800/50"
            : "bg-transparent"
        )}
      >
        {/* Top Bar - Only visible when not scrolled */}
        <AnimatePresence>
          {!showBg && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="hidden xl:block border-b border-gray-200/50 dark:border-slate-800/50 bg-primary/5 dark:bg-primary/10"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-10">
                  <div className="flex items-center gap-6">
                    <a href="tel:+23480079438776" className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
                      <Phone className="w-3.5 h-3.5" />
                      +234 800 SWIFT PRO
                    </a>
                    <span className="text-gray-300 dark:text-slate-600">|</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Mon - Fri: 8:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      We're online
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <Image 
                src="/logo.svg" 
                alt="SwiftPro" 
                width={144}
                height={144}
                className="rounded-xl"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <div key={link.href} className="relative group">
                  {link.href === "/services" ? (
                    <>
                      <button
                        onMouseEnter={() => setServicesOpen(true)}
                        onMouseLeave={() => setServicesOpen(false)}
                        className={cn(
                          "flex items-center gap-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                          pathname.startsWith("/services")
                            ? "text-primary dark:text-white"
                            : "text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                        )}
                      >
                        {link.label}
                        <motion.div
                          animate={{ rotate: servicesOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            onMouseEnter={() => setServicesOpen(true)}
                            onMouseLeave={() => setServicesOpen(false)}
                            className="absolute top-full left-0 mt-3 w-80 p-2 bg-white dark:bg-[#1E293B] rounded-2xl shadow-2xl shadow-primary/10 border border-gray-100 dark:border-slate-700 z-50"
                          >
                            <div className="mb-2 px-3 py-2 flex items-center justify-between">
                              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Our Services</p>
                              <Link href="/services" className="text-xs text-primary hover:text-primary/80 font-medium">
                                View All →
                              </Link>
                            </div>
                            {SERVICES.map((service: Service, index: number) => {
                              const Icon = iconMap[service.icon] || Server;
                              return (
                                <motion.div
                                  key={service.slug}
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.03 }}
                                >
                                  <Link
                                    href={`/services/${service.slug}`}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-primary transition-all group"
                                  >
                                    <div className="w-9 h-9 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                      <Icon className="w-4 h-4 text-primary dark:text-primary-foreground" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <span className="font-medium block truncate">{service.title}</span>
                                      <span className="text-xs text-gray-400 dark:text-gray-500 truncate block">{service.shortDescription}</span>
                                    </div>
                                    <motion.span
                                      initial={{ opacity: 0, x: -4 }}
                                      whileHover={{ opacity: 1, x: 0 }}
                                      className="text-primary"
                                    >
                                      →
                                    </motion.span>
                                  </Link>
                                </motion.div>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <NavLink href={link.href} pathname={pathname}>
                      {link.label}
                    </NavLink>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                <span className="text-sm text-gray-400 hidden lg:block">Search...</span>
                <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-gray-200 dark:bg-slate-700 text-xs text-gray-400 font-mono">
                  ⌘K
                </kbd>
              </motion.button>

              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full" />
              </motion.button>

              {/* Theme Toggle */}
              {mounted && (
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 15 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleTheme}
                  className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                  aria-label="Toggle theme"
                >
                  <motion.div
                    animate={{ rotate: theme === "dark" ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {theme === "light" ? (
                      <Moon className="w-5 h-5 text-gray-600" />
                    ) : (
                      <Sun className="w-5 h-5 text-yellow-400" />
                    )}
                  </motion.div>
                </motion.button>
              )}

              {/* CTA Button */}
              <Link
                href="/contact"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 relative overflow-hidden group"
              >
                <span className="relative z-10">Get Started</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative z-10"
                >
                  →
                </motion.span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => dispatch(toggleMobileMenu())}
                className="xl:hidden p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                aria-label="Toggle menu"
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6 text-primary dark:text-white" />
                  ) : (
                    <Menu className="w-6 h-6 text-primary dark:text-white" />
                  )}
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            onClose={() => dispatch(toggleMobileMenu())}
            pathname={pathname}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function NavLink({ 
  href, 
  pathname, 
  children 
}: { 
  href: string; 
  pathname: string; 
  children: React.ReactNode 
}) {
  const isActive = pathname === href;
  
  return (
    <Link
      href={href}
      className={cn(
        "relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
        isActive
          ? "text-primary dark:text-white"
          : "text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
      )}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute inset-x-4 -bottom-0.5 h-0.5 bg-primary rounded-full"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </Link>
  );
}

function MobileMenu({
  onClose,
  pathname,
  theme,
  onToggleTheme,
}: {
  onClose: () => void;
  pathname: string;
  theme: string;
  onToggleTheme: () => void;
}) {
  const [servicesExpanded, setServicesExpanded] = useState(false);

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Server, Code, Shield, Cloud, Briefcase, Headphones
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 xl:hidden"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <motion.div
        initial={{ x: "100%", opacity: 0.5 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0.5 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-[#0F172A] shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-slate-800">
          <Link href="/" onClick={onClose} className="flex items-center gap-3">
            <Image 
              src="/logo.svg" 
              alt="SwiftPro" 
              width={132}
              height={132}
              className="rounded-lg"
            />
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-100 dark:border-slate-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col h-[calc(100%-140px)] overflow-y-auto">
          <nav className="flex-1 p-4 space-y-1">
            {NAV_LINKS.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {link.href === "/services" ? (
                  <div>
                    <button
                      onClick={() => setServicesExpanded(!servicesExpanded)}
                      className={cn(
                        "flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-base font-medium transition-colors",
                        pathname.startsWith("/services")
                          ? "bg-primary/10 text-primary"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                      )}
                    >
                      {link.label}
                      <motion.div
                        animate={{ rotate: servicesExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {servicesExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-2 py-2 space-y-1">
                            {SERVICES.map((service) => {
                              const Icon = iconMap[service.icon] || Server;
                              return (
                                <Link
                                  key={service.slug}
                                  href={`/services/${service.slug}`}
                                  onClick={onClose}
                                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-primary transition-colors"
                                >
                                  <Icon className="w-4 h-4" />
                                  {service.title}
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      "block px-4 py-3.5 rounded-xl text-base font-medium transition-colors",
                      pathname === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>
                )}
              </motion.div>
            ))}
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-gray-100 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <button
                onClick={onToggleTheme}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700"
              >
                {theme === "light" ? (
                  <>
                    <Moon className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-5 h-5 text-yellow-500" />
                    <span className="text-gray-600 dark:text-gray-300">Light Mode</span>
                  </>
                )}
              </button>
              <Link
                href="/contact"
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-white font-semibold"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
