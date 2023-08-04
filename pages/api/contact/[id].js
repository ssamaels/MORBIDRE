import connectDB from "../../../db/connect";
import Contact from "../../../db/models/contact";

export default async function handler(req, res) {
  try {
    await connectDB();
    const { id } = req.query;

    if (req.method === "GET") {
      const contact = await Contact.findById(id);

      return res.status(200).json(contact);
    }
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
}