export interface Service {
  id: string;
  slug: string;
  title: string;
  category: "infrastructure" | "development" | "security" | "consulting";
  shortDescription: string;
  fullDescription: string;
  icon: string;
  features: string[];
  processSteps: { title: string; description: string }[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: "Web" | "Infrastructure" | "Software" | "Security";
  description: string;
  fullDescription: string;
  image: string;
  tags: string[];
  link?: string;
  client?: string;
  year?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  quote: string;
  rating: number;
  image?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  linkedin?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}
