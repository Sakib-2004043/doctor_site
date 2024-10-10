import mongoose from "mongoose";

const DB_URL: string  = "mongodb://localhost:27017/doctor";

const connectDB = async (): Promise<void> => {
  if (!DB_URL) {
    console.error("MongoDB connection string is not defined in environment variables.");
    throw new Error("MongoDB connection string is missing");
  }

  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(DB_URL);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw new Error("MongoDB connection failed");
    }
  } else {
    console.log("Already connected to MongoDB");
  }
};

export default connectDB;
