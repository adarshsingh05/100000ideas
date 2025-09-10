import jwt from "jsonwebtoken";
import User from "./models/User";

// Generate JWT token
export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// Verify JWT token
export const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    return user;
  } catch (error) {
    throw error;
  }
};

// Authenticate token middleware for API routes
export const authenticateToken = async (request) => {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      throw new Error("Access denied. No token provided.");
    }

    const user = await verifyToken(token);
    if (!user) {
      throw new Error("Invalid token. User not found.");
    }

    return user;
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid token.");
    } else if (error.name === "TokenExpiredError") {
      throw new Error("Token expired.");
    }
    throw error;
  }
};

// Validation helpers
export const validateEmail = (email) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateName = (name) => {
  return name && name.trim().length >= 2 && name.trim().length <= 50;
};
