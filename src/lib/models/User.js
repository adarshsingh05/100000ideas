import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Don't include password in queries by default
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
    profile: {
      avatar: {
        type: String,
        default: "",
      },
      bio: {
        type: String,
        maxlength: [500, "Bio cannot be more than 500 characters"],
      },
      location: {
        type: String,
        maxlength: [100, "Location cannot be more than 100 characters"],
      },
      website: {
        type: String,
        maxlength: [200, "Website URL cannot be more than 200 characters"],
      },
    },
    // Additional registration fields
    phone: {
      type: String,
      trim: true,
      match: [/^\+?[\d\s-()]+$/, "Please enter a valid phone number"],
    },
    age: {
      type: String,
      trim: true,
    },
    annualIncome: {
      type: String,
      enum: [
        "Below 5 Lakhs",
        "5-10 Lakhs",
        "10-25 Lakhs",
        "25-50 Lakhs",
        "Above 50 Lakhs",
      ],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    caste: {
      type: String,
      enum: ["General", "OBC", "SC", "ST"],
    },
    physicallyChallenged: {
      type: String,
      enum: ["No", "Yes"],
      default: "No",
    },
    area: {
      type: String,
      enum: ["Urban", "Rural", "Semi-Urban"],
    },
    profilePicture: {
      type: String,
      default: null,
    },
    // Profile stats
    balanceIcoins: {
      type: Number,
      default: 0,
    },
    savedIdeas: {
      type: Number,
      default: 0,
    },
    purchased: {
      type: Number,
      default: 0,
    },
    completionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    preferences: {
      newsletter: {
        type: Boolean,
        default: true,
      },
      notifications: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update last login
userSchema.methods.updateLastLogin = function () {
  this.lastLogin = new Date();
  return this.save({ validateBeforeSave: false });
};

// Remove password from JSON output
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

export default mongoose.models.User || mongoose.model("User", userSchema);
