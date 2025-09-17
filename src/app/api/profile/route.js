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

    // Prepare update data, only include fields that have values
    const updateData = {
      name: profileData.name,
      email: profileData.email,
      updatedAt: new Date(),
    };

    // Only add optional fields if they have values
    if (profileData.phone && profileData.phone.trim() !== "") {
      updateData.phone = profileData.phone;
    }
    if (profileData.age && profileData.age.trim() !== "") {
      updateData.age = profileData.age;
    }
    if (profileData.gender && profileData.gender.trim() !== "") {
      updateData.gender = profileData.gender;
    }
    if (profileData.annualIncome && profileData.annualIncome.trim() !== "") {
      updateData.annualIncome = profileData.annualIncome;
    }
    if (profileData.caste && profileData.caste.trim() !== "") {
      updateData.caste = profileData.caste;
    }
    if (profileData.area && profileData.area.trim() !== "") {
      updateData.area = profileData.area;
    }
    if (
      profileData.physicallyChallenged &&
      profileData.physicallyChallenged.trim() !== ""
    ) {
      updateData.physicallyChallenged = profileData.physicallyChallenged;
    }
    if (profileData.profilePicture) {
      updateData.profilePicture = profileData.profilePicture;
    }

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

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
        phone: updatedUser.phone || "",
        gender: updatedUser.gender || "",
        age: updatedUser.age || "",
        annualIncome: updatedUser.annualIncome || "",
        caste: updatedUser.caste || "",
        area: updatedUser.area || "",
        physicallyChallenged: updatedUser.physicallyChallenged || "No",
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
