import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://greatstack-vijay:REDACTED_MONGO_PASSWORD@cluster0.fe3i8oz.mongodb.net/Food-Delivery-App"
    )
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => {
      console.error("❌ DB Connection Failed:", err);
    });
};
