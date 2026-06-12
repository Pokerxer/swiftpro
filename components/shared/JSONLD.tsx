"use client";

import { useRouteContext } from "@/hooks/useRouteContext";
import { SERVICES } from "@/lib/constants";
import { DEFAULT_COMPANY_INFO } from "@/lib/company-info";
import { CompanyInfo } from "@/types";

export default function JSONLD({
  companyInfo = DEFAULT_COMPANY_INFO,
}: {
  companyInfo?: CompanyInfo;
}) {
  const pathname = useRouteContext();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyInfo.name,
    url: "https://swiftpro.com.ng",
    logo: "https://swiftpro.com.ng/logo.png",
    description: companyInfo.description,
    foundingDate: `2026-01-01`,
    address: {
      "@type": "PostalAddress",
      streetAddress: companyInfo.address,
      addressLocality: "Abuja",
      addressCountry: "NG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: companyInfo.phone,
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
    name: companyInfo.name,
    image: "https://swiftpro.com.ng/logo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: companyInfo.address,
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
    telephone: companyInfo.phone,
    email: companyInfo.email,
    priceRange: "$$",
    url: "https://swiftpro.com.ng",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: companyInfo.name,
    url: "https://swiftpro.com.ng",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://swiftpro.com.ng/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const serviceCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "IT Services by Swift Professional Solutions Limited",
    description: "Comprehensive ICT services for Nigerian businesses",
    url: "https://swiftpro.com.ng/services",
    itemListElement: SERVICES.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.shortDescription,
        url: `https://swiftpro.com.ng/services/${service.slug}`,
        provider: {
          "@type": "Organization",
          name: companyInfo.name,
          url: "https://swiftpro.com.ng",
        },
        areaServed: {
          "@type": "Country",
          name: "Nigeria",
        },
      },
    })),
  };

  const breadcrumbSchema = pathname && pathname !== "/"
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://swiftpro.com.ng",
          },
          ...pathname
            .split("/")
            .filter(Boolean)
            .map((segment, index, arr) => ({
              "@type": "ListItem",
              position: index + 2,
              name: segment
                .split("-")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" "),
              item: `https://swiftpro.com.ng/${arr.slice(0, index + 1).join("/")}`,
            })),
        ],
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceCatalogSchema) }}
      />
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
    </>
  );
}