"use client";

interface MarketDetailsProps {
  params: {
    id: string;
  };
}

export default function MarketDetailsPage({
  params,
}: MarketDetailsProps) {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-4">Market Details</h1>
      <p className="text-lg">This is market details for ID: {params.id}</p>
    </div>
  );
}
