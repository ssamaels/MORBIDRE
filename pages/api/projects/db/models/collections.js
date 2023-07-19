import mongoose from "mongoose";

const CollectionsSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});

let Collections = mongoose.model("Collections", CollectionsSchema);

export default Collections;
