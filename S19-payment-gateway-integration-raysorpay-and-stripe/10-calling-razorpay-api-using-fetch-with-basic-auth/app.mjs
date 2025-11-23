// Store API Keys inside the .env file
const RZP_API_KEY_ID = "rzp_test_RAcX07ZtvKfiXn";
const RZP_API_KEY_SECRET = "cOdYL8xbC6N3v8Xv3Zx5LxtY";

// Always Avoid to directly embed the sensitive Info inside the file
// generating auth token using Base64
const RZP_AUTH_TOKEN = btoa(`${RZP_API_KEY_ID}:${RZP_API_KEY_SECRET}`);
console.log(RZP_AUTH_TOKEN);

const response = await fetch("https://api.razorpay.com/v1/payments?count=1", {
  headers: {
    Authorization: `Basic ${RZP_AUTH_TOKEN}`,
  },
});
