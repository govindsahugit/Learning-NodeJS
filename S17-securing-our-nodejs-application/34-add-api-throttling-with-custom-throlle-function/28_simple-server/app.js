import express from "express";
import bcrypt from "bcrypt";
import { rateLimit } from "express-rate-limit";
import { slowDown } from "express-slow-down";

const app = express();
const PORT = 4000;

const globalLimiter = rateLimit({
  windowMs: 20000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

// It isn't well designed like we did in our CUSTOM THROTTLE FUNCTION
const throttle = slowDown({
  windowMs: 5000,
  delayMs: (hits) => hits * 1000,
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// CUSTOM THROTTLE FUNCTION
// const throttle = (waitTime = 1000) => {
//   const throttleData = {};
//   return (req, res, next) => {
//     const now = Date.now();
//     const ip = req.ip;

//     const { previousDelay, lastRequestTime } = throttleData[ip] || {
//       previousDelay: 0,
//       lastRequestTime: now - waitTime,
//     };

//     const timePassed = now - lastRequestTime;
//     const delay = Math.max(0, waitTime + previousDelay - timePassed);

//     throttleData[ip] = {
//       previousDelay: delay,
//       lastRequestTime: now,
//     };

//     setTimeout(next, delay);
//   };
// };

app.use(globalLimiter, throttle);

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
