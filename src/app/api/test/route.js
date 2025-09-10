import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Server is working!" });
}

export async function POST(request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      message: "POST request working!",
      receivedData: body,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing request" },
      { status: 400 }
    );
  }
}
