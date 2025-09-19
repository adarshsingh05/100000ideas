import mongoose from "mongoose";
import { connectDB } from "../src/lib/database.js";
import Idea from "../src/lib/models/Idea.js";

// Verification script to check seeded data
async function verifySeed() {
  try {
    console.log("🔍 Verifying seeded data...");
    
    // Connect to database
    await connectDB();
    console.log("✅ Connected to database");

    // Count total ideas
    const totalIdeas = await Idea.countDocuments();
    console.log(`📊 Total ideas in database: ${totalIdeas}`);

    // Count by type
    const communityIdeas = await Idea.countDocuments({ isStaticIdea: false, isAdmin: { $ne: true } });
    const adminIdeas = await Idea.countDocuments({ isAdmin: true });
    const staticIdeas = await Idea.countDocuments({ isStaticIdea: true });

    console.log(`👥 Community ideas: ${communityIdeas}`);
    console.log(`👨‍💼 Admin ideas: ${adminIdeas}`);
    console.log(`📚 Static ideas: ${staticIdeas}`);

    // Count by category
    const categories = await Idea.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    console.log("\n📋 Ideas by category:");
    categories.forEach(cat => {
      console.log(`  ${cat._id}: ${cat.count}`);
    });

    // Count by status
    const statusCounts = await Idea.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    console.log("\n📊 Ideas by status:");
    statusCounts.forEach(status => {
      console.log(`  ${status._id}: ${status.count}`);
    });

    // Show featured ideas
    const featuredIdeas = await Idea.find({ featured: true }).select("title category");
    console.log("\n⭐ Featured ideas:");
    featuredIdeas.forEach((idea, index) => {
      console.log(`  ${index + 1}. ${idea.title} (${idea.category})`);
    });

    // Show sample ideas
    console.log("\n📋 Sample ideas:");
    const sampleIdeas = await Idea.find().limit(3).select("title category isAdmin isStaticIdea source");
    sampleIdeas.forEach((idea, index) => {
      const type = idea.isAdmin ? "Admin" : idea.isStaticIdea ? "Static" : "Community";
      console.log(`  ${index + 1}. ${idea.title} (${idea.category}) - ${type}`);
    });

    // Check for any missing required fields
    const ideasWithMissingFields = await Idea.find({
      $or: [
        { title: { $exists: false } },
        { description: { $exists: false } },
        { category: { $exists: false } },
        { investmentRange: { $exists: false } }
      ]
    });

    if (ideasWithMissingFields.length > 0) {
      console.log("\n⚠️ Ideas with missing required fields:");
      ideasWithMissingFields.forEach(idea => {
        console.log(`  - ${idea.title || 'Untitled'}`);
      });
    } else {
      console.log("\n✅ All ideas have required fields");
    }

    console.log("\n🎉 Verification completed successfully!");

  } catch (error) {
    console.error("❌ Error verifying seeded data:", error);
    throw error;
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
}

// Run the verification script
if (import.meta.url === `file://${process.argv[1]}`) {
  verifySeed()
    .then(() => {
      console.log("✅ Verification completed successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Verification failed:", error);
      process.exit(1);
    });
}

export default verifySeed;

