import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

export default connectDB;
