"use client";

import { useRouteContext } from "@/hooks/useRouteContext";
import { COMPANY_INFO } from "@/lib/constants";

export default function JSONLD() {
  const pathname = useRouteContext();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_INFO.name,
    url: "https://swiftpro.com.ng",
    logo: "https://swiftpro.com.ng/logo.png",
    description: COMPANY_INFO.description,
    foundingDate: `2026-01-01`,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_INFO.address,
      addressLocality: "Abuja",
      addressCountry: "NG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: COMPANY_INFO.phone,
      contactType: "customer service",
      availableLanguage: ["English"],
    },
    sameAs: [
      "https://facebook.com/swiftpro",
      "https://twitter.com/swiftpro",
      "https://linkedin.com/company/swiftpro",
      "https://instagram.com/swiftpro",
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: COMPANY_INFO.name,
    image: "https://swiftpro.com.ng/logo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_INFO.address,
      addressLocality: "Abuja",
      addressRegion: "FC",
      postalCode: "900001",
      addressCountry: "NG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "9.0765",
      longitude: "7.3986",
    },
    openingHours: "Mo-Fr 08:00-18:00",
    telephone: COMPANY_INFO.phone,
    email: COMPANY_INFO.email,
    priceRange: "$$",
    url: "https://swiftpro.com.ng",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: COMPANY_INFO.name,
    url: "https://swiftpro.com.ng",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://swiftpro.com.ng/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([organizationSchema, localBusinessSchema, websiteSchema]),
      }}
    />
  );
}