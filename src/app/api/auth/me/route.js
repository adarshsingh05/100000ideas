import { NextResponse } from "next/server";
import { authenticateToken } from "@/lib/auth";

export async function GET(request) {
  try {
    const user = await authenticateToken(request);

    return NextResponse.json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);

    if (
      error.message.includes("token") ||
      error.message.includes("Access denied")
    ) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Server error while fetching profile" },
      { status: 500 }
    );
  }
}
