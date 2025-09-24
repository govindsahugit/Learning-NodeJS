const clientId =
  "1080347041084-lisqfqps6nrum77mi2g2l0qnq725savq.apps.googleusercontent.com";
const clientSecret = "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";
// const redirectUrl = "http://localhost:5500/client/callback.html";
const redirectUrl = "http://localhost:4000/auth/google/callback";

export async function fetchUserFromGoogle(code) {
  console.log("Running fetchIdToken function...");
  const payload = `code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUrl}&grant_type=authorization_code`;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload,
  });

  const data = await response.json();
  if (data.error) {
    console.log("Error occurred");
    console.log(data);
    return;
  }

  const userToken = data.id_token.split(".")[1];
  const userData = JSON.parse(atob(userToken));
  return userData;
}
