
import mongoose from "mongoose"

// two is for disable temaporarily
const IsExistEnum = [1, 2];

const categorySchema = new mongoose.Schema({
  name: String,
  image_url:String,
  is_exist: {
    type: Number,
    enum: IsExistEnum,
    default: 1,
  },
});

const Category = mongoose.model('Category', categorySchema);
export default Category;