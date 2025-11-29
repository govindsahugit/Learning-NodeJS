import Stripe from "stripe";

const stripe = new Stripe("secret-key");

const newCheckoutSession = await stripe.checkout.sessions.create({
  success_url: "https://stripe.com",
  line_items: [
    {
      price_data: {
        product_data: {
          name: "Coding Classes",
        },
        unit_amount: 100 * 100,
        currency: "USD",
      },
      quantity: 1,
      adjustable_quantity: {
        enabled: true,
      },
    },
  ],
  mode: "payment",
});
console.log(newCheckoutSession.url);
