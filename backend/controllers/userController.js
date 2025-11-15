import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator"

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials!" });
    }

    // create token
    const token = createToken(user._id) 

    res.json({
      success: true,
      message: "Login successful!",
      token 
    }
  );
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error logging in!" });
  }
};

// Register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists!" });
    }

    // validating email format & strong password
    if(!validator.isEmail(email)) {
      return res.json({success:false, message:"Please enter valid email"})
    }

    if(password.length < 8){
      return res.json({succuss:false, message:"Please enter strong password"})
    }

    // hash user password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name:name,
      email:email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id)
    res.json({ success: true, token});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error registering user!" });
  }
};




export { registerUser, loginUser };
