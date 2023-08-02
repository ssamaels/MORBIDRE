import cloudinary from "cloudinary";
import connectDB from "@/db/connect";
import MorbidreDesign from "@/db/models/morbidre_design";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadKidlit = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  await connectDB();

  upload.single("file")(req, res, async function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    const fileStr = req.file.buffer.toString("base64");

    cloudinary.v2.uploader.upload(
      "data:image/png;base64," + fileStr,
      { resource_type: "auto" },
      async (error, result) => {
        if (error) {
          console.log("Upload error:", error);
          res.status(500).json({ error: "Upload failed." });
          return;
        }
        const newDesign = new MorbidreDesign({
          image: result.url,
        });
        await newDesign.save();
        res.status(200).json({ success: true });
      }
    );
  });
};

export default uploadKidlit;
