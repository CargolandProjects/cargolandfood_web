import VendorPageContent from "@/components/vendor/VendorPageContent";
import { vendors } from "@/lib/services/vendors.service";
import { Metadata } from "next";

// // Pre-generate top vendors at build time
// export async function generateStaticParams() {
//   try {
//     // TODO: Update with your actual main zone ID or fetch from config
//     const mainZoneId =
//       process.env.NEXT_PUBLIC_DEFAULT_ZONE_ID || "default-zone";
//     const topVendors = await vendors.getAllVendors(mainZoneId, 1, 50);

//     return topVendors.vendors.map((vendor) => ({
//       id: vendor.id,
//     }));
//   } catch (error) {
//     console.error("Failed to generate static params for vendors:", error);
//     return []; // Fallback to empty array
//   }
// }

// // Allow non-prerendered vendor IDs to be rendered on-demand
// export const dynamicParams = true;

// // ISR: Revalidate every 5 minutes
// export const revalidate = 300;

// Generate SEO metadata for each vendor page

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const vendorData = await vendors.getVendorMenuById(id, 1, 10);
    const vendor = vendorData.data;

    const menuCount = vendor.menus?.length || 0;
    const rating = vendorData.averageRating?.simpleRating || 0;

    return {
      title: `${vendor.businessName} - Order Online | Cargoland Food`,
      description: `Order from ${
        vendor.businessName
      } on Cargoland. ${menuCount} items available for delivery. ${
        vendor.businessAddress || "Fast delivery to your location."
      } ${rating > 0 ? `Rated ${rating.toFixed(1)}/5` : ""}`,
      keywords: [
        vendor.businessName,
        vendor.businessCategory || "food delivery",
        "online food ordering",
        "food delivery",
        "cargoland",
        "restaurant delivery",
      ],
      openGraph: {
        title: `${vendor.businessName} | Cargoland Food`,
        description: `Order from ${vendor.businessName}. ${menuCount} items available for delivery.`,
        images: [
          {
            url: vendor.profileImg || "/fallback_vendor.webp",
            width: 1200,
            height: 630,
            alt: vendor.businessName,
          },
        ],
        type: "website",
        siteName: "Cargoland Food",
      },
      twitter: {
        card: "summary_large_image",
        title: `${vendor.businessName} | Cargoland Food`,
        description: `Order from ${vendor.businessName}. ${menuCount} items available.`,
        images: [vendor.profileImg || "/fallback_vendor.webp"],
      },
      alternates: {
        canonical: `/vendor/${id}`,
      },
    };
  } catch (error) {
    console.error(`Failed to generate metadata for vendor ${id}:`, error);
    return {
      title: "Vendor | Cargoland Food",
      description:
        "Order food online with Cargoland - Fast delivery to your location",
    };
  }
}

// Server Component - fetch initial data
export default async function RestaurantDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // let initialData;

  // try {
  //   // Fetch on server (cached by Next.js, SEO-friendly) - Page 1 only
  //   initialData = await vendors.getVendorMenuById(id, 1, 10);
  //   console.log("Initial data fetched for vendor page:", initialData);
  // } catch (error) {
  //   console.error(`Failed to fetch vendor ${id}:`, error);
  //   // Handle 404
  //   <NotFound
  //     title="Vendor not found"
  //     description="Sorry, the vendor you are looking for doesn't exist. Here are some helpful links:"
  //   />;
  // }

  return (
    <VendorPageContent
      id={id}
      // initialData={initialData}
    />
  );
}
