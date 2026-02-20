import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// app config
const app = express();
// const port = 4000;
const port = process.env.PORT || 10000;

// middleware
app.use(express.json());

app.use(cors({
  origin: [
    "https://feast-hut-kitchen.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true
}));

// db connection
connectDB();

//api endpoint
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter);  // For user Auth 
app.use("/api/cart", cartRouter);  // For user Auth 
app.use("/api/order", orderRouter);


app.get("/", (req, res) => {
  res.send("API Working");
});

// run express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
