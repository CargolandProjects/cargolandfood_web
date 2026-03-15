import { MetadataRoute } from "next";
import { vendors } from "@/lib/services/vendors.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cargolandfood.com";
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // Dynamic vendor pages
  let vendorPages: MetadataRoute.Sitemap = [];
  
  try {
    // Fetch vendors from all zones or use a default zone
    // TODO: Update with your actual zone ID or fetch from multiple zones
    const zoneId = process.env.NEXT_PUBLIC_DEFAULT_ZONE_ID || "default-zone";
    const vendorsData = await vendors.getAllVendors(zoneId, 1, 100);
    
    vendorPages = vendorsData.vendors.map((vendor) => ({
      url: `${siteUrl}/vendor/${vendor.id}`,
      lastModified: new Date(vendor.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Failed to fetch vendors for sitemap:", error);
  }

  return [...staticPages, ...vendorPages];
}
