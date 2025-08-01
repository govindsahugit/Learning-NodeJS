import express from "express";

const app = express();
const port = 4000;

app.use("/users", (req, res, next) => {
  res.send("First Middleware.");
});

app.use("/user/1", (req, res, next) => {
  res.send("Second Middleware.");
});

app.listen(port, () => {
  console.log("Server is running on port 4000");
});
