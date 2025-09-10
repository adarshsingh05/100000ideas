import { NextResponse } from "next/server";
import connectDB from "@/lib/database";
import User from "@/lib/models/User";
import {
  generateToken,
  validateEmail,
  validatePassword,
  validateName,
} from "@/lib/auth";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, password } = body;

    // Validation
    if (!validateName(name)) {
      return NextResponse.json(
        { success: false, message: "Name must be between 2 and 50 characters" },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email" },
        { status: 400 }
      );
    }

    if (!validatePassword(password)) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 6 characters long",
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Create new user
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
    });

    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);

    // Update last login
    await user.updateLastLogin();

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isEmailVerified: user.isEmailVerified,
            createdAt: user.createdAt,
          },
          token,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, message: "Server error during registration" },
      { status: 500 }
    );
  }
}
