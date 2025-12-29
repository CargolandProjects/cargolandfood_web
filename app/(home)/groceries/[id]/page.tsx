import GroceriesPageContent from "@/components/groceries/GroceriesPageContent";

export default async function GroceryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const {id} = await params
  return (
   <GroceriesPageContent id={id} />
  );
}
