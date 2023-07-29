import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export default Review;
