import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";

// 1. Add newfood 
// making express router
const foodRouter = express.Router();

// image storage engine
const storage = multer.diskStorage({
  destination: "uploads",  
  filename: (req, file, cb) => {
     return cb(null, `${Date.now()}-${file.originalname}`); 
  },
});

const upload = multer({ storage: storage }); 
foodRouter.post("/add", upload.single("image"), addFood);

// 2. 
foodRouter.get("/list", listFood)

// 3. 
foodRouter.post("/remove", removeFood);

export default foodRouter;
