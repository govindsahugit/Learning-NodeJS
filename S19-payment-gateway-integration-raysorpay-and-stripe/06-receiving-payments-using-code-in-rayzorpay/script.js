const button = document.querySelector("button");

button.addEventListener("click", () => {
  const rzp = new Razorpay({
    key: "rzp_test_RhoyP50kyYLgAi",
    amount: 100 * 500,
    theme: {
      color: "#222",
    },
    handler: (res) => {
      console.log(res);
    },
  });
  rzp.open();
});
