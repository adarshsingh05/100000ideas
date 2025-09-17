import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Idea from "@/lib/models/Idea";

// GET /api/community-ideas/[id]
export async function GET(request, { params }) {
  try {
    await connectDB();

    const idea = await Idea.findById(params.id);

    if (!idea) {
      return NextResponse.json(
        { success: false, message: "Idea not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { idea },
    });
  } catch (error) {
    console.error("Error fetching idea:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch idea" },
      { status: 500 }
    );
  }
}
