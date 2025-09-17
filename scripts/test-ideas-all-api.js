// Using built-in fetch (Node.js 18+)

const testIdeasAllAPI = async () => {
  try {
    console.log("🔍 Testing /api/ideas/all endpoint...");

    const response = await fetch(
      "http://localhost:3002/api/ideas/all?page=1&limit=10"
    );
    const data = await response.json();

    console.log("📊 Response:", {
      success: data.success,
      totalIdeas: data.pagination?.totalIdeas,
      ideasCount: data.ideas?.length,
    });

    if (data.ideas && data.ideas.length > 0) {
      console.log("\n🔍 Sample ideas:");
      data.ideas.slice(0, 3).forEach((idea, index) => {
        console.log(
          `${index + 1}. "${idea.title}" - ${idea.uploadedByEmail} - Static: ${
            idea.isStaticIdea
          }`
        );
      });
    }
  } catch (error) {
    console.error("❌ Error testing API:", error.message);
  }
};

// Wait a bit for the server to start, then test
setTimeout(testIdeasAllAPI, 3000);
