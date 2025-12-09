"use client";

interface GroceryDetailsProps {
  params: {
    id: string;
  };
}

export default function GroceryDetailsPage({
  params,
}: GroceryDetailsProps) {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-4">Grocery Details</h1>
      <p className="text-lg">This is grocery details for ID: {params.id}</p>
    </div>
  );
}
