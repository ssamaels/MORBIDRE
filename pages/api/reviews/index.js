import connectDB from "../db/connect";
import Review from "../db/models/reviews";

export default async function handler(request, response) {
  await connectDB();
  if (request.method === "POST") {
    console.log(request.body);
    try {
      const reviewData = request.body;
      const review = new Review(reviewData);
      await review.save();
      response.status(201).json({ status: "Review created" });
      console.log(response);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
