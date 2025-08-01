import express from "express";

const app = express();
const port = 4000;

app.use(express.static("files"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.end("Hello World!!");
});

app.get("/file", (req, res) => {
  res.sendFile(`${import.meta.dirname}/filename.extension`);
});

app.listen(port, () => {
  console.log("Server is running on port 4000");
});
