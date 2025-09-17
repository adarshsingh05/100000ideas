import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Idea from "@/lib/models/Idea";

// GET /api/ideas - Get all ideas for a specific user
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const status = searchParams.get("status") || "published";

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Build query
    const query = { uploadedBy: userId };
    if (status !== "all") {
      query.status = status;
    }

    const ideas = await Idea.find(query).sort({ createdAt: -1 }).select("-__v");

    return NextResponse.json({
      success: true,
      ideas,
      count: ideas.length,
    });
  } catch (error) {
    console.error("Error fetching ideas:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/ideas - Create a new idea
export async function POST(request) {
  try {
    await connectDB();

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
      uploadedBy,
      uploadedByEmail,
      uploadedByName,
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
      "uploadedBy",
      "uploadedByEmail",
      "uploadedByName",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Create new idea
    const idea = new Idea({
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
      uploadedBy,
      uploadedByEmail,
      uploadedByName,
      tags: tags || [],
      status: "published", // Auto-publish for now
    });

    const savedIdea = await idea.save();

    return NextResponse.json({
      success: true,
      message: "Idea created successfully",
      idea: savedIdea,
    });
  } catch (error) {
    console.error("Error creating idea:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
