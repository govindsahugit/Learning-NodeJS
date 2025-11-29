const res = await fetch(
  "https://api.stripe.com/v1/charges?payment_intent=pi_3SYlSvLKpJbunV8x1Dhm78h4",
  {
    headers: {
      Authorization: "Bearer secret-key",
    },
  }
);

const data = await res.json();

console.log(data);
