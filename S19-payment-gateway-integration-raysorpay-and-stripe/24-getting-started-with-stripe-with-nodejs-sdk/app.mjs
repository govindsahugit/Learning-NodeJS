import Stripe from "stripe";

const stripe = new Stripe(
  "secret-key"
);

// const checkoutSessions = await stripe.checkout.sessions.list();
// console.log(checkoutSessions);

// const { data } = await stripe.checkout.sessions.list();
// console.log(data);
// console.log(data.length);

// const checkoutSession = await stripe.checkout.sessions.retrieve(
//   "cs_test_b1esdRoMcBwD7PV5l4MvaRfHRUrYqVNkQu5IrDqiXfyhRQ7P7Uqq6lfacL"
// );
// console.log(checkoutSession);

const checkoutSession = await stripe.checkout.sessions.list({
  payment_intent: "pi_3SY5PVLKpJbunV8x1GBe8LOd",
});
console.log(checkoutSession);
