import express from "express";
import httpLogger from "./loggingMiddleware.js";

const app = express();
app.use(express.json());

const posts = [
  {
    id: "1",
    title: "Introduction to Node.js",
    content: "Node.js lets us run JavaScript outside the browser.",
    authorId: "101",
  },
  {
    id: "2",
    title: "What is Express Middleware?",
    content: "Middleware runs during the request response cycle.",
    authorId: "102",
  },
];

app.use(httpLogger);

// GET all posts
app.get("/posts", async (req, res, next) => {
  try {
    req.log.info("Fetching all posts");
    // Simulating database call
    await new Promise((resolve, reject) =>
      setTimeout(() => {
        // reject({ message: "Database call failed", statusCode: 500 })
        resolve("Database call succeeded");
      }, 300),
    );

    res.json({
      success: true,
      data: posts,
    });
  } catch (err) {
    next(err);
  }
});

app.post("/posts", async (req, res, next) => {
  try {
    const { title, content, authorId } = req.body;

    if (!title || !content || !authorId) {
      const error = new Error("title, content and authorId are required");
      error.statusCode = 500;
      error.requestPayload = req.body;
      throw error;
    }

    req.log.info({ title, authorId }, "Creating post");

    // Simulating database call
    await new Promise((resolve) => setTimeout(resolve, 300));

    const newPost = {
      id: String(posts.length + 1),
      title,
      content,
      authorId,
    };

    posts.push(newPost);

    req.log.info({ postId: newPost.id }, "Post created successfully");

    res.status(201).json({
      success: true,
      data: newPost,
    });
  } catch (err) {
    next(err);
  }
});

// 404 handler
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.statusCode = 404;
  next(error);
});

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (statusCode >= 500) {
    req.log.error(err, "Request failed with server error");
  } else if (statusCode >= 400) {
    req.log.warn(err, "Request failed with client error");
  } else {
    req.log.error(err, "Request failed");
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    requestId: req.requestId,
  });
});

app.listen(4000, () => {
  // logger.info("Server is running on http://localhost:4000");
  console.log("Server is running on http://localhost:4000");
});
