import express from "express";

const app = express();
const port = 4000;

app.get(
  "/",
  (req, res, next) => {
    // Request handler middleware
    console.log("Running Middleware 1");
    res.write("Hello world 1!");
    next();
  },
  (req, res) => {
    // Request handler middleware
    console.log("Running Middleware 2");
    res.end("Hello world 2!");
  },
  (err, req, res, next) => {
    // Error handler middleware
    console.log("Running Error Middleware");
    res.end("Error found");
  }
);

app.listen(port, () => {
  console.log("Running...");
});
