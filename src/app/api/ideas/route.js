import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Idea from "@/lib/models/Idea";
import mongoose from "mongoose";

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
      isAdmin, // New field for admin ideas
      source, // New field to mark source
    } = body;

    // Check if this is an admin idea
    console.log("Checking if admin idea:", isAdmin, "Source:", source);
    if (isAdmin) {
      console.log("Creating admin idea with data:", {
        title,
        description,
        category,
        isAdmin,
        source,
      });
      // For admin ideas, we have different required fields
      const adminRequiredFields = ["title", "description", "category"];

      for (const field of adminRequiredFields) {
        if (!body[field]) {
          return NextResponse.json(
            { error: `${field} is required` },
            { status: 400 }
          );
        }
      }

      // Create admin idea with same structure as community ideas
      // For admin ideas, we need to create a special ObjectId or handle it differently
      const ideaData = {
        title,
        description,
        category,
        investmentRange: investmentRange || "Not specified",
        timeToStart: timeToStart || "Not specified",
        targetAudience: targetAudience || "General market",
        keyFeatures: keyFeatures || [],
        businessModel: businessModel || "To be determined",
        revenueStreams: revenueStreams || [],
        competitiveAdvantage: competitiveAdvantage || "Admin curated idea",
        challenges: challenges || "To be determined",
        marketSize: marketSize || "Not specified",
        requiredSkills: requiredSkills || [],
        contactInfo: contactInfo || {
          email: "admin@1000ideas.com",
          phone: "",
        },
        imageUrl: imageUrl || "/bulb.png",
        uploadedBy: new mongoose.Types.ObjectId(), // Create a new ObjectId for admin
        uploadedByEmail: "admin@1000ideas.com",
        uploadedByName: "Admin",
        tags: tags || [],
        status: "published",
        isAdmin: true,
        source: "admin",
      };

      console.log("Idea data before creation:", ideaData);
      const idea = new Idea(ideaData);

      const savedIdea = await idea.save();
      console.log("Admin idea created:", savedIdea);
      console.log("Admin idea isAdmin field:", savedIdea.isAdmin);
      console.log("Admin idea source field:", savedIdea.source);

      // Try to update the fields after creation using $set
      const updatedIdea = await Idea.findByIdAndUpdate(
        savedIdea._id,
        { $set: { isAdmin: true, source: "admin" } },
        { new: true, runValidators: true }
      );
      console.log("Updated idea isAdmin:", updatedIdea.isAdmin);
      console.log("Updated idea source:", updatedIdea.source);

      // Also try to save the document directly
      savedIdea.isAdmin = true;
      savedIdea.source = "admin";
      const finalIdea = await savedIdea.save();
      console.log("Final idea isAdmin:", finalIdea.isAdmin);
      console.log("Final idea source:", finalIdea.source);

      // Check the raw document from database
      const rawIdea = await Idea.findById(finalIdea._id).lean();
      console.log("Raw idea from DB isAdmin:", rawIdea.isAdmin);
      console.log("Raw idea from DB source:", rawIdea.source);
      console.log("Raw idea from DB uploadedByName:", rawIdea.uploadedByName);

      return NextResponse.json({
        success: true,
        message: "Admin idea created successfully",
        idea: finalIdea,
      });
    }

    // Regular user idea validation
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
