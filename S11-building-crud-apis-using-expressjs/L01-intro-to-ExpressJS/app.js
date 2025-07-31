import express from "express";

const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.write("Hello World!");
  res.end();
});

app.listen(port, () => {
  console.log("Server is running on port 4000");
});
