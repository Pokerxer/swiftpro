import type { Metadata } from "next";
import { getServices } from "@/lib/api";
import { SERVICES } from "@/lib/constants";
import ServicesPageContent from "./ServicesPageContent";

export const metadata: Metadata = {
  title: "IT Services | Swift Professional Solutions Limited",
  description: "Explore our comprehensive IT services including IT Infrastructure, Software Development, Cybersecurity, Cloud Solutions, IT Consulting, and Managed IT Support for Nigerian businesses.",
  keywords: [
    "IT services Nigeria",
    "software development Abuja",
    "cybersecurity services Nigeria",
    "cloud solutions Abuja",
    "IT infrastructure Nigeria",
    "managed IT support",
    "IT consulting Abuja",
  ],
  openGraph: {
    title: "IT Services | Swift Professional Solutions Limited",
    description: "Comprehensive ICT services for Nigerian businesses — Software Development, Cybersecurity, Cloud Solutions, IT Infrastructure, and more.",
    type: "website",
    locale: "en_NG",
    siteName: "Swift Professional Solutions Limited",
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Services | Swift Professional Solutions Limited",
    description: "Comprehensive ICT services for Nigerian businesses.",
  },
  alternates: {
    canonical: "/services",
  },
};

export const revalidate = 60;

export default async function ServicesPage() {
  let services = SERVICES;
  
  try {
    const strapiServices = await getServices();
    if (strapiServices.length > 0) {
      services = strapiServices;
    }
  } catch (error) {
    console.error("Error fetching services:", error);
  }

  return <ServicesPageContent services={services} />;
}
