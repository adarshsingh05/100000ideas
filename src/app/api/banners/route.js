import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Banner from "@/lib/models/Banner";

// GET /api/banners - Get all active banners
export async function GET(request) {
  try {
    await connectDB();
    console.log("Connected to database for banner fetch");

    const { searchParams } = new URL(request.url);
    const active = searchParams.get("active");
    console.log("Fetching banners with active filter:", active);

    let query = {};
    if (active !== null) {
      query.isActive = active === "true";
    }

    const banners = await Banner.find(query)
      .sort({ displayOrder: 1, createdAt: -1 })
      .select("-__v");

    console.log("Found banners:", banners.length);

    return NextResponse.json({
      success: true,
      data: { banners },
    });
  } catch (error) {
    console.error("Error fetching banners:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/banners - Create new banner
export async function POST(request) {
  try {
    await connectDB();
    console.log("Connected to database for banner creation");

    const body = await request.json();
    console.log("Banner creation request body:", body);

    const {
      title,
      description,
      buttonText,
      redirectUrl,
      backgroundImage,
      displayOrder,
    } = body;

    // Validate required fields
    const requiredFields = [
      "title",
      "description",
      "buttonText",
      "redirectUrl",
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate title length (10 words max)
    const wordCount = title.trim().split(/\s+/).length;
    if (wordCount > 10) {
      return NextResponse.json(
        { error: "Title cannot exceed 10 words" },
        { status: 400 }
      );
    }

    // Create banner
    const banner = new Banner({
      title,
      description,
      buttonText,
      redirectUrl,
      backgroundImage: backgroundImage || null,
      displayOrder: displayOrder || 0,
    });

    console.log("Creating banner:", banner);
    await banner.save();
    console.log("Banner saved successfully:", banner._id);

    return NextResponse.json({
      success: true,
      message: "Banner created successfully",
      data: { banner },
    });
  } catch (error) {
    console.error("Error creating banner:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
