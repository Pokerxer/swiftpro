import { MetadataRoute } from "next";
import { SERVICES, PROJECTS, BLOG_POSTS } from "@/lib/constants";

const now = new Date();

const staticRoutes: { route: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { route: "", priority: 1.0, changeFrequency: "weekly" },
  { route: "/services", priority: 0.9, changeFrequency: "weekly" },
  { route: "/about", priority: 0.8, changeFrequency: "monthly" },
  { route: "/portfolio", priority: 0.8, changeFrequency: "weekly" },
  { route: "/blog", priority: 0.8, changeFrequency: "daily" },
  { route: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { route: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { route: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://swiftpro.com.ng";

  const staticEntries = staticRoutes.map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const serviceEntries = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const portfolioEntries = PROJECTS.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogEntries = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...serviceEntries, ...portfolioEntries, ...blogEntries];
}
