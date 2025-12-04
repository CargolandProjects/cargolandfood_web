import { NextResponse } from "next/server";
import { featured, discount } from "../data";

export async function GET() {
  return NextResponse.json({ discount: discount, featured: featured });
}
