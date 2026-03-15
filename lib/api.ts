import axios from "axios";
import { Service, Project, BlogPost, TeamMember, Testimonial, Stat } from "@/types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

const api = axios.create({
  baseURL: `${STRAPI_URL}/api`,
});

function transformService(doc: any): Service {
  return {
    id: doc.id?.toString() || "",
    slug: doc.slug || "",
    title: doc.title || "",
    shortDescription: doc.shortDescription || "",
    fullDescription: doc.fullDescription || "",
    icon: doc.icon || "Server",
    features: doc.features || [],
    processSteps: doc.processSteps || [],
  };
}

function transformProject(doc: any): Project {
  return {
    id: doc.id?.toString() || "",
    slug: doc.slug || "",
    title: doc.title || "",
    category: doc.category || "Web",
    description: doc.description || "",
    fullDescription: doc.fullDescription || "",
    image: doc.image?.url ? `${STRAPI_URL}${doc.image.url}` : "",
    tags: doc.tags || [],
    client: doc.client,
    year: doc.year,
  };
}

function transformBlogPost(doc: any): BlogPost {
  return {
    id: doc.id?.toString() || "",
    slug: doc.slug || "",
    title: doc.title || "",
    excerpt: doc.excerpt || "",
    content: doc.content || "",
    image: doc.image?.url ? `${STRAPI_URL}${doc.image.url}` : "",
    author: doc.author || "",
    date: doc.date || "",
    category: doc.category || "",
    readTime: doc.readTime || "",
  };
}

function transformTeamMember(doc: any): TeamMember {
  return {
    id: doc.id?.toString() || "",
    name: doc.name || "",
    role: doc.role || "",
    image: doc.image?.url ? `${STRAPI_URL}${doc.image.url}` : "",
    linkedin: doc.linkedin,
  };
}

function transformTestimonial(doc: any): Testimonial {
  return {
    id: doc.id?.toString() || "",
    name: doc.name || "",
    company: doc.company || "",
    role: doc.role || "",
    quote: doc.quote || "",
    rating: doc.rating || 5,
    image: doc.image?.url ? `${STRAPI_URL}${doc.image.url}` : undefined,
  };
}

function transformStat(doc: any): Stat {
  return {
    value: doc.value || 0,
    suffix: doc.suffix || "",
    label: doc.label || "",
  };
}

export async function getServices(): Promise<Service[]> {
  try {
    const response = await api.get("/services", { params: { populate: "*" } });
    return response.data.data.map(transformService);
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const response = await api.get("/services", {
      params: {
        "filters[slug][$eq]": slug,
        populate: "*",
      },
    });
    if (!response.data.data.length) return null;
    return transformService(response.data.data[0]);
  } catch (error) {
    console.error("Error fetching service by slug:", error);
    return null;
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const response = await api.get("/projects", { params: { populate: "*" } });
    return response.data.data.map(transformProject);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const response = await api.get("/projects", {
      params: {
        "filters[slug][$eq]": slug,
        populate: "*",
      },
    });
    if (!response.data.data.length) return null;
    return transformProject(response.data.data[0]);
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await api.get("/blog-posts", { params: { populate: "*" } });
    return response.data.data.map(transformBlogPost);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await api.get("/blog-posts", {
      params: {
        "filters[slug][$eq]": slug,
        populate: "*",
      },
    });
    if (!response.data.data.length) return null;
    return transformBlogPost(response.data.data[0]);
  } catch (error) {
    console.error("Error fetching blog post by slug:", error);
    return null;
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const response = await api.get("/team-members", { params: { populate: "*" } });
    return response.data.data.map(transformTeamMember);
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await api.get("/testimonials", { params: { populate: "*" } });
    return response.data.data.map(transformTestimonial);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

export async function getStats(): Promise<Stat[]> {
  try {
    const response = await api.get("/stats", { params: { populate: "*" } });
    return response.data.data.map(transformStat);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return [];
  }
}

export async function getCompanyInfo(): Promise<any> {
  try {
    const response = await api.get("/company-info");
    if (!response.data.data) return null;
    const doc = response.data.data;
    return {
      name: doc.name,
      tagline: doc.tagline,
      description: doc.description,
      email: doc.email,
      phone: doc.phone,
      phoneRaw: doc.phoneRaw,
      whatsappMessage: doc.whatsappMessage,
      address: doc.address,
      rcNumber: doc.rcNumber,
      foundedYear: doc.foundedYear,
    };
  } catch (error) {
    console.error("Error fetching company info:", error);
    return null;
  }
}

export async function getHeroSlides(): Promise<any[]> {
  try {
    const response = await api.get("/hero-slides", {
      params: { populate: "*", sort: "order:asc" },
    });
    return response.data.data.map((doc: any) => ({
      title: doc.title,
      subtitle: doc.subtitle,
      ctaPrimaryText: doc.ctaPrimaryText,
      ctaPrimaryLink: doc.ctaPrimaryLink,
      ctaSecondaryText: doc.ctaSecondaryText,
      ctaSecondaryLink: doc.ctaSecondaryLink,
      backgroundImage: doc.backgroundImage?.url
        ? `${STRAPI_URL}${doc.backgroundImage.url}`
        : "",
      order: doc.order,
    }));
  } catch (error) {
    console.error("Error fetching hero slides:", error);
    return [];
  }
}

export async function getFAQs(): Promise<any[]> {
  try {
    const response = await api.get("/faqs", {
      params: { populate: "*", sort: "order:asc" },
    });
    return response.data.data.map((doc: any) => ({
      id: doc.id?.toString(),
      question: doc.question,
      answer: doc.answer,
      category: doc.category,
      order: doc.order,
    }));
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return [];
  }
}

export async function getWhyChooseUs(): Promise<any[]> {
  try {
    const response = await api.get("/why-choose-ues", { params: { populate: "*" } });
    return response.data.data.map((doc: any) => ({
      title: doc.title,
      description: doc.description,
      icon: doc.icon,
    }));
  } catch (error) {
    console.error("Error fetching why choose us:", error);
    return [];
  }
}