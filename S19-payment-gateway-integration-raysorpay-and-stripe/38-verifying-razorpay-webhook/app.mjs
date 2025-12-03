import express from "express";
import crypto from "crypto";
import Razorpay from "razorpay";

const app = express();

app.use(express.json());

app.post("/webhook", (req, res) => {
  const secret = "anurag@321";
  const providedSignature = req.headers["x-razorpay-signature"];

  // const generatedSignature = crypto
  //   .createHmac("sha256", secret)
  //   .update(JSON.stringify(req.body))
  //   .digest("hex");

  // console.log(providedSignature);
  // console.log(generatedSignature);

  const isSignatureValid = Razorpay.validateWebhookSignature(
    JSON.stringify(req.body),
    providedSignature,
    secret
  );

  if (isSignatureValid) {
    console.log("Webhook verification passed!!");
    console.log(req.body);
    res.json({ message: "Got the data." });
  } else {
    console.log("Webhook verification failed!!");
    res.status(400).end();
  }
});

app.listen(4000, () => {
  console.log(`Server running on http://localhost:4000`);
});
