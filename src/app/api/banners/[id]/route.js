import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Banner from "@/lib/models/Banner";

// GET /api/banners/[id] - Get single banner
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const banner = await Banner.findById(id).select("-__v");

    if (!banner) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: { banner },
    });
  } catch (error) {
    console.error("Error fetching banner:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/banners/[id] - Update banner
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const {
      title,
      description,
      buttonText,
      redirectUrl,
      backgroundImage,
      isActive,
      displayOrder,
    } = body;

    // Validate title length if provided
    if (title) {
      const wordCount = title.trim().split(/\s+/).length;
      if (wordCount > 10) {
        return NextResponse.json(
          { error: "Title cannot exceed 10 words" },
          { status: 400 }
        );
      }
    }

    // Update banner
    const updatedBanner = await Banner.findByIdAndUpdate(
      id,
      {
        title,
        description,
        buttonText,
        redirectUrl,
        backgroundImage,
        isActive,
        displayOrder,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    ).select("-__v");

    if (!updatedBanner) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Banner updated successfully",
      data: { banner: updatedBanner },
    });
  } catch (error) {
    console.error("Error updating banner:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/banners/[id] - Delete banner
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const deletedBanner = await Banner.findByIdAndDelete(id);

    if (!deletedBanner) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting banner:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
