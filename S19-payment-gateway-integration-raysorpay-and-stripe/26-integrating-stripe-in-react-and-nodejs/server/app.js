import express from "express";
import courses from "./courses.json" with { type: "json" };
import cors from "cors";
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51SV4qOLKpJbunV8x2zmeM1sDIB2Ll7GGkrdOanCHMJDB3ZAz0AU0y506A4JuoItVAaSDtHJRNViFRnke5CAC6pFG00GyyB0TCK')

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json())

app.get("/", (req, res) => {
  res.json(courses);
});

app.post("/create/checkout-session", async (req, res) => {
  const { id } = req.body;
  const { price, name } = courses.find((course) => course.id === id)
  const newCheckOutSession = await stripe.checkout.sessions.create({
    success_url: 'http://localhost:5173?session_id={CHECKOUT_SESSION_ID}',
    line_items: [
      {
        price_data: {
          product_data: { name },
          unit_amount: 100 * price,
          currency: "USD"
        },
        quantity: 1,
        adjustable_quantity: {
          enabled: true,
        }
      }
    ],
    mode: 'payment'
  })
  return res.json({
    url: newCheckOutSession.url
  })
})

app.post('/verify-payment', async (req, res) => {
  const { sessionId } = req.body;
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  if (session.payment_status !== 'paid') return res.json({
    success: false,
    error: "payment is not paid or may pending!"
  })
  if (session.payment_status === 'paid') return res.json({
    success: true,
    message: "Your Payment is done. All Ok"
  })
})

app.listen(4000, () => {
  console.log("Server started");
});
