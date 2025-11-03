import express from "express";
import bcrypt from "bcrypt";
import { rateLimit } from "express-rate-limit";

const app = express();
const PORT = 4000;

const globalLimiter = rateLimit({
  windowMs: 5000, // 15 minutes
  limit: 2, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use(globalLimiter);

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/register", async (req, res) => {
  bcrypt.hash("123456", 14);
  return res.json({ message: "Registered Successfully" });
});

app.listen(PORT, () => {
  console.log(`🚀 Visit http://localhost:${PORT}`);
});
