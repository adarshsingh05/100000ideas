import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Idea from "@/lib/models/Idea";

// GET /api/ideas/static - Get all static ideas (migrated from JSON)
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured") === "true";

    // Build query for static ideas only
    const query = { isStaticIdea: true, status: "published" };

    if (category && category !== "all") {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    // If featured is true, get only featured ideas (you can customize this logic)
    if (featured) {
      query.featured = true; // You might want to add a featured field to the schema
    }

    const skip = (page - 1) * limit;

    const [ideas, total] = await Promise.all([
      Idea.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("-__v"),
      Idea.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      ideas,
      pagination: {
        currentPage: page,
        totalPages,
        totalIdeas: total,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching static ideas:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET /api/ideas/static/featured - Get featured static ideas for carousel
export async function POST(request) {
  try {
    await connectDB();

    const { limit = 8 } = await request.json();

    // Get featured static ideas
    const ideas = await Idea.find({ 
      isStaticIdea: true, 
      status: "published",
      featured: true // You might want to add this field to the schema
    })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select("-__v");

    return NextResponse.json({
      success: true,
      ideas,
    });
  } catch (error) {
    console.error("Error fetching featured static ideas:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
