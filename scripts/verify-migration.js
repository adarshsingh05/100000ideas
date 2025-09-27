const mongoose = require("mongoose");

// Define the Idea schema (same as in migration script)
const ideaSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,
    isStaticIdea: Boolean,
    featured: Boolean,
    originalId: Number,
  },
  { timestamps: true }
);

const Idea = mongoose.models.Idea || mongoose.model("Idea", ideaSchema);

const verifyMigration = async () => {
  try {
    console.log("🔍 Verifying migration...");

    // Connect to database
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/ideaforge"
    );
    console.log("✅ Connected to MongoDB");

    // Count static ideas
    const staticCount = await Idea.countDocuments({ isStaticIdea: true });
    console.log(`📊 Static ideas in database: ${staticCount}`);

    // Count featured ideas
    const featuredCount = await Idea.countDocuments({
      isStaticIdea: true,
      featured: true,
    });
    console.log(`⭐ Featured ideas: ${featuredCount}`);

    // Show sample ideas
    const sampleIdeas = await Idea.find({ isStaticIdea: true })
      .limit(3)
      .select("title category featured originalId");
    console.log("\n📋 Sample ideas:");
    sampleIdeas.forEach((idea) => {
      console.log(
        `- ${idea.title} (${idea.category}) - Featured: ${idea.featured} - Original ID: ${idea.originalId}`
      );
    });

    console.log("\n✅ Migration verification completed!");
  } catch (error) {
    console.error("❌ Verification failed:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
};

if (require.main === module) {
  verifyMigration();
}

module.exports = { verifyMigration };
