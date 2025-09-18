const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Define the Idea schema directly in the script
const ideaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Technology",
        "Healthcare",
        "Education",
        "Finance",
        "E-commerce",
        "Food & Beverage",
        "Travel & Tourism",
        "Real Estate",
        "Entertainment",
        "Fashion",
        "Sports",
        "Automotive",
        "Agriculture",
        "Energy",
        "Manufacturing",
        "Other",
      ],
    },
    investmentRange: {
      type: String,
      required: true,
      enum: [
        "Under ₹1 Lakh",
        "₹1-5 Lakhs",
        "₹5-10 Lakhs",
        "₹10-25 Lakhs",
        "₹25-50 Lakhs",
        "₹50 Lakhs - 1 Crore",
        "Above ₹1 Crore",
      ],
    },
    timeToStart: {
      type: String,
      required: true,
      enum: [
        "Immediately",
        "1-3 months",
        "3-6 months",
        "6-12 months",
        "1-2 years",
        "More than 2 years",
      ],
    },
    targetAudience: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    keyFeatures: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return v.length >= 1 && v.length <= 5;
        },
        message: "Key features must be between 1 and 5 items",
      },
    },
    businessModel: {
      type: String,
      required: true,
      enum: [
        "B2B (Business to Business)",
        "B2C (Business to Consumer)",
        "B2B2C (Business to Business to Consumer)",
        "C2C (Consumer to Consumer)",
        "Subscription",
        "Freemium",
        "Marketplace",
        "SaaS (Software as a Service)",
        "E-commerce",
        "Other",
      ],
    },
    revenueStreams: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return v.length >= 1 && v.length <= 3;
        },
        message: "Revenue streams must be between 1 and 3 items",
      },
    },
    competitiveAdvantage: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    challenges: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    marketSize: {
      type: String,
      required: true,
      enum: [
        "Local (City/Town)",
        "Regional (State/Province)",
        "National",
        "International",
        "Global",
      ],
    },
    requiredSkills: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return v.length >= 1 && v.length <= 5;
        },
        message: "Required skills must be between 1 and 5 items",
      },
    },
    contactInfo: {
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
      },
      phone: {
        type: String,
        trim: true,
        match: [/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"],
      },
    },
    imageUrl: {
      type: String,
      trim: true,
      default: "/bulb.png",
    },
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
    uploadedByEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    uploadedByName: {
      type: String,
      required: true,
      trim: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    savedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    tags: [String],
    // Fields for static ideas migrated from JSON
    isStaticIdea: {
      type: Boolean,
      default: false,
    },
    originalId: {
      type: Number,
      sparse: true, // Allow null values but ensure uniqueness when present
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create the Idea model
const Idea = mongoose.models.Idea || mongoose.model("Idea", ideaSchema);

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://project_1:project_1@cluster0.pwx2r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

// Read JSON files
const readJsonFile = (filePath) => {
  try {
    const fullPath = path.join(__dirname, "..", filePath);
    const data = fs.readFileSync(fullPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`❌ Error reading ${filePath}:`, error);
    return null;
  }
};

// Transform businessIdeas.json data to match Idea schema
const transformBusinessIdeas = (businessIdeasData) => {
  const ideas = [];

  Object.values(businessIdeasData).forEach((idea, index) => {
    // Create a dummy user ID for static ideas
    const dummyUserId = new mongoose.Types.ObjectId();

    const transformedIdea = {
      title: idea.title,
      description: idea.description,
      category: mapCategory(idea.category),
      investmentRange: mapInvestmentAmount(idea.investmentAmount),
      timeToStart: mapTimeToMarket(idea.timeToMarket),
      targetAudience: "General consumers and businesses",
      keyFeatures: idea.tags || [],
      businessModel: "Subscription",
      revenueStreams: ["Subscription fees", "Premium features"],
      competitiveAdvantage: idea.description,
      challenges: "Market competition and user acquisition",
      marketSize: "Global",
      requiredSkills: [
        "Technical development",
        "Marketing",
        "Business strategy",
      ],
      contactInfo: {
        email: "contact@example.com",
        phone: "9876543210",
      },
      imageUrl: idea.image || "/bulb.png",
      uploadedBy: dummyUserId,
      uploadedByEmail: "system@1000ideas.com",
      uploadedByName: "System",
      tags: idea.tags || [],
      status: "published",
      views: idea.reviews || 0,
      likes: Math.floor(Math.random() * 100),
      isStaticIdea: true, // Flag to identify static ideas
      originalId: idea.id, // Keep original ID for reference
      featured: index < 8, // First 8 ideas are featured
    };

    ideas.push(transformedIdea);
  });

  return ideas;
};

// Transform detailedBusinessIdeas.json data to match Idea schema
const transformDetailedBusinessIdeas = (detailedIdeasData) => {
  const ideas = [];

  detailedIdeasData.forEach((idea, index) => {
    // Create a dummy user ID for static ideas
    const dummyUserId = new mongoose.Types.ObjectId();

    const transformedIdea = {
      title: idea.title,
      description: idea.detailedDescription || idea.description,
      category: mapCategory(idea.category),
      investmentRange: mapInvestmentAmount(idea.investment),
      timeToStart: mapTimeToMarket(idea.timeToMarket),
      targetAudience:
        idea.marketAnalysis?.targetAudience || "General consumers",
      keyFeatures: idea.tags || [],
      businessModel: idea.businessModel || "Subscription",
      revenueStreams: idea.revenueStreams || ["Subscription fees"],
      competitiveAdvantage: idea.competitiveAdvantage || idea.description,
      challenges: Array.isArray(idea.challenges)
        ? idea.challenges.join(", ")
        : idea.challenges || "Market competition and user acquisition",
      marketSize: mapMarketSize(idea.marketAnalysis?.marketSize) || "Global",
      requiredSkills: idea.requiredSkills || [
        "Technical development",
        "Marketing",
      ],
      contactInfo: {
        email: "contact@example.com",
        phone: "9876543210",
      },
      imageUrl: idea.image || "/bulb.png",
      uploadedBy: dummyUserId,
      uploadedByEmail: "system@1000ideas.com",
      uploadedByName: "System",
      tags: idea.tags || [],
      status: "published",
      views: idea.views || 0,
      likes: idea.likes || Math.floor(Math.random() * 100),
      isStaticIdea: true, // Flag to identify static ideas
      originalId: idea.id, // Keep original ID for reference
      featured: false, // Detailed ideas are not featured by default
    };

    ideas.push(transformedIdea);
  });

  return ideas;
};

// Helper function to map investment amounts
const mapInvestmentAmount = (amount) => {
  if (!amount) return "Under ₹1 Lakh";

  const amountStr = amount.toString().toLowerCase();
  if (amountStr.includes("1.2cr") || amountStr.includes("1.2 cr"))
    return "₹50 Lakhs - 1 Crore";
  if (amountStr.includes("50l") || amountStr.includes("50 lakh"))
    return "₹25-50 Lakhs";
  if (amountStr.includes("25l") || amountStr.includes("25 lakh"))
    return "₹10-25 Lakhs";
  if (amountStr.includes("10l") || amountStr.includes("10 lakh"))
    return "₹5-10 Lakhs";
  if (amountStr.includes("5l") || amountStr.includes("5 lakh"))
    return "₹1-5 Lakhs";
  if (amountStr.includes("1l") || amountStr.includes("1 lakh"))
    return "Under ₹1 Lakh";

  return "Under ₹1 Lakh";
};

// Helper function to map time to market
const mapTimeToMarket = (timeToMarket) => {
  if (!timeToMarket) return "3-6 months";

  const timeStr = timeToMarket.toString().toLowerCase();
  if (timeStr.includes("immediately") || timeStr.includes("1 month"))
    return "Immediately";
  if (timeStr.includes("1-3") || timeStr.includes("2-3")) return "1-3 months";
  if (timeStr.includes("3-6") || timeStr.includes("4-6")) return "3-6 months";
  if (timeStr.includes("6-9") || timeStr.includes("6-12")) return "6-12 months";
  if (timeStr.includes("1-2 year") || timeStr.includes("12 month"))
    return "1-2 years";
  if (timeStr.includes("2+") || timeStr.includes("more than 2"))
    return "More than 2 years";

  return "3-6 months";
};

// Helper function to map market size
const mapMarketSize = (marketSize) => {
  if (!marketSize) return "Global";

  const sizeStr = marketSize.toString().toLowerCase();
  if (
    sizeStr.includes("local") ||
    sizeStr.includes("city") ||
    sizeStr.includes("town")
  )
    return "Local (City/Town)";
  if (
    sizeStr.includes("regional") ||
    sizeStr.includes("state") ||
    sizeStr.includes("province")
  )
    return "Regional (State/Province)";
  if (sizeStr.includes("national") || sizeStr.includes("country"))
    return "National";
  if (sizeStr.includes("international") || sizeStr.includes("multi-country"))
    return "International";
  if (sizeStr.includes("global") || sizeStr.includes("worldwide"))
    return "Global";

  return "Global";
};

// Helper function to map category
const mapCategory = (category) => {
  if (!category) return "Other";

  const categoryStr = category.toString().toLowerCase();
  if (
    categoryStr.includes("health") ||
    categoryStr.includes("wellness") ||
    categoryStr.includes("fitness")
  )
    return "Healthcare";
  if (
    categoryStr.includes("tech") ||
    categoryStr.includes("ai") ||
    categoryStr.includes("software")
  )
    return "Technology";
  if (
    categoryStr.includes("education") ||
    categoryStr.includes("learning") ||
    categoryStr.includes("training")
  )
    return "Education";
  if (
    categoryStr.includes("finance") ||
    categoryStr.includes("fintech") ||
    categoryStr.includes("money")
  )
    return "Finance";
  if (
    categoryStr.includes("ecommerce") ||
    categoryStr.includes("e-commerce") ||
    categoryStr.includes("retail")
  )
    return "E-commerce";
  if (
    categoryStr.includes("food") ||
    categoryStr.includes("beverage") ||
    categoryStr.includes("restaurant")
  )
    return "Food & Beverage";
  if (
    categoryStr.includes("travel") ||
    categoryStr.includes("tourism") ||
    categoryStr.includes("hotel")
  )
    return "Travel & Tourism";
  if (
    categoryStr.includes("real estate") ||
    categoryStr.includes("property") ||
    categoryStr.includes("housing")
  )
    return "Real Estate";
  if (
    categoryStr.includes("entertainment") ||
    categoryStr.includes("media") ||
    categoryStr.includes("gaming")
  )
    return "Entertainment";
  if (
    categoryStr.includes("fashion") ||
    categoryStr.includes("clothing") ||
    categoryStr.includes("apparel")
  )
    return "Fashion";
  if (
    categoryStr.includes("sports") ||
    categoryStr.includes("fitness") ||
    categoryStr.includes("gym")
  )
    return "Sports";
  if (
    categoryStr.includes("automotive") ||
    categoryStr.includes("car") ||
    categoryStr.includes("vehicle")
  )
    return "Automotive";
  if (
    categoryStr.includes("agriculture") ||
    categoryStr.includes("farming") ||
    categoryStr.includes("crop")
  )
    return "Agriculture";
  if (
    categoryStr.includes("energy") ||
    categoryStr.includes("power") ||
    categoryStr.includes("solar")
  )
    return "Energy";
  if (
    categoryStr.includes("manufacturing") ||
    categoryStr.includes("production") ||
    categoryStr.includes("factory")
  )
    return "Manufacturing";

  return "Other";
};

// Main migration function
const migrateData = async () => {
  try {
    console.log("🚀 Starting JSON to MongoDB migration...");

    // Connect to database
    await connectDB();

    // Read JSON files
    console.log("📖 Reading JSON files...");
    const businessIdeasData = readJsonFile("src/data/businessIdeas.json");
    const detailedIdeasData = readJsonFile(
      "src/data/detailedBusinessIdeas.json"
    );

    if (!businessIdeasData || !detailedIdeasData) {
      console.error("❌ Failed to read JSON files");
      return;
    }

    // Transform data
    console.log("🔄 Transforming data...");
    const businessIdeas = transformBusinessIdeas(businessIdeasData);
    const detailedIdeas = transformDetailedBusinessIdeas(detailedIdeasData);

    // Combine all ideas
    const allIdeas = [...businessIdeas, ...detailedIdeas];
    console.log(`📊 Total ideas to migrate: ${allIdeas.length}`);

    // Clear existing static ideas first
    console.log("🧹 Clearing existing static ideas...");
    await Idea.deleteMany({ isStaticIdea: true });

    // Insert new ideas
    console.log("💾 Inserting ideas into database...");
    const result = await Idea.insertMany(allIdeas);

    console.log(`✅ Successfully migrated ${result.length} ideas to MongoDB`);

    // Verify migration
    const count = await Idea.countDocuments({ isStaticIdea: true });
    console.log(`🔍 Verification: ${count} static ideas in database`);

    console.log("🎉 Migration completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
};

// Run migration
if (require.main === module) {
  migrateData();
}

module.exports = { migrateData };
