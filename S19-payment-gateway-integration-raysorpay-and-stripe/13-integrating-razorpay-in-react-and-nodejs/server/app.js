import express from "express";
import data from "./courses.json" with { type: "json" };
import cors from "cors";
import Razorpay from 'razorpay';

const rzpIntance = new Razorpay({
  key_id: "rzp_test_RhoyP50kyYLgAi",
  key_secret: "ym0fSVYBcA1Kf5AD6y5SR48R"
})

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json())

app.get("/", (req, res) => {
  res.json(data);
});

app.post('/create/order', async (req, res) => {
  const { id } = req.body
  const { price } = data.find((d) => d.id === id)
  const order = await rzpIntance.orders.create({
    amount: price * 100,
    currency: "INR"
  })
  return res.json({
    orderId: order.id
  })
})

app.post('/complete/order', async (req, res) => {
  const { rzpOrderId } = req.body;
  const order = await rzpIntance.orders.fetch(rzpOrderId)
  if (!order) return res.json({
    error: "Invalid order attempt!"
  })
  if (order.status !== 'paid') return res.json({
    error: "Your payment is pending!"
  })
  return res.json({ success: true, message: "Your order is completed." })
})

app.listen(4000, () => {
  console.log("Server started");
});
