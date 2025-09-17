const express = require("express");
const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");
const User = require("../models/User");
const { generateToken, authenticateToken } = require("../middleware/auth");

const router = express.Router();

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: "Too many authentication attempts, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Validation rules
const signupValidation = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("age")
    .optional()
    .isInt({ min: 13, max: 120 })
    .withMessage("Age must be between 13 and 120"),
  body("monthlyIncome")
    .optional()
    .isIn([
      "0-25000",
      "25000-50000",
      "50000-100000",
      "100000-200000",
      "200000+",
    ])
    .withMessage("Invalid monthly income range"),
  body("gender")
    .optional()
    .isIn(["male", "female", "other", "prefer-not-to-say"])
    .withMessage("Invalid gender selection"),
  body("isPhysicallyDisabled")
    .optional()
    .isIn(["no", "yes", "prefer-not-to-say"])
    .withMessage("Invalid disability status selection"),
  body("maritalStatus")
    .optional()
    .isIn(["single", "married", "divorced", "widowed", "prefer-not-to-say"])
    .withMessage("Invalid marital status selection"),
  body("area")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Area cannot be more than 100 characters"),
];

const loginValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post("/signup", signupValidation, async (req, res) => {
  console.log("Signup endpoint hit with data:", req.body);
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const {
      name,
      email,
      password,
      age,
      monthlyIncome,
      gender,
      isPhysicallyDisabled,
      maritalStatus,
      area,
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      age,
      monthlyIncome,
      gender,
      isPhysicallyDisabled,
      maritalStatus,
      area,
    });

    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);

    // Update last login
    await user.updateLastLogin();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          age: user.age,
          monthlyIncome: user.monthlyIncome,
          gender: user.gender,
          isPhysicallyDisabled: user.isPhysicallyDisabled,
          maritalStatus: user.maritalStatus,
          area: user.area,
          createdAt: user.createdAt,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post("/login", authLimiter, loginValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Update last login
    await user.updateLastLogin();

    res.json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          age: user.age,
          monthlyIncome: user.monthlyIncome,
          gender: user.gender,
          isPhysicallyDisabled: user.isPhysicallyDisabled,
          maritalStatus: user.maritalStatus,
          area: user.area,
          lastLogin: user.lastLogin,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get("/me", authenticateToken, async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching profile",
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user (client-side token removal)
// @access  Private
router.post("/logout", authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

module.exports = router;
