import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Idea from "@/lib/models/Idea";

// GET /api/ideas/[id] - Get single idea by ID
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const idea = await Idea.findById(id).select("-__v");

    if (!idea) {
      return NextResponse.json({ error: "Idea not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: { idea },
    });
  } catch (error) {
    console.error("Error fetching idea:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/ideas/[id] - Update idea
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const {
      title,
      description,
      category,
      investmentRange,
      timeToStart,
      targetAudience,
      keyFeatures,
      businessModel,
      revenueStreams,
      competitiveAdvantage,
      challenges,
      marketSize,
      requiredSkills,
      contactInfo,
      imageUrl,
      tags,
    } = body;

    // Validate required fields
    const requiredFields = [
      "title",
      "description",
      "category",
      "investmentRange",
      "timeToStart",
      "targetAudience",
      "keyFeatures",
      "businessModel",
      "revenueStreams",
      "competitiveAdvantage",
      "challenges",
      "marketSize",
      "requiredSkills",
      "contactInfo",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Update idea
    const updatedIdea = await Idea.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category,
        investmentRange,
        timeToStart,
        targetAudience,
        keyFeatures,
        businessModel,
        revenueStreams,
        competitiveAdvantage,
        challenges,
        marketSize,
        requiredSkills,
        contactInfo,
        imageUrl: imageUrl || "/bulb.png",
        tags: tags || [],
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    ).select("-__v");

    if (!updatedIdea) {
      return NextResponse.json({ error: "Idea not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Idea updated successfully",
      idea: updatedIdea,
    });
  } catch (error) {
    console.error("Error updating idea:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/ideas/[id] - Delete idea
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const deletedIdea = await Idea.findByIdAndDelete(id);

    if (!deletedIdea) {
      return NextResponse.json({ error: "Idea not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Idea deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting idea:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
