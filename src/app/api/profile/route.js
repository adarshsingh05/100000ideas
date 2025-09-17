import { NextResponse } from "next/server";
import connectDB from "@/lib/database.js";
import User from "@/lib/models/User";

// GET user profile
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      profile: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        gender: user.gender || "",
        age: user.age || "",
        annualIncome: user.annualIncome || "",
        caste: user.caste || "",
        area: user.area || "",
        physicallyChallenged: user.physicallyChallenged || "No",
        profilePicture: user.profilePicture || null,
        balanceIcoins: user.balanceIcoins || 0,
        savedIdeas: user.savedIdeas || 0,
        purchased: user.purchased || 0,
        completionPercentage: user.completionPercentage || 0,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// UPDATE user profile
export async function PUT(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { userId, profileData } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!profileData.name || !profileData.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Check if email is already taken by another user
    const existingUser = await User.findOne({
      email: profileData.email,
      _id: { $ne: userId },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already taken" },
        { status: 400 }
      );
    }

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone || "",
        gender: profileData.gender || "",
        age: profileData.age || "",
        annualIncome: profileData.annualIncome || "",
        caste: profileData.caste || "",
        area: profileData.area || "",
        physicallyChallenged: profileData.physicallyChallenged || "No",
        profilePicture: profileData.profilePicture || null,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      profile: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        gender: updatedUser.gender,
        age: updatedUser.age,
        annualIncome: updatedUser.annualIncome,
        caste: updatedUser.caste,
        area: updatedUser.area,
        physicallyChallenged: updatedUser.physicallyChallenged,
        profilePicture: updatedUser.profilePicture,
        balanceIcoins: updatedUser.balanceIcoins,
        savedIdeas: updatedUser.savedIdeas,
        purchased: updatedUser.purchased,
        completionPercentage: updatedUser.completionPercentage,
        updatedAt: updatedUser.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
