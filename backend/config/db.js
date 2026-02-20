import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("✅ DB Connected");

    mongoose.connection.on("disconnected", () => {
      console.log("❌ MongoDB disconnected!");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("✅ MongoDB reconnected!");
    });

  } catch (error) {
    console.log("DB Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
