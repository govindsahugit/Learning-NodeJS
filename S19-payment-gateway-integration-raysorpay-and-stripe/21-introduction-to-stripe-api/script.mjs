const res = await fetch("https://api.stripe.com/v1/balance", {
  headers: {
    Authorization:
      "Bearer secret-key",
  },
});

const data = await res.json();

console.log(data);
