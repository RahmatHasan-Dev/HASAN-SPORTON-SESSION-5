import { NextResponse } from "next/server";
import { getBankById, updateBank, deleteBank } from "@/app/lib/shared-banks";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const bank = getBankById(id);

  if (!bank) {
    return NextResponse.json(
      { message: "Bank not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(bank);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  
  const updated = updateBank(id, {
    bankName: body.bankName,
    accountName: body.accountName,
    accountNumber: body.accountNumber,
    logo: body.logo,
  });

  if (!updated) {
    return NextResponse.json(
      { message: "Bank not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(updated);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  deleteBank(id);

  return NextResponse.json({ message: "Bank deleted successfully" });
}

