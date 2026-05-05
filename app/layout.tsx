import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/providers/ReduxProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import BackToTop from "@/components/shared/BackToTop";
import CookieConsent from "@/components/shared/CookieConsent";
import JSONLD from "@/components/shared/JSONLD";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import Analytics from "@/components/shared/Analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://swiftpro.com.ng"),
  title: {
    default: "Swift Professional Solutions Limited | IT Solutions for Nigerian Businesses",
    template: "%s | Swift Professional Solutions Limited",
  },
  description: "Swift Professional Solutions Limited is a CAC-registered ICT company in Abuja, Nigeria — providing Software Development, Cybersecurity, Cloud Solutions, IT Infrastructure and Managed IT Support.",
  keywords: [
    "ICT company Nigeria",
    "IT Solutions Abuja",
    "Software Development Nigeria",
    "Cybersecurity Nigeria",
    "Cloud Solutions Abuja",
    "IT Consulting Nigeria",
    "Managed IT Support",
    "IT Infrastructure Nigeria",
    "CAC registered tech company",
    "Nigerian IT firm",
  ],
  openGraph: {
    title: "Swift Professional Solutions Limited | IT Solutions for Nigerian Businesses",
    description: "Helping Nigerian Businesses Build Secure, Scalable IT Systems. CAC-registered ICT company in Abuja, Nigeria.",
    type: "website",
    url: "/",
    locale: "en_NG",
    siteName: "Swift Professional Solutions Limited",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swift Professional Solutions Limited | IT Solutions for Nigerian Businesses",
    description: "Helping Nigerian Businesses Build Secure, Scalable IT Systems.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JSONLD />
      </head>
      <body
        className={`${inter.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Analytics />
        <ErrorBoundary>
          <ReduxProvider>
            <ThemeProvider>
              {children}
              <BackToTop />
              <CookieConsent />
            </ThemeProvider>
          </ReduxProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
