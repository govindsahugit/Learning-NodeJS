import express from "express";

const app = express();

const PORT = 4000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json({
    message: "Hello world!",
  });
});

app.get("/get", (req, res) => {
  res.json({
    message: "Hello world! get",
  });
});

app.post("/post", (req, res) => {
  res.json({
    message: "Hello world! post",
  });
});

app.listen(PORT, () => {
  console.log("Server started on port 4000");
});
