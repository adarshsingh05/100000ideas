const mongoose = require("mongoose");

// Define the Idea schema
const ideaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    uploadedByEmail: { type: String, required: true },
    isStaticIdea: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Idea = mongoose.models.Idea || mongoose.model("Idea", ideaSchema);

const checkAllIdeas = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/1000ideas"
    );
    console.log("✅ Connected to MongoDB");

    // Get all published ideas (what /api/ideas/all should return)
    const allPublishedIdeas = await Idea.find({ status: "published" })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("title uploadedByEmail isStaticIdea featured createdAt");

    console.log(`📊 Total published ideas: ${allPublishedIdeas.length}`);

    console.log("\n🔍 All published ideas:");
    allPublishedIdeas.forEach((idea, index) => {
      const type = idea.isStaticIdea ? "ADMIN" : "COMMUNITY";
      console.log(
        `${index + 1}. [${type}] "${idea.title}" - ${idea.uploadedByEmail}`
      );
    });

    // Count by type
    const adminCount = allPublishedIdeas.filter(
      (idea) => idea.isStaticIdea
    ).length;
    const communityCount = allPublishedIdeas.filter(
      (idea) => !idea.isStaticIdea
    ).length;

    console.log(`\n📊 Breakdown:`);
    console.log(`- Admin ideas: ${adminCount}`);
    console.log(`- Community ideas: ${communityCount}`);
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
};

checkAllIdeas();
