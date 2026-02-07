import { NextResponse } from "next/server";

// Mock credentials - replace with real authentication
const ADMIN_CREDENTIALS = {
  email: "admin@sporton.com",
  password: "admin123",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    if (email === "admin_hasan" && password === "hasan123") {
      return NextResponse.json({
        success: true,
        token: "mock-token-hasan",
        user: {
          _id: "admin-hasan",
          name: "Hasan",
          email: email,
          role: "admin",
        },
      });
    }

    // Check admin credentials first
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      return NextResponse.json({
        success: true,
        token: "mock-token-12345",
        user: {
          _id: "admin-1",
          name: "Admin Sporton",
          email: email,
          role: "admin",
        },
      });
    }

    // For demo purposes, accept any email/password (non-admin users)
    return NextResponse.json({
      success: true,
      token: "mock-token-12345",
      user: {
        _id: "user-1",
        name: email.split("@")[0],
        email: email,
        role: "user",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid request format" },
      { status: 400 }
    );
  }
}
