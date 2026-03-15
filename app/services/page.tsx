import type { Metadata } from "next";
import { getServices } from "@/lib/api";
import { SERVICES } from "@/lib/constants";
import ServicesPageContent from "./ServicesPageContent";

export const metadata: Metadata = {
  title: "Services | Swift Professional Solutions Limited",
  description: "Explore our comprehensive IT services including IT Infrastructure, Software Development, Cybersecurity, Cloud Solutions, IT Consulting, and Managed IT Support.",
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
