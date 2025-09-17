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

const checkAllIdeasDetailed = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://project_1:project_1@cluster0.pwx2r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("✅ Connected to MongoDB");

    // Get ALL ideas regardless of status
    const allIdeas = await Idea.find({})
      .sort({ createdAt: -1 })
      .select("title uploadedByEmail isStaticIdea featured status createdAt");

    console.log(`📊 Total ideas in database: ${allIdeas.length}`);

    console.log("\n🔍 All ideas (including drafts):");
    allIdeas.forEach((idea, index) => {
      const type = idea.isStaticIdea ? "ADMIN" : "COMMUNITY";
      console.log(
        `${index + 1}. [${type}] [${idea.status}] "${idea.title}" - ${
          idea.uploadedByEmail
        }`
      );
    });

    // Count by type and status
    const adminPublished = allIdeas.filter(
      (idea) => idea.isStaticIdea && idea.status === "published"
    ).length;
    const adminDraft = allIdeas.filter(
      (idea) => idea.isStaticIdea && idea.status === "draft"
    ).length;
    const communityPublished = allIdeas.filter(
      (idea) => !idea.isStaticIdea && idea.status === "published"
    ).length;
    const communityDraft = allIdeas.filter(
      (idea) => !idea.isStaticIdea && idea.status === "draft"
    ).length;

    console.log(`\n📊 Detailed breakdown:`);
    console.log(`- Admin published: ${adminPublished}`);
    console.log(`- Admin draft: ${adminDraft}`);
    console.log(`- Community published: ${communityPublished}`);
    console.log(`- Community draft: ${communityDraft}`);
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
};

checkAllIdeasDetailed();
