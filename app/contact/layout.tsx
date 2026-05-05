import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Swift Professional Solutions Limited",
  description:
    "Get in touch with Swift Professional Solutions Limited. Contact our Abuja-based ICT team for Software Development, Cybersecurity, Cloud Solutions, IT Infrastructure, and Managed IT Support inquiries.",
  keywords: [
    "contact IT company Abuja",
    "hire IT consultant Nigeria",
    "Swift Professional Solutions contact",
    "IT support Abuja Nigeria",
    "software development inquiry Nigeria",
    "cybersecurity consultation Abuja",
  ],
  openGraph: {
    title: "Contact Us | Swift Professional Solutions Limited",
    description:
      "Reach out to our expert IT team in Abuja, Nigeria. We're ready to help with all your technology needs.",
    type: "website",
    locale: "en_NG",
    siteName: "Swift Professional Solutions Limited",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Swift Professional Solutions Limited",
    description:
      "Reach out to our expert IT team in Abuja, Nigeria. We're ready to help with all your technology needs.",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
