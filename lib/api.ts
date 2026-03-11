import { fetchAPI, getStrapiMedia } from "./strapi";
import { Service, Project, BlogPost, TeamMember, Testimonial, Stat } from "@/types";

interface StrapiService {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  features: string[];
  processSteps: { title: string; description: string }[];
}

interface StrapiProject {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  category: "Web" | "Infrastructure" | "Software" | "Security";
  description: string;
  fullDescription: string;
  image?: { url: string };
  tags: string[];
  client?: string;
  year?: string;
}

interface StrapiBlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: { url: string };
  author: string;
  date: string;
  category: string;
  readTime: string;
}

interface StrapiTeamMember {
  id: number;
  documentId: string;
  name: string;
  role: string;
  image?: { url: string };
  linkedin?: string;
}

interface StrapiTestimonial {
  id: number;
  documentId: string;
  name: string;
  company: string;
  role: string;
  quote: string;
  rating: number;
  image?: { url: string };
}

interface StrapiStat {
  id: number;
  documentId: string;
  value: number;
  suffix: string;
  label: string;
}

// New interfaces for additional content types
interface StrapiCompanyInfo {
  id: number;
  documentId: string;
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  phoneRaw: string;
  whatsappMessage: string;
  address: string;
  rcNumber: string;
  foundedYear: number;
}

interface StrapiHeroSlide {
  id: number;
  documentId: string;
  title: string;
  subtitle: string;
  ctaPrimaryText?: string;
  ctaPrimaryLink?: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
  backgroundImage?: { url: string };
  order?: number;
}

interface StrapiFAQ {
  id: number;
  documentId: string;
  question: string;
  answer: string;
  category: string;
  order?: number;
}

interface StrapiWhyChooseUs {
  id: number;
  documentId: string;
  title: string;
  description: string;
  icon: string;
}

function transformService(service: StrapiService): Service {
  return {
    id: String(service.id),
    slug: service.slug,
    title: service.title,
    shortDescription: service.shortDescription,
    fullDescription: service.fullDescription,
    icon: service.icon,
    features: service.features || [],
    processSteps: service.processSteps || [],
  };
}

function transformProject(project: StrapiProject): Project {
  return {
    id: String(project.id),
    slug: project.slug,
    title: project.title,
    category: project.category,
    description: project.description,
    fullDescription: project.fullDescription,
    image: getStrapiMedia(project.image?.url || null) || "",
    tags: project.tags || [],
    client: project.client,
    year: project.year,
  };
}

function transformBlogPost(post: StrapiBlogPost): BlogPost {
  return {
    id: String(post.id),
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    image: getStrapiMedia(post.image?.url || null) || "",
    author: post.author,
    date: post.date,
    category: post.category,
    readTime: post.readTime,
  };
}

function transformTeamMember(member: StrapiTeamMember): TeamMember {
  return {
    id: String(member.id),
    name: member.name,
    role: member.role,
    image: getStrapiMedia(member.image?.url || null) || "",
    linkedin: member.linkedin,
  };
}

function transformTestimonial(testimonial: StrapiTestimonial): Testimonial {
  return {
    id: String(testimonial.id),
    name: testimonial.name,
    company: testimonial.company,
    role: testimonial.role,
    quote: testimonial.quote,
    rating: testimonial.rating,
    image: getStrapiMedia(testimonial.image?.url || null) || undefined,
  };
}

function transformStat(stat: StrapiStat): Stat {
  return {
    value: stat.value,
    suffix: stat.suffix,
    label: stat.label,
  };
}

// New transform functions
function transformCompanyInfo(info: StrapiCompanyInfo): any {
  return {
    name: info.name,
    tagline: info.tagline,
    description: info.description,
    email: info.email,
    phone: info.phone,
    phoneRaw: info.phoneRaw,
    whatsappMessage: info.whatsappMessage,
    address: info.address,
    rcNumber: info.rcNumber,
    foundedYear: info.foundedYear,
  };
}

