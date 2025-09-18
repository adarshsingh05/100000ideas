import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Idea from "@/lib/models/Idea";

// GET /api/ideas/all - Get all published ideas (for home page)
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    // Build query
    const query = { status: "published" };

    if (category && category !== "all") {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
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

    console.log("All ideas query:", query);
    console.log("All ideas found:", ideas.length);
    console.log(
      "Sample idea fields:",
      ideas[0] ? Object.keys(ideas[0]) : "No ideas"
    );
    console.log("Sample idea isAdmin:", ideas[0]?.isAdmin);
    console.log("Sample idea source:", ideas[0]?.source);
    console.log(
      "Admin ideas in results:",
      ideas.filter((idea) => idea.isAdmin === true || idea.source === "admin")
    );

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
    console.error("Error fetching all ideas:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
