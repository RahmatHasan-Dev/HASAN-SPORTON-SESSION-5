import { NextResponse } from "next/server";
import { getTransactions, updateTransactionStatus } from "@/app/lib/shared-data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Validate ID parameter
  if (!id || id === "undefined" || id === "null" || id.trim() === "") {
    return NextResponse.json(
      { message: "Invalid transaction ID" },
      { status: 400 }
    );
  }

  const transactions = getTransactions();
  const transaction = transactions.find((t: { _id: string }) => t._id === id);

  if (!transaction) {
    return NextResponse.json(
      { message: "Transaction not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(transaction);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Validate ID parameter
  if (!id || id === "undefined" || id === "null" || id.trim() === "") {
    return NextResponse.json(
      { message: "Invalid transaction ID" },
      { status: 400 }
    );
  }

  const contentType = request.headers.get("content-type");
  
  try {
    if (contentType && contentType.includes("multipart/form-data")) {
      // Handle FormData
      const formData = await request.formData();
      const status = formData.get("status") as string;
      
      if (status !== "paid" && status !== "rejected" && status !== "pending") {
        return NextResponse.json(
          { message: "Invalid status. Must be 'paid', 'rejected', or 'pending'" },
          { status: 400 }
        );
      }

      const updated = updateTransactionStatus(id, status);
      
      if (!updated) {
        return NextResponse.json(
          { message: "Transaction not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(updated);
    } else {
      // Handle JSON
      const body = await request.json();
      const status = body.status;
      
      if (status !== "paid" && status !== "rejected" && status !== "pending") {
        return NextResponse.json(
          { message: "Invalid status. Must be 'paid', 'rejected', or 'pending'" },
          { status: 400 }
        );
      }

      const updated = updateTransactionStatus(id, status);
      
      if (!updated) {
        return NextResponse.json(
          { message: "Transaction not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(updated);
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update transaction" },
      { status: 500 }
    );
  }
}

