import { NextResponse } from "next/server";
import { seedReviews } from "@/lib/seedReviews";

export async function POST(request) {
  try {
    await seedReviews();

    return NextResponse.json({
      success: true,
      message: "Reviews seeded successfully",
    });
  } catch (error) {
    console.error("Error seeding reviews:", error);
    return NextResponse.json(
      { success: false, message: "Failed to seed reviews" },
      { status: 500 }
    );
  }
}
