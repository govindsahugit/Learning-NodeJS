const button = document.querySelector("button");
const baseURL = "http://localhost:4000";

const clientId =
  "1080347041084-lisqfqps6nrum77mi2g2l0qnq725savq.apps.googleusercontent.com";
// const redirectUrl = "http://localhost:5500/client/callback.html";
const redirectUrl = "http://localhost:4000/auth/google/callback";
const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&scope=openid email profile&redirect_uri=${redirectUrl}`;

button.addEventListener("click", () => {
  window.open(authUrl, "auth-popup", "width=500,height=600");
});

const response = await fetch(`${baseURL}/profile`, {
  credentials: "include",
});

if (response.status === 200) {
  location.href = "/client/index.html";
}
