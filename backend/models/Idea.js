const mongoose = require("mongoose");

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
      default: "/bulb.png", // Default image
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
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
ideaSchema.index({ uploadedBy: 1, status: 1 });
ideaSchema.index({ category: 1, status: 1 });
ideaSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Idea", ideaSchema);
