import connectDB from "@/db/connect";
import Collections from "@/db/models/collections";
import KidlitIllustrations from "@/db/models/kidlit_illustrations";
import MorbidreIllustrations from "@/db/models/morbidre_illustrations";
import MorbidreDesign from "@/db/models/morbidre_design";
import Review from "@/db/models/reviews";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await connectDB();

    const { model, id } = req.query;

    let Model;
    switch (model) {
      case "collections":
        Model = Collections;
        break;
      case "kidlit":
        Model = KidlitIllustrations;
        break;
      case "morbidre_i":
        Model = MorbidreIllustrations;
        break;
      case "morbidre_d":
        Model = MorbidreDesign;
        break;
      case "review":
        Model = Review;
        break;
      default:
        return res.status(400).json({ message: "Invalid model" });
    }

    await Model.findByIdAndDelete(id);

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
