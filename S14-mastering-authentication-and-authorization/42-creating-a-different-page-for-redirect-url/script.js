const button = document.querySelector("button");

const clientId =
  "1080347041084-lisqfqps6nrum77mi2g2l0qnq725savq.apps.googleusercontent.com";

const clientSecret = "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";

const redirectUrl = "http://localhost:5500/callback.html";

window.addEventListener("message", ({ data }) => {
  fetchAccessToken(data.code);
});

button.addEventListener("click", () => {
  window.open(
    `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&scope=openid email profile&redirect_uri=${redirectUrl}
 `,
    "auth-popup",
    "width=600, height=800"
  );
});

const fetchAccessToken = async (code) => {
  const payLoad = `code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUrl}&grant_type=authorization_code`;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payLoad,
  });
  const data = await res.json();

  if (data.error) {
    console.log(data);
    return;
  }

  const userToken = data.id_token.split(".")[1];
  const userData = JSON.parse(atob(userToken));
  console.log(data);
  console.log(userData);
};
