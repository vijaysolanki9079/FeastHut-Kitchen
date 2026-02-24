import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 10000;

// ===== DB CONNECTION =====
connectDB();

// ===== MIDDLEWARE =====
app.use(express.json());

// ⭐ CORS FIX (VERY IMPORTANT)
app.use(cors({
  origin: [
    "https://feast-hut-kitchen.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ===== ROUTES =====
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working 🚀");
});

// ===== SERVER START =====
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
