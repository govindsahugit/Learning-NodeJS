import express from "express";
import mongoose from "mongoose";
import { readFile } from "fs/promises";

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

app.use(async (req, res, next) => {
  const nonce = crypto.randomUUID();
  if (req.headers.accept?.includes("text/html"))
    res.setHeader(
      "Content-Security-Policy",
      `default-src 'self';\
  script-src 'self' 'nonce-${nonce}' 'report-sample' https://cdn.tailwindcss.com;\
  img-src 'self' https://images.unsplash.com;\
  style-src 'self' 'unsafe-inline';\
  connect-src 'self';\
  report-uri /csp-violations`
    );

  if (req.url === "/") {
    const innerHTMLFile = await readFile("./public/index.html", "utf8");
    res.send(innerHTMLFile.replace("${nonce}", nonce));
  }

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
