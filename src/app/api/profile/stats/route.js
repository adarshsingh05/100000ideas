import { NextResponse } from "next/server";
import connectDB from "@/lib/database.js";
import User from "@/lib/models/User";

// UPDATE user profile stats
export async function PUT(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { userId, stats } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Validate stats data
    const allowedStats = [
      "balanceIcoins",
      "savedIdeas",
      "purchased",
      "completionPercentage",
    ];
    const updateData = {};

    for (const [key, value] of Object.entries(stats)) {
      if (allowedStats.includes(key)) {
        if (key === "completionPercentage") {
          updateData[key] = Math.min(Math.max(value, 0), 100);
        } else {
          updateData[key] = Math.max(value, 0);
        }
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No valid stats provided" },
        { status: 400 }
      );
    }

    // Update user stats
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...updateData,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Profile stats updated successfully",
      stats: {
        balanceIcoins: updatedUser.balanceIcoins,
        savedIdeas: updatedUser.savedIdeas,
        purchased: updatedUser.purchased,
        completionPercentage: updatedUser.completionPercentage,
      },
    });
  } catch (error) {
    console.error("Error updating profile stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

