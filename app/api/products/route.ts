import { NextResponse } from "next/server";
import { getProducts } from "@/app/lib/shared-products";

export async function GET() {
  const products = getProducts();
  return NextResponse.json(products);
}

