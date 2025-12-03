import express from "express";
import { writeFile } from "fs/promises";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51SV4qOLKpJbunV8x2zmeM1sDIB2Ll7GGkrdOanCHMJDB3ZAz0AU0y506A4JuoItVAaSDtHJRNViFRnke5CAC6pFG00GyyB0TCK"
);

const app = express();

app.use(express.json());

app.post("/webhook", async (req, res) => {
  console.log(req.body);
  await writeFile("webhook-data.json", JSON.stringify(req.body, null, 2));
  return res.status(200).end();
});

app.listen("4000", () => {
  console.log("http://localhost:4000");
});
