import userModel from "../models/userModel.js";

// ✅ Add item to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const { itemId } = req.body;
    const user = await userModel.findById(userId);
    
    let cartData = user.cartData || {};

    // If the item already exists, increase its quantity
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    return res.json({ success: true, message: "Item added to cart", cartData });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Error adding to cart" });
  }
};

// ✅ Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const { itemId } = req.body;

    const user = await userModel.findById(userId);
    let cartData = user.cartData || {};

    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) {
        delete cartData[itemId];
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    return res.json({ success: true, message: "Item removed from cart", cartData });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Error removing from cart" });
  }
};

// ✅ Get all items in cart
export const getCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await userModel.findById(userId);

    return res.json({
      success: true,
      cartData: user.cartData || {},
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Error fetching cart" });
  }
};
