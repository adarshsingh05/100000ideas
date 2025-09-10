import { NextResponse } from "next/server";
import connectDB from "@/lib/database";
import User from "@/lib/models/User";
import { generateToken, validateEmail } from "@/lib/auth";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email" },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { success: false, message: "Password is required" },
        { status: 400 }
      );
    }

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Update last login
    await user.updateLastLogin();

    return NextResponse.json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          lastLogin: user.lastLogin,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Server error during login" },
      { status: 500 }
    );
  }
}
