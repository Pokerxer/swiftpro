"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, User, ArrowRight } from "lucide-react";
import { BlogPost } from "@/types";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="group h-full rounded-2xl overflow-hidden bg-white dark:bg-[#262626] border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300">
          <div className="relative aspect-[3/2] overflow-hidden bg-gray-100 dark:bg-gray-800">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-medium">
                {post.category}
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
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>
            <h3 className="text-lg font-heading font-semibold text-primary dark:text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
              Read More
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
