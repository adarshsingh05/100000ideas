import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Idea from "@/lib/models/Idea";

// GET /api/ideas/featured - Get featured ideas (random mix of static and community ideas)
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit")) || 8;

    // Get all published ideas (both static and community)
    const allIdeas = await Idea.find({ 
      status: "published"
    })
    .select("-__v");

    if (allIdeas.length === 0) {
      return NextResponse.json({
        success: true,
        ideas: [],
      });
    }

    // Shuffle the ideas array to get random selection
    const shuffledIdeas = allIdeas.sort(() => Math.random() - 0.5);
    
    // Take the requested number of ideas
    const featuredIdeas = shuffledIdeas.slice(0, limit);

    return NextResponse.json({
      success: true,
      ideas: featuredIdeas,
    });
  } catch (error) {
    console.error("Error fetching featured ideas:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/ideas/featured - Alternative POST method for featured ideas
export async function POST(request) {
  try {
    await connectDB();

    const { limit = 8 } = await request.json();

    // Get all published ideas (both static and community)
    const allIdeas = await Idea.find({ 
      status: "published"
    })
    .select("-__v");

    if (allIdeas.length === 0) {
      return NextResponse.json({
        success: true,
        ideas: [],
      });
    }

    // Shuffle the ideas array to get random selection
    const shuffledIdeas = allIdeas.sort(() => Math.random() - 0.5);
    
    // Take the requested number of ideas
    const featuredIdeas = shuffledIdeas.slice(0, limit);

    return NextResponse.json({
      success: true,
      ideas: featuredIdeas,
    });
  } catch (error) {
    console.error("Error fetching featured ideas:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
