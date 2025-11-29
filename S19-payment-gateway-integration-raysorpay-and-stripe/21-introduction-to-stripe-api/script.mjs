const res = await fetch("https://api.stripe.com/v1/balance", {
  headers: {
    Authorization:
      "Bearer sk_test_51SV4qOLKpJbunV8x2zmeM1sDIB2Ll7GGkrdOanCHMJDB3ZAz0AU0y506A4JuoItVAaSDtHJRNViFRnke5CAC6pFG00GyyB0TCK",
  },
});

const data = await res.json();

console.log(data);
