import connectDB from "../../../db/connect";
import Contact from "../../../db/models/contact";

export default async function handler(request, response) {
  await connectDB();
  if (request.method === "GET") {
    const contacts = await Contact.find();

    return response.status(200).json(contacts);
  }
  if (request.method === "POST") {
    console.log(request.body);
    try {
      const contactData = request.body;
      const contact = new Contact(contactData);
      const savedContact = await contact.save();
      console.log(savedContact);
      response.status(201).json({ status: "Contact created", savedContact });
      console.log(response);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
