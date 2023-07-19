import mongoose from "mongoose";

const MorbidreIllustrationsSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});

let MorbidreIllustrations = mongoose.model(
  "MorbidreIllustrations",
  MorbidreIllustrationsSchema
);

export default MorbidreIllustrations;
