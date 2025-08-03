import express from "express";

const app = express();

const PORT = 4000;

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "PUT");
  next();
});

app.get("/", (req, res) => {
  res.json({
    message: "Hello world!",
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world! get",
  });
});

app.post("/api", (req, res) => {
  res.json({
    message: "Hello world! post",
  });
});

app.put("/api", (req, res) => {
  res.json({
    message: "Hello world! put",
  });
});

app.delete("/api", (req, res) => {
  res.json({
    message: "Hello world! delete",
  });
});

app.listen(PORT, () => {
  console.log("Server started on port 4000");
});
