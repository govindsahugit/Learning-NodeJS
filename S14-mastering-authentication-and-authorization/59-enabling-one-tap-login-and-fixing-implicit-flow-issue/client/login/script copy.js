const button = document.querySelector("button");
const baseURL = "http://localhost:4000";
  
const clientId =
  "1080347041084-ql6qrkks5ucvunc56fu3qgkkbogniuic.apps.googleusercontent.com";
const redirectUri = "http://localhost:5500/client/callback.html";
const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=id_token&client_id=${clientId}&scope=openid email profile&redirect_uri=${redirectUri}&nonce=123hii`;

button.addEventListener("click", () => {
  window.open(authUrl, "auth-popup", "width=500,height=600");
});

window.addEventListener("message", ({ data }) => {
  console.log(data);
  if (data.message === "success") location.href = "/client/index.html";
  else {
    const p = document.createElement("p");
    p.innerText = "Something went wrong!";
    document.body.appendChild(p);
    setTimeout(() => {
      p.remove();
    }, 2000);
  }
});
