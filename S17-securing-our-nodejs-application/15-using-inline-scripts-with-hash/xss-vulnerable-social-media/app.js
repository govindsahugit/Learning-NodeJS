import express from "express";
import mongoose from "mongoose";

import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

const window = new JSDOM("").window;
const purify = DOMPurify(window);

const app = express();

app.use(express.json());

await mongoose.connect(
  "mongodb://admin:admin@localhost/socialApp?authSource=admin"
);

const postSchema = new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

app.use((req, res, next) => {
  if (req.headers.accept?.includes("text/html"))
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self';\
  script-src 'self' 'sha256-ohCv9YefGSe2MD1hGWFU5BB7RQHwlgbNI/awAgHP4TM=' 'report-sample' https://cdn.tailwindcss.com;\
  img-src 'self' https://images.unsplash.com;\
  style-src 'self' 'unsafe-inline';\
  connect-src 'self';\
  report-uri /csp-violations"
    );
  next();
});

// Middleware
app.use(express.static("./public"));

app.post(
  "/csp-violations",
  express.json({ type: "application/csp-report" }),
  (req, res) => {
    console.log(req.body);
    return res.status(204).end();
  }
);

// Routes
app.get("/posts", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.setHeader("Set-Cookie", "loginSecret=hdxhw7yrx.k;httpOnly=true");
  res.json(posts);
});

app.post("/posts", async (req, res) => {
  const content = req.body.content;
  const post = new Post({ content });
  await post.save();
  res.status(201).json(post);
});

// Start server
app.listen(4000, () => console.log("Server running on http://localhost:4000"));
