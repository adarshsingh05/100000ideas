import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = "AIzaSyCoa0mbar6P4pbs7GCEeCW0njIfInMU8LA";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error("Empty response from Gemini API");
    }

    // Parse the JSON response from Gemini
    let data;
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        data = JSON.parse(jsonMatch[0]);
      } else {
        // If no JSON array found, try to parse the entire response
        data = JSON.parse(text);
      }
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      console.log("Raw response:", text);

      // Return fallback data if parsing fails
      data = [
        {
          category: "AI Tools",
          idea: "AI-Powered Content Creation Platform",
          growth: 340,
          marketSize: 2100000000,
          competition: "Medium",
          investment: "Medium",
          timeToMarket: 8,
        },
        {
          category: "E-commerce",
          idea: "Sustainable Product Marketplace",
          growth: 280,
          marketSize: 1800000000,
          competition: "High",
          investment: "High",
          timeToMarket: 12,
        },
        {
          category: "SaaS",
          idea: "Remote Team Collaboration Tool",
          growth: 420,
          marketSize: 3200000000,
          competition: "Medium",
          investment: "Medium",
          timeToMarket: 6,
        },
        {
          category: "Fintech",
          idea: "Personal Finance AI Assistant",
          growth: 380,
          marketSize: 2500000000,
          competition: "Medium",
          investment: "High",
          timeToMarket: 10,
        },
        {
          category: "HealthTech",
          idea: "Mental Wellness Mobile App",
          growth: 290,
          marketSize: 1500000000,
          competition: "High",
          investment: "Medium",
          timeToMarket: 9,
        },
        {
          category: "EdTech",
          idea: "AI-Powered Learning Platform",
          growth: 310,
          marketSize: 2200000000,
          competition: "Medium",
          investment: "Medium",
          timeToMarket: 7,
        },
        {
          category: "GreenTech",
          idea: "Carbon Footprint Tracker",
          growth: 250,
          marketSize: 1200000000,
          competition: "Low",
          investment: "Low",
          timeToMarket: 5,
        },
        {
          category: "FoodTech",
          idea: "Smart Kitchen Management System",
          growth: 320,
          marketSize: 1900000000,
          competition: "Medium",
          investment: "High",
          timeToMarket: 11,
        },
      ];
    }

    return Response.json(data);
  } catch (error) {
    console.error("Gemini API error:", error);
    return Response.json(
      { error: "Failed to generate trend data" },
      { status: 500 }
    );
  }
}
