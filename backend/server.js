import express from "express";
import multer from "multer";
import fs from "fs";
import FormData from "form-data";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const upload = multer({ dest: "uploads/" });
app.use(cors());

console.log("JWT loaded:", process.env.PINATA_JWT);

// Upload multiple resumes
app.post("/upload-multiple", upload.array("files"), async (req, res) => {
  if (!req.files || req.files.length === 0) return res.status(400).send("No files uploaded");

  const uploadedResumes = [];

  try {
    for (const file of req.files) {
      const data = new FormData();
      data.append("file", fs.createReadStream(file.path));

      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data,
        {
          maxContentLength: "Infinity",
          headers: {
            Authorization: `Bearer ${process.env.PINATA_JWT}`,
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          },
        }
      );

      // Remove local file
      fs.unlinkSync(file.path);

      uploadedResumes.push({
        name: file.originalname,
        cid: response.data.IpfsHash,
        timestamp: new Date().toISOString(),
      });
    }

    res.json({ uploadedResumes });
  } catch (err) {
    console.error("Pinata upload error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Upload failed",
      details: err.response?.data || err.message,
    });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
