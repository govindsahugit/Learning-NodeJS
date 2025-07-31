import express from "express";

const app = express();
const port = 4000;

// Logging in console
// app.use((req, res, next) => {
//   console.log(req.headers);
//   console.log(req.url);
//   next()
// });

// Parsing JSON body in console
// app.use((req, res, next) => {
//   req.on("data", (chunk) => {
//     const reqBody = JSON.parse(chunk);
//     req.body = reqBody;
//     next();
//   });
// });

// app.use(express.json());
app.use(express.text());

app.get("/", (req, res) => {
  res.end("Home Route");
});

app.get("/login", (req, res) => {
  res.end("Logged in");
});

app.post("/user", (req, res) => {
  console.log(req.body);
  res.end("Post User");
});

app.listen(port, () => {
  console.log("Server is running on port 4000");
});
