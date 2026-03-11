import { fetchAPI, getStrapiMedia } from "./strapi";
import { Service, Project, BlogPost, TeamMember, Testimonial, Stat } from "@/types";

interface StrapiService {
  id: number;
  attributes: {
    title: string;
    slug: string;
    shortDescription: string;
    fullDescription: string;
    icon: string;
    features: string[];
    processSteps: { title: string; description: string }[];
  };
}

interface StrapiProject {
  id: number;
  attributes: {
    title: string;
    slug: string;
    category: "Web" | "Infrastructure" | "Software" | "Security";
    description: string;
    fullDescription: string;
    image: { data: { attributes: { url: string } } };
    tags: string[];
    client?: string;
    year?: string;
  };
}

interface StrapiBlogPost {
  id: number;
  attributes: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: { data: { attributes: { url: string } } };
    author: string;
    date: string;
    category: string;
    readTime: string;
  };
}

interface StrapiTeamMember {
  id: number;
  attributes: {
    name: string;
    role: string;
    image: { data: { attributes: { url: string } } };
    linkedin?: string;
  };
}

interface StrapiTestimonial {
  id: number;
  attributes: {
    name: string;
    company: string;
    role: string;
    quote: string;
    rating: number;
    image: { data: { attributes: { url: string } } };
  };
}

interface StrapiStat {
  id: number;
  attributes: {
    value: number;
    suffix: string;
    label: string;
  };
}

function transformService(service: StrapiService): Service {
  return {
    id: String(service.id),
    slug: service.attributes.slug,
    title: service.attributes.title,
    shortDescription: service.attributes.shortDescription,
    fullDescription: service.attributes.fullDescription,
    icon: service.attributes.icon,
    features: service.attributes.features || [],
    processSteps: service.attributes.processSteps || [],
  };
}

function transformProject(project: StrapiProject): Project {
  return {
    id: String(project.id),
    slug: project.attributes.slug,
    title: project.attributes.title,
    category: project.attributes.category,
    description: project.attributes.description,
    fullDescription: project.attributes.fullDescription,
    image: getStrapiMedia(project.attributes.image?.data?.attributes?.url) || "",
    tags: project.attributes.tags || [],
    client: project.attributes.client,
    year: project.attributes.year,
  };
}

function transformBlogPost(post: StrapiBlogPost): BlogPost {
  return {
    id: String(post.id),
    slug: post.attributes.slug,
    title: post.attributes.title,
    excerpt: post.attributes.excerpt,
    content: post.attributes.content,
    image: getStrapiMedia(post.attributes.image?.data?.attributes?.url) || "",
    author: post.attributes.author,
    date: post.attributes.date,
    category: post.attributes.category,
    readTime: post.attributes.readTime,
  };
}

function transformTeamMember(member: StrapiTeamMember): TeamMember {
  return {
    id: String(member.id),
    name: member.attributes.name,
    role: member.attributes.role,
    image: getStrapiMedia(member.attributes.image?.data?.attributes?.url) || "",
    linkedin: member.attributes.linkedin,
  };
}

function transformTestimonial(testimonial: StrapiTestimonial): Testimonial {
  return {
    id: String(testimonial.id),
    name: testimonial.attributes.name,
    company: testimonial.attributes.company,
    role: testimonial.attributes.role,
    quote: testimonial.attributes.quote,
    rating: testimonial.attributes.rating,
    image: getStrapiMedia(testimonial.attributes.image?.data?.attributes?.url) || undefined,
  };
}

function transformStat(stat: StrapiStat): Stat {
  return {
    value: stat.attributes.value,
    suffix: stat.attributes.suffix,
    label: stat.attributes.label,
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
