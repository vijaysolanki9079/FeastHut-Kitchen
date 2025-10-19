import mongoose from "mongoose"

const foodSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: false},
  price: {type: Number, required: true},
  image: {type: String, required: true},
  category: {type: String, required: true},
})

// Help to prevent rebuilding of same model again and again
// here "food" -> Name of this Model
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema)

export default foodModel;