import Razorpay from "razorpay";

const rzpIntance = new Razorpay({
  key_id: "rzp_live_RiFW5YyAweIEOw",
  key_secret: "6br54mVBJ6wsygQAeybv1Jfr",
});

// const data = await rzpIntance.payments.all({ count: 12 });
// console.log(data);

const data = await rzpIntance.payments.fetch("pay_RiiD8yBNFVpfqw");
console.log(data);