function transformHeroSlide(slide: StrapiHeroSlide): any {
  return {
    title: slide.title,
    subtitle: slide.subtitle,
    ctaPrimaryText: slide.ctaPrimaryText,
    ctaPrimaryLink: slide.ctaPrimaryLink,
    ctaSecondaryText: slide.ctaSecondaryText,
    ctaSecondaryLink: slide.ctaSecondaryLink,
    backgroundImage: getStrapiMedia(slide.backgroundImage?.url || null),
    order: slide.order,
  };
}

function transformFAQ(faq: StrapiFAQ): any {
  return {
    id: String(faq.id),
    question: faq.question,
    answer: faq.answer,
    category: faq.category,
    order: faq.order,
  };
}

function transformWhyChooseUs(item: StrapiWhyChooseUs): any {
  return {
    title: item.title,
    description: item.description,
    icon: item.icon,
  };
}

export async function getServices(): Promise<Service[]> {
  try {
    const services = await fetchAPI<StrapiService[]>("/services", {
      populate: "*",
      sort: ["id:asc"],
    });
    return services.map(transformService);
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const services = await fetchAPI<StrapiService[]>("/services", {
      filters: { slug: { $eq: slug } },
      populate: "*",
    });
    if (services.length === 0) return null;
    return transformService(services[0]);
  } catch (error) {
    console.error("Error fetching service by slug:", error);
    return null;
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const projects = await fetchAPI<StrapiProject[]>("/projects", {
      populate: "image",
      sort: ["id:asc"],
    });
    return projects.map(transformProject);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const projects = await fetchAPI<StrapiProject[]>("/projects", {
      filters: { slug: { $eq: slug } },
      populate: "image",
    });
    if (projects.length === 0) return null;
    return transformProject(projects[0]);
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await fetchAPI<StrapiBlogPost[]>("/blog-posts", {
      populate: "image",
      sort: ["date:desc"],
    });
    return posts.map(transformBlogPost);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const posts = await fetchAPI<StrapiBlogPost[]>("/blog-posts", {
      filters: { slug: { $eq: slug } },
      populate: "image",
    });
    if (posts.length === 0) return null;
    return transformBlogPost(posts[0]);
  } catch (error) {
    console.error("Error fetching blog post by slug:", error);
    return null;
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const members = await fetchAPI<StrapiTeamMember[]>("/team-members", {
      populate: "image",
      sort: ["id:asc"],
    });
    return members.map(transformTeamMember);
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const testimonials = await fetchAPI<StrapiTestimonial[]>("/testimonials", {
      populate: "image",
      sort: ["id:asc"],
    });
    return testimonials.map(transformTestimonial);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

export async function getStats(): Promise<Stat[]> {
  try {
    const stats = await fetchAPI<StrapiStat[]>("/stats", {
      sort: ["id:asc"],
    });
    return stats.map(transformStat);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return [];
  }
}

// New API functions
export async function getCompanyInfo(): Promise<any> {
  try {
    const info = await fetchAPI<StrapiCompanyInfo[]>("/company-infos", {
      sort: ["id:asc"],
    });
    if (info.length === 0) return null;
    return transformCompanyInfo(info[0]);
  } catch (error) {
    console.error("Error fetching company info:", error);
    return null;
  }
}

export async function getHeroSlides(): Promise<any[]> {
  try {
    const slides = await fetchAPI<StrapiHeroSlide[]>("/hero-slides", {
      populate: "backgroundImage",
      sort: ["order:asc"],
    });
    return slides.map(transformHeroSlide);
  } catch (error) {
    console.error("Error fetching hero slides:", error);
    return [];
  }
}

export async function getFAQs(): Promise<any[]> {
  try {
    const faqs = await fetchAPI<StrapiFAQ[]>("/faqs", {
      sort: ["order:asc"],
    });
    return faqs.map(transformFAQ);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return [];
  }
}

export async function getWhyChooseUs(): Promise<any[]> {
  try {
    const items = await fetchAPI<StrapiWhyChooseUs[]>("/why-choose-uss", {
      sort: ["id:asc"],
    });
    return items.map(transformWhyChooseUs);
  } catch (error) {
    console.error("Error fetching why choose us:", error);
    return [];
  }
}
