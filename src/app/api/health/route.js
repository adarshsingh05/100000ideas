import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      message: "Server is running",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "production",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Health check failed" },
      { status: 500 }
    );
  }
}
