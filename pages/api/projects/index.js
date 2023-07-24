import connectDB from "../db/connect";
import Review from "../db/models/reviews";

export default async function handler(request, response) {
  await connectDB();
  if (request.method === "GET") {
    const reviews = await Review.find();

    return response.status(200).json(reviews);
  }
  if (request.method === "POST") {
    try {
      const reviewData = request.body;
      const review = new Review(reviewData);
      await review.save();
      response.status(201).json({ status: "Review created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
