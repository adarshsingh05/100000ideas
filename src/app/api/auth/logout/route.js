import { NextResponse } from "next/server";
import { authenticateToken } from "@/lib/auth";

export async function POST(request) {
  try {
    // Verify token but don't fail if invalid (logout should work regardless)
    try {
      await authenticateToken(request);
    } catch (error) {
      // Continue with logout even if token is invalid
    }

    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { success: false, message: "Server error during logout" },
      { status: 500 }
    );
  }
}
