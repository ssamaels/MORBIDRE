import mongoose from "mongoose";

const KidlitIllustrationsSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});

let KidlitIllustrations =
  mongoose.models.KidlitIllustrations ||
  mongoose.model("KidlitIllustrations", KidlitIllustrationsSchema);

export default KidlitIllustrations;
