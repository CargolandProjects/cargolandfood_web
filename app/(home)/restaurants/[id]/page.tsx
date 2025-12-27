import ReastaurantPageContent from "@/components/restaurants/ReastaurantPageContent";

export default async function RestaurantDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ReastaurantPageContent id={id} />;
}

// NOTE: Remember to install the lucide-react library: npm install lucide-react
