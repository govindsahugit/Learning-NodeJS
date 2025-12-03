import Stripe from "stripe";

const stripe = new Stripe(
  "stripe-secret"
);

const newCheckoutSession = await stripe.checkout.sessions.create({
  mode: "subscription",
  line_items: [
    {
      price: "price_1SFz9bQejmbJMlIqkiQJgda3",
      quantity: 1,
    },
  ],
  success_url: "https://procodrr.com/",
});

console.log(newCheckoutSession.url);
