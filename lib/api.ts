import axios from "axios";
import { Service, Project, BlogPost, TeamMember, Testimonial, Stat } from "@/types";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5002";

const backendApi = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  timeout: 10000,
});

backendApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.message);
    // Re-throw the error so callers can handle it
    return Promise.reject(error);
  }
);

// Transform backend Service to frontend Service
function transformService(doc: any): Service {
  return {
    id: doc._id?.toString() || "",
    slug: doc.slug || doc.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || "",
    title: doc.title || "",
    category: doc.category || "development",
    shortDescription: doc.shortDescription || doc.description || "",
    fullDescription: doc.fullDescription || doc.description || "",
    icon: doc.icon || "Server",
    features: doc.features || [],
    processSteps: doc.processSteps || [],
  };
}

// Transform backend Project to frontend Project
function transformProject(doc: any): Project {
  return {
    id: doc._id?.toString() || "",
    slug: doc.title?.toLowerCase().replace(/\s+/g, '-') || "",
    title: doc.title || "",
    category: doc.category || "Web",
    description: doc.description || "",
    fullDescription: doc.description || "",
    image: doc.image || "",
    tags: doc.technologies || [],
    link: doc.liveUrl || "",
    client: "",
    year: new Date(doc.createdAt).getFullYear().toString(),
  };
}

// Transform backend Post to frontend BlogPost
function transformBlogPost(doc: any): BlogPost {
  return {
    id: doc._id?.toString() || "",
    slug: doc.slug || "",
    title: doc.title || "",
    excerpt: doc.excerpt || "",
    content: doc.content || "",
    image: doc.image || "",
    author: doc.author || "",
    date: doc.publishedAt ? new Date(doc.publishedAt).toISOString().split('T')[0] : "",
    category: doc.tags?.[0] || "",
    readTime: "",
  };
}

// Transform backend TeamMember to frontend TeamMember
function transformTeamMember(doc: any): TeamMember {
  return {
    id: doc._id?.toString() || "",
    name: doc.name || "",
    role: doc.role || "",
    image: doc.image || "",
    linkedin: doc.linkedin,
  };
}

// Transform backend Testimonial to frontend Testimonial
function transformTestimonial(doc: any): Testimonial {
  return {
    id: doc._id?.toString() || "",
    name: doc.name || "",
    company: doc.company || "",
    role: doc.role || "",
    quote: doc.content || doc.quote || "",
    rating: doc.rating || 5,
    image: doc.avatar || doc.image || "",
  };
}

// Transform backend Stat to frontend Stat
function transformStat(doc: any): Stat {
  return {
    value: doc.value || 0,
    suffix: doc.suffix || "",
    label: doc.label || "",
  };
}

// Services
export async function getServices(): Promise<Service[]> {
  try {
    const response = await backendApi.get("/services");
    return response.data.map(transformService);
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const response = await backendApi.get(`/services/slug/${slug}`);
    return transformService(response.data);
  } catch (error) {
    // Fallback: fetch all and filter (e.g. older records without slug)
    try {
      const response = await backendApi.get<any[]>("/services");
      const services = response.data.map(transformService);
      return services.find((s: Service) => s.slug === slug) || null;
    } catch {
      console.error("Error fetching service by slug:", error);
      return null;
    }
  }
}

// Projects
export async function getProjects(): Promise<Project[]> {
  try {
    const response = await backendApi.get("/projects");
    return response.data.map(transformProject);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const response = await backendApi.get<Project[]>("/projects");
    const projects = response.data.map(transformProject);
    return projects.find((p: Project) => p.slug === slug) || null;
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }
}

// Blog Posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await backendApi.get("/posts");
    return response.data.map(transformBlogPost);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await backendApi.get<BlogPost[]>("/posts");
    const posts = response.data.map(transformBlogPost);
    return posts.find((p: BlogPost) => p.slug === slug) || null;
  } catch (error) {
    console.error("Error fetching blog post by slug:", error);
    return null;
  }
}

// Team Members
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const response = await backendApi.get("/team");
    return response.data.map(transformTeamMember);
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}

// Testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await backendApi.get("/testimonials");
    return response.data.map(transformTestimonial);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

// Stats
export async function getStats(): Promise<Stat[]> {
  try {
    const response = await backendApi.get("/stats");
    return response.data.map(transformStat);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return [];
  }
}

// Company Info - Using a static fallback since backend doesn't have this
export async function getCompanyInfo(): Promise<any> {
  try {
    const response = await backendApi.get("/company");
    return response.data;
  } catch (error) {
    console.error("Error fetching company info:", error);
    // Return default company info
    return {
      name: "SwiftPro Technologies",
      tagline: "Innovating Your Digital Future",
      description: "We deliver cutting-edge IT solutions tailored to your business needs.",
      email: "info@swiftpro.com",
phone: "+234 805 795 5859",
  phoneRaw: "2348057955859",
      whatsappMessage: "Hello, I'm interested in your services.",
      address: "Lagos, Nigeria",
      rcNumber: "8368089",
      foundedYear: 2020,
    };
  }
}

// Hero Slides
export async function getHeroSlides(): Promise<any[]> {
  try {
    const response = await backendApi.get("/hero");
    if (response.data && response.data.slides) {
      return response.data.slides;
    }
    return response.data || [];
  } catch (error) {
    console.error("Error fetching hero slides:", error);
    return [];
  }
}

// FAQs - Return empty since backend doesn't have this endpoint
export async function getFAQs(): Promise<any[]> {
  return [];
}

// Why Choose Us - Return empty since backend doesn't have this endpoint
export async function getWhyChooseUs(): Promise<any[]> {
  return [];
}

// Partners
export async function getPartners(): Promise<any[]> {
  try {
    const response = await backendApi.get("/partners/active");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching partners:", error);
    return [];
  }
}