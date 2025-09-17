import { NextResponse } from "next/server";
import connectDB from "@/lib/database.js";

export async function GET() {
  try {
    console.log("Testing database connection...");
    await connectDB();
    console.log("Database connection successful!");

    return NextResponse.json({
      success: true,
      message: "Database connection test successful",
    });
  } catch (error) {
    console.error("Database connection test failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
