import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cargolandfood.com";
  
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/payment-successful/",
          "/wallet/",
          "/*?*", // Disallow URLs with query parameters to avoid duplicate content
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/payment-successful/", "/wallet/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
