
import { NextResponse } from "next/server";
import { restaurants } from "../data";

export async function GET() {
  return NextResponse.json(restaurants);
}