import { VendorDetail } from "@/lib/services/vendors.service";

interface VendorJsonLdProps {
  vendor: VendorDetail;
  rating: number;
  reviewCount: number;
}

export default function VendorJsonLd({
  vendor,
  rating,
  reviewCount,
}: VendorJsonLdProps) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://cargolandfood.com";

  // Map businessCategory to valid Schema.org types
  const getSchemaType = (category: string | null): string => {
    if (!category) return "LocalBusiness";

    const categoryLower = category.toLowerCase();

    if (
      categoryLower.includes("restaurant") ||
      categoryLower.includes("food")
    ) {
      return "Restaurant";
    } else if (
      categoryLower.includes("grocery") ||
      categoryLower.includes("groceries")
    ) {
      return "GroceryStore";
    } else if (categoryLower.includes("market")) {
      return "Store";
    }

    return "LocalBusiness"; // Fallback for unknown categories
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": getSchemaType(vendor.businessCategory),
    "@id": `${siteUrl}/vendor/${vendor.id}`,
    name: vendor.businessName,
    image: vendor.profileImg,
    address: {
      "@type": "PostalAddress",
      streetAddress: vendor.businessAddress || "Nigeria",
      addressCountry: "NG",
    },
    aggregateRating:
      rating > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: rating.toFixed(1),
            reviewCount: reviewCount,
            bestRating: "5",
            worstRating: "1",
          }
        : undefined,
    servesCuisine: vendor.businessCategory || "Food",
    priceRange: "₦₦",
    telephone: "+234-XXX-XXX-XXXX", // TODO: Add vendor phone if available
    url: `${siteUrl}/vendor/${vendor.id}`,
    menu: `${siteUrl}/vendor/${vendor.id}#menu`,
    hasMenu: {
      "@type": "Menu",
      hasMenuSection: vendor.categories?.map((category) => ({
        "@type": "MenuSection",
        name: category.name,
        hasMenuItem: vendor.menus
          ?.filter((item) => item.categoryId === category.id)
          .map((item) => ({
            "@type": "MenuItem",
            name: item.name,
            description: item.description,
            image: item.imageUrl || item.uploadImageUrl,
            offers: {
              "@type": "Offer",
              price: item.price,
              priceCurrency: "NGN",
              availability: item.outOfStock
                ? "https://schema.org/OutOfStock"
                : "https://schema.org/InStock",
            },
          })),
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
