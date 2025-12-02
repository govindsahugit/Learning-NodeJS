import express from "express";

const app = express();

app.use(express.json());

app.post("/webhook", (req, res) => {
  console.log(req.headers);
  console.log(req.body);
  console.log(req.body.payload);
  res.json({ message: "Got the data." });
});

app.listen(4000, () => {
  console.log(`Server running on http://localhost:4000`);
});

// anurag@321
