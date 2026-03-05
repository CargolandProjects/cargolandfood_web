import VendorPageContent from "@/components/vendor/VendorPageContent";

export default async function RestaurantDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <VendorPageContent id={id} />;
}

