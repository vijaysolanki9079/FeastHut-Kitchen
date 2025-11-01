import { response } from "express";
import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if(!token){
    return response.json({success:false, message:"Not Authorized ! Login again."})
  }

  try {
    // ✅ Verify the token using the secret key stored in environment variables
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Extract the user ID from the decoded token and attach it to the request body
    req.body.userId = token_decode.id;

    // ✅ Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
    response.json({success:false, message:"Error"})
  }

}

export default authMiddleware;