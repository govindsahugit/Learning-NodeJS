import express from "express";
import bcrypt from "bcrypt";

const app = express();
const PORT = 4000;

const rateLimitStore = {};

const rateLimiter =
  ({ windowSize, numberOfRequests }) =>
  (req, res, next) => {
    const currentTime = Date.now();
    if (!rateLimitStore[req.ip]) {
      rateLimitStore[req.ip] = {
        startTime: currentTime,
        count: 1,
      };
      return next();
    }
    if (currentTime - rateLimitStore[req.ip].startTime > windowSize * 1000) {
      rateLimitStore[req.ip] = {
        startTime: currentTime,
        count: 1,
      };
    } else {
      if (rateLimitStore[req.ip].count >= numberOfRequests) {
        return res.status(429).json({
          error: "Too many requests. Please slow down!",
        });
      }
      rateLimitStore[req.ip].count++;
    }
    console.log(rateLimitStore);
    next();
  };

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get(
  "/register",
  rateLimiter({ windowSize: 5, numberOfRequests: 2 }),
  async (req, res) => {
    bcrypt.hash("123456", 14);
    return res.json({ message: "Registered Successfully" });
  }
);

app.listen(PORT, () => {
  console.log(`🚀 Visit http://localhost:${PORT}`);
});
