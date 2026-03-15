"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ 
  items,
  className 
}: { 
  items?: BreadcrumbItem[];
  className?: string;
}) {
  const pathname = usePathname();

  const generatedItems: BreadcrumbItem[] = items || (() => {
    const paths = pathname.split("/").filter(Boolean);
    return paths.map((path, index) => {
      const href = "/" + paths.slice(0, index + 1).join("/");
      const label = path
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return { label, href };
    });
  })();

  return (
    <nav className={cn("flex items-center gap-1 text-sm", className)}>
      <Link
        href="/"
        className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
      >
        <Home className="w-4 h-4" />
        <span className="sr-only md:not-sr-only">Home</span>
      </Link>
      
      {generatedItems.map((item, index) => (
        <div key={item.href || index} className="flex items-center gap-1">
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {index === generatedItems.length - 1 || !item.href ? (
            <span className="text-gray-900 dark:text-white font-medium">
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
