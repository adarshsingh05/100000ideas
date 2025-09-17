const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
    age: {
      type: Number,
      min: [13, "Age must be at least 13"],
      max: [120, "Age cannot be more than 120"],
    },
    monthlyIncome: {
      type: String,
      enum: [
        "0-25000",
        "25000-50000",
        "50000-100000",
        "100000-200000",
        "200000+",
      ],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", "prefer-not-to-say"],
    },
    isPhysicallyDisabled: {
      type: String,
      enum: ["no", "yes", "prefer-not-to-say"],
    },
    maritalStatus: {
      type: String,
      enum: ["single", "married", "divorced", "widowed", "prefer-not-to-say"],
    },
    area: {
      type: String,
      trim: true,
      maxlength: [100, "Area cannot be more than 100 characters"],
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

module.exports = mongoose.model("User", userSchema);
