import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Idea from "@/lib/models/Idea";

// GET /api/community-ideas - Get only community-added ideas (not admin/migrated ideas)
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    // Build query to filter only community ideas
    // Community ideas are those where isStaticIdea is not true (false or undefined) AND not admin ideas
    const query = {
      status: "published",
      isAdmin: { $ne: true }, // Exclude admin ideas
      source: { $ne: "admin" }, // Exclude admin source
      $or: [
        { isStaticIdea: { $ne: true } }, // isStaticIdea is not true
        { isStaticIdea: { $exists: false } }, // isStaticIdea field doesn't exist
      ],
    };

    if (category && category !== "all") {
      query.category = category;
    }

    if (search) {
      query.$and = [
        query.$and || {},
        {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
          ],
        },
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
    console.error("Error fetching community ideas:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
