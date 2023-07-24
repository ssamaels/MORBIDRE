import connectDB from "../../../db/connect";
import Review from "../../../db/models/reviews";

export default async function handler(request, response) {
  await connectDB();
  if (request.method === "GET") {
    const reviews = await Review.find();

    return response.status(200).json(reviews);
  }
  if (request.method === "POST") {
    console.log(request.body);
    try {
      const reviewData = request.body;
      const review = new Review(reviewData);
      const savedReview = await review.save();
      console.log(savedReview);
      response.status(201).json({ status: "Review created", savedReview });
      console.log(response);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
