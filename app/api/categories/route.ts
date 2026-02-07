import { NextResponse } from "next/server";
import { getCategories } from "@/app/lib/shared-categories";

export async function GET() {
  const categories = getCategories();
  return NextResponse.json(categories);
}

