const button = document.querySelector("button");

button.addEventListener("click", () => {
  const rzp = new Razorpay({
    key: "rzp_live_RiFW5YyAweIEOw",
    amount: 100 * 500,
    order_id: "order_Rjt7gZHeUsLGht",
    theme: {
      color: "#222",
    },
    handler: (res) => {
      console.log(res);
    },
  });
  rzp.open();
});
