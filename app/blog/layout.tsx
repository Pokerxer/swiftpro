import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Insights | Swift Professional Solutions Limited",
  description:
    "Stay ahead with expert insights on Digital Transformation, Cybersecurity, Cloud Solutions, and IT best practices from Swift Professional Solutions Limited — Nigeria's trusted IT partner.",
  keywords: [
    "IT blog Nigeria",
    "Cybersecurity tips Nigeria",
    "Digital transformation Africa",
    "Cloud solutions insights",
    "IT consulting blog Abuja",
    "tech news Nigeria",
    "Swift Professional Solutions blog",
  ],
  openGraph: {
    title: "Blog & Insights | Swift Professional Solutions Limited",
    description:
      "Expert IT insights on Digital Transformation, Cybersecurity, and Cloud Solutions for Nigerian businesses.",
    type: "website",
    locale: "en_NG",
    siteName: "Swift Professional Solutions Limited",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Insights | Swift Professional Solutions Limited",
    description:
      "Expert IT insights on Digital Transformation, Cybersecurity, and Cloud Solutions for Nigerian businesses.",
  },
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
