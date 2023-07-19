import mongoose from "mongoose";

const MorbidreDesignsSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});

let MorbidreDesigns = mongoose.model("MorbidreDesigns", MorbidreDesignsSchema);

export default MorbidreDesigns;
