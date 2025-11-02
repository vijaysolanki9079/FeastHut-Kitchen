import express from "express";
import { createOrder, verifyPayment, getOrdersByUser } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

// Create order (requires authentication)
orderRouter.post("/create", authMiddleware, createOrder);

// Verify payment (no auth needed)
orderRouter.post("/verify", verifyPayment);

// Get user orders (for future use)
orderRouter.get("/userorders", authMiddleware, getOrdersByUser);

export default orderRouter;