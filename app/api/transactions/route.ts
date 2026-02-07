import { NextResponse } from "next/server";
import { getTransactions } from "@/app/lib/shared-data";

export async function GET() {
  return NextResponse.json(getTransactions());
}

