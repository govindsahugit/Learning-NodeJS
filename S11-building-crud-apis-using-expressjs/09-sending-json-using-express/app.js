import express from "express";

const app = express();
const port = 4000;

app.get("/", (req, res) => {
  // res.json({ message: "Hello World!" });
  res.status(200).json({ message: "Hello World!" });
});

app.listen(port, () => {
  console.log("Server is running on port 4000");
});
