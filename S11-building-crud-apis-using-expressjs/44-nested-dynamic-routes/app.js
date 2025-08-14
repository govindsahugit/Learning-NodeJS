import express from "express";

const app = express();

app.get("/blogs/:blogId", (req, res) => {
  console.log(req.params);
  res.json(req.params);
});

app.get("/blogs/:blogId/comments", (req, res) => {
  console.log("comments");
  console.log(req.params);
  res.json([1, 3, 4]);
});

app.get("/blogs/:blogId/comments/:commentId", (req, res) => {
  console.log(req.params);
  res.json(req.params);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
