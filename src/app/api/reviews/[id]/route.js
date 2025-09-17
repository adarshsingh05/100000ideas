import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Review from "@/lib/models/Review";
import { authenticateToken } from "@/lib/auth";

// PUT /api/reviews/[id]
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const user = await authenticateToken(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    const { id } = params;
    const body = await request.json();
    const { rating, comment } = body;

    if (!rating || !comment) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, message: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const review = await Review.findOneAndUpdate(
      { _id: id, userId: user._id },
      { rating, comment, updatedAt: new Date() },
      { new: true }
    );

    if (!review) {
      return NextResponse.json(
        { success: false, message: "Review not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: review,
      message: "Review updated successfully",
    });
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update review" },
      { status: 500 }
    );
  }
}

// DELETE /api/reviews/[id]
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const user = await authenticateToken(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    const { id } = params;

    const review = await Review.findOneAndDelete({
      _id: id,
      userId: user._id,
    });

    if (!review) {
      return NextResponse.json(
        { success: false, message: "Review not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete review" },
      { status: 500 }
    );
  }
}
