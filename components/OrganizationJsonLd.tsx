export default function OrganizationJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cargolandfood.com";
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CargolandFood",
    url: siteUrl,
    logo: `${siteUrl}/logo-full.webp`,
    description: "Order food online from top restaurants, groceries, and vendors across Nigeria. Fast delivery to Lagos, Abuja, Ibadan, Port Harcourt & more.",
    email: "info@cargolandfood.com",
    telephone: "+234-817-908-1262",
    address: {
      "@type": "PostalAddress",
      addressCountry: "NG",
    },
    sameAs: [
      "https://x.com/cargolandfoods",
      "https://www.instagram.com/officialcargolandfood",
      "https://facebook.com/cargolandfoods/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+234-817-908-1262",
      email: "info@cargolandfood.com",
      contactType: "Customer Service",
      areaServed: "NG",
      availableLanguage: ["en"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
