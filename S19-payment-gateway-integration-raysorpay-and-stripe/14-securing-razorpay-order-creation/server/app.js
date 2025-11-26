import express from "express";
import data from "./courses.json" with { type: "json" };
import cors from "cors";
import Razorpay from "razorpay";
import orders from "./orders.json" with { type: "json" };
import { writeFile } from "node:fs/promises";


const rzpInstance = new Razorpay({
  key_id: "rzp_test_RhoyP50kyYLgAi",
  key_secret: "ym0fSVYBcA1Kf5AD6y5SR48R",
});

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json(data);
});

app.post("/create-order", async (req, res) => {
  const { id } = req.body;

  const {name, price} = data.find((d) => d.id === id)

  const order = await rzpInstance.orders.create({
    amount: price * 100,
    currency: "INR",
    notes: {
      courseId: id,
      courseName: name,
    },
  });

  res.json({ orderId: order.id });
});

app.post("/complete-order", async (req, res) => {
  const { orderId, courseId, courseName, userName, userContact } = req.body;
  const order = await rzpInstance.orders.fetch(orderId);
  console.log(order);

  if (!order) {
    return res.status(404).json({ error: "Invalid order id" });
  }

  if (order.status === "paid") {
    orders.push({
      orderId,
      courseId,
      courseName,
      userName,
      userContact,
      orderStatus: "paid",
    });
    await writeFile("./orders.json", JSON.stringify(orders, null, 2));
    return res.json({ message: "Order Completed", status: "success" });
  }
  res.status(400).json({ error: "Order not completed", status: "failed" });
});

app.listen(4000, () => {
  console.log("Server started");
});
