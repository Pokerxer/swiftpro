import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Swift Professional Solutions Limited",
  description:
    "Learn about Swift Professional Solutions Limited — a CAC-registered ICT company in Abuja, Nigeria, dedicated to empowering businesses with innovative IT solutions, infrastructure, and cybersecurity services.",
  keywords: [
    "About Swift Professional Solutions",
    "ICT company Abuja",
    "CAC registered IT company Nigeria",
    "IT consulting firm Abuja",
    "Nigerian tech company",
    "IT infrastructure Nigeria",
  ],
  openGraph: {
    title: "About Us | Swift Professional Solutions Limited",
    description:
      "Meet the team behind Swift Professional Solutions Limited — delivering reliable IT solutions to Nigerian businesses since 2026.",
    type: "website",
    locale: "en_NG",
    siteName: "Swift Professional Solutions Limited",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Swift Professional Solutions Limited",
    description:
      "CAC-registered ICT company in Abuja, Nigeria — empowering businesses with innovative IT solutions.",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
