import mongoose from "mongoose";

const MorbidreDesignSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});

let MorbidreDesign =
  mongoose.models.MorbidreDesign ||
  mongoose.model("MorbidreDesign", MorbidreDesignSchema);

export default MorbidreDesign;
