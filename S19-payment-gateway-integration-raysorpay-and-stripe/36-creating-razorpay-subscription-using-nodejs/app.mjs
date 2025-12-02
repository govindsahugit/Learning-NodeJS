import Razorpay from "razorpay";

const rzpInstance = new Razorpay({
  key_id: "rzp_test_RhoyP50kyYLgAi",
  key_secret: "secret",
});

const subscription = await rzpInstance.subscriptions.create({
  plan_id: "plan_RmkwP5ladGgyxh",
  total_count: 120
})

console.log(subscription);
