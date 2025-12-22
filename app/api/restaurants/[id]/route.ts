import { NextResponse } from "next/server";
import { Restaurants } from "../../data";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
//   console.log("Restaurant now id:", id);
//   console.log(Object.keys(Restaurants));
  const restaurant = Restaurants[id];

  if (!restaurant) {
    return NextResponse.json(
      { message: "Restaurant not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(restaurant);
}
