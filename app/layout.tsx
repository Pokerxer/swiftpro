import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/providers/ReduxProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";

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
  title: "Swift Professional Solutions Limited | Driving Digital Transformation Across Nigeria",
  description: "Swift Professional Solutions Limited delivers world-class IT services across Nigeria — from Lagos to Abuja and beyond. IT Infrastructure, Software Development, Cybersecurity, Cloud Solutions, and more.",
  keywords: ["ICT", "IT Solutions", "Nigeria", "Lagos", "Software Development", "Cybersecurity", "Cloud Solutions", "IT Consulting"],
  openGraph: {
    title: "Swift Professional Solutions Limited",
    description: "Driving Digital Transformation Across Nigeria",
    type: "website",
    locale: "en_NG",
    siteName: "Swift Professional Solutions Limited",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ReduxProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
