import express from "express"
import { addFood } from "../controllers/foodController.js"
import multer from "multer"

// making express router 
const foodRouter = express.Router();

// image storage engine
const storage = multer.diskStorage({ 
  destination: "uploads",                           // stored at upload folder
  filename:(req, res, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`)  // filename will become unique by this
  }
})

const upload = multer({storage: storage})   // store the img in the uploads folder 

foodRouter.post("/add", upload.single("image"), addFood)



export default foodRouter;


