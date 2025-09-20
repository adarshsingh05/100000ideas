import mongoose from "mongoose";

// Ensure the model is not already compiled
if (mongoose.models.Banner) {
  delete mongoose.models.Banner;
}

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
    // Admin tracking
    createdBy: {
      type: String,
      default: "admin",
    },
    // Analytics
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

// Index for better query performance
bannerSchema.index({ isActive: 1, displayOrder: 1 });
bannerSchema.index({ createdAt: -1 });

export default mongoose.models.Banner || mongoose.model("Banner", bannerSchema);
