import express from "express";
import multer from "multer";
import path from "path";
import cors from 'cors';
import crypto from "crypto";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const id = crypto.randomUUID();
    const extension = path.extname(file.originalname);
    file.id = id;
    cb(null, `${id}${extension}`);
  },
});

const upload = multer({ storage });

const app = express();
const PORT = 4000;

app.use(cors())

app.get("/", (req, res) => {
  res.json({
    message: "Hello world!",
  });
});

app.post(
  "/upload",
  upload.single("profilePic"),
  (req, res) => {
    console.log("Upload completed");
    res.json(req.file);
  }
);
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
