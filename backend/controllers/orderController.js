import Razorpay from "razorpay";
import crypto from "crypto";
import orderModel from "../models/orderModel.js";

// ✅ Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Create order
export const createOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    
    // Get userId from auth middleware (stored in req.userId)
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "User authentication required" });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }
    
    // ✅ Step 1: Convert USD → INR
    const usdToInrRate = 83; // or fetch dynamically (see below)
    const convertedAmount = amount * usdToInrRate;

    // ✅ Step 2: Create Razorpay order
    const options = {
      amount: Math.round(convertedAmount * 100), // ₹ → paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // ✅ Save order in database (payment pending)
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      status: "Food Processing",
      payment: false,
    });

    await newOrder.save();

    // ✅ Send response to frontend
    res.json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      orderId: razorpayOrder.id, // Razorpay order ID
      newOrderId: newOrder._id, // MongoDB order ID
    });

  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Error creating order" });
  }
};

// ✅ Verify payment
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
      return res.status(400).json({ success: false, message: "Missing payment details" });
    }

    // ✅ Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // ✅ Payment verified successfully
      await orderModel.findByIdAndUpdate(orderId, { 
        payment: true, 
        status: "Order Confirmed" 
      });
      
      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid payment signature" });
    }

  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, message: "Payment verification failed" });
  }
};

// ✅ Get orders by user (optional - for future MyOrders page)
export const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.userId; // From auth middleware
    const orders = await orderModel.find({ userId }).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// ✅ List all orders (Admin)
export const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find()
      .populate("userId", "name email") // optional: show user info
      .sort({ createdAt: -1 }); // latest orders first

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};
