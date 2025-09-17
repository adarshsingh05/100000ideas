import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Review from "@/lib/models/Review";
import { authenticateToken } from "@/lib/auth";

// GET /api/reviews?ideaId=xxx
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const ideaId = searchParams.get("ideaId");

    if (!ideaId) {
      return NextResponse.json(
        { success: false, message: "Idea ID is required" },
        { status: 400 }
      );
    }

    const reviews = await Review.find({
      ideaId,
      status: "approved",
    })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

// POST /api/reviews
export async function POST(request) {
  try {
    await connectDB();

    const user = await authenticateToken(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { ideaId, comment } = body;

    if (!ideaId || !comment) {
      return NextResponse.json(
        { success: false, message: "Idea ID and comment are required" },
        { status: 400 }
      );
    }

    // Check if user already reviewed this idea
    const existingReview = await Review.findOne({
      ideaId,
      userId: user._id,
    });

    if (existingReview) {
      return NextResponse.json(
        { success: false, message: "You have already reviewed this idea" },
        { status: 400 }
      );
    }

    const review = new Review({
      ideaId,
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
      comment,
    });

    await review.save();

    return NextResponse.json({
      success: true,
      data: review,
      message: "Review submitted successfully",
    });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create review" },
      { status: 500 }
    );
  }
}
