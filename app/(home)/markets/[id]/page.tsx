import MarketPageContent from "@/components/markets/MarketPageContent";

export default async function MarketDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <MarketPageContent id={id} />;
}
