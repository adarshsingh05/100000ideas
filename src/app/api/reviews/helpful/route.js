import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Review from "@/lib/models/Review";
import { authenticateToken } from "@/lib/auth";

// POST /api/reviews/helpful
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
    const { reviewId } = body;

    if (!reviewId) {
      return NextResponse.json(
        { success: false, message: "Review ID is required" },
        { status: 400 }
      );
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return NextResponse.json(
        { success: false, message: "Review not found" },
        { status: 404 }
      );
    }

    // Check if user already marked as helpful
    const alreadyHelpful = review.helpfulBy.includes(user._id);

    if (alreadyHelpful) {
      // Remove helpful vote
      review.helpfulBy = review.helpfulBy.filter(
        (id) => id.toString() !== user._id.toString()
      );
      review.helpful = Math.max(0, review.helpful - 1);
    } else {
      // Add helpful vote
      review.helpfulBy.push(user._id);
      review.helpful += 1;
    }

    await review.save();

    return NextResponse.json({
      success: true,
      data: {
        helpful: review.helpful,
        isHelpful: !alreadyHelpful,
      },
      message: alreadyHelpful ? "Removed helpful vote" : "Marked as helpful",
    });
  } catch (error) {
    console.error("Error updating helpful vote:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update helpful vote" },
      { status: 500 }
    );
  }
}
