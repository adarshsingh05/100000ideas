import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Banner schema (matching the frontend model)
const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [50, "Title cannot be more than 50 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [200, "Description cannot be more than 200 characters"],
    },
    buttonText: {
      type: String,
      required: [true, "Button text is required"],
      trim: true,
      maxlength: [30, "Button text cannot be more than 30 characters"],
    },
    redirectUrl: {
      type: String,
      required: [true, "Redirect URL is required"],
      trim: true,
    },
    backgroundImage: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: String,
      default: "admin",
    },
    clicks: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Banner = mongoose.models.Banner || mongoose.model("Banner", bannerSchema);

async function seedBanners() {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      "mongodb+srv://project_1:project_1@cluster0.pwx2r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");

    // Clear existing banners
    await Banner.deleteMany({});
    console.log("Cleared existing banners");

    // Sample banner data
    const sampleBanners = [
      {
        title: "WELCOME DAY MANIA",
        description:
          "Collect your First day rewards at Reward Shelf and start your entrepreneurial journey today!",
        buttonText: "Earn My Icoins",
        redirectUrl: "/ideas",
        backgroundImage: null, // Will use default blue gradient
        isActive: true,
        displayOrder: 1,
      },
      {
        title: "DISCOVER AMAZING IDEAS",
        description:
          "Explore thousands of business opportunities tailored to your skills and investment capacity.",
        buttonText: "Explore Ideas",
        redirectUrl: "/ideas",
        backgroundImage: null,
        isActive: true,
        displayOrder: 2,
      },
      {
        title: "JOIN OUR COMMUNITY",
        description:
          "Connect with like-minded entrepreneurs and share your innovative business concepts.",
        buttonText: "Join Now",
        redirectUrl: "/community-ideas",
        backgroundImage: null,
        isActive: true,
        displayOrder: 3,
      },
      {
        title: "PREMIUM FEATURES",
        description:
          "Unlock unlimited access to AI-powered insights and advanced business planning tools.",
        buttonText: "Upgrade Now",
        redirectUrl: "/subscribe",
        backgroundImage: null,
        isActive: false, // Inactive banner
        displayOrder: 4,
      },
    ];

    // Insert sample banners
    const createdBanners = await Banner.insertMany(sampleBanners);
    console.log(`Created ${createdBanners.length} banners`);

    // Display created banners
    createdBanners.forEach((banner, index) => {
      console.log(
        `${index + 1}. ${banner.title} - ${
          banner.isActive ? "Active" : "Inactive"
        }`
      );
    });

    console.log("Banner seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding banners:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

// Run the seeding function
seedBanners();
