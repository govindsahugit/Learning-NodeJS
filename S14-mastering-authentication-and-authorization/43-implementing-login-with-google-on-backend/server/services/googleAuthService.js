const clientId =
  "594555697613-18p3s2o6hl7mvc3gj0o2a2bg7b27tj9m.apps.googleusercontent.com";
const clientSecret = "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";
const redirectUrl = "http://localhost:5500/callback.html";

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
