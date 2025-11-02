import express from "express";
import { addToCart, removeFromCart, getCart, clearCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";
import cartModel from "../models/cartModel.js"; // ✅ You missed this import earlier!

const cartRouter = express.Router();

// 🛒 Add item to cart
cartRouter.post("/add", authMiddleware, addToCart);

// ❌ Remove item from cart
cartRouter.post("/remove", authMiddleware, removeFromCart);

// 📦 Get cart for a user
cartRouter.get("/get", authMiddleware, getCart);

// 🧹 Clear entire cart (used after successful payment)
cartRouter.post("/clear", authMiddleware, clearCart);

export default cartRouter;
