import { NextResponse } from "next/server";
import { getBanks, createBank } from "@/app/lib/shared-banks";

export async function GET() {
  const banks = getBanks();
  return NextResponse.json(banks);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newBank = createBank({
      bankName: body.bankName,
      accountName: body.accountName,
      accountNumber: body.accountNumber,
      logo: body.logo,
    });
    return NextResponse.json(newBank, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create bank" },
      { status: 400 }
    );
  }
}

