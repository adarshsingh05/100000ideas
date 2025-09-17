import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return;
    }

    const conn = await mongoose.connect(
      "mongodb+srv://project_1:project_1@cluster0.pwx2r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

export default connectDB;
export { connectDB };
