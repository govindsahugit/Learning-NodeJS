import { OAuth2Client } from "google-auth-library";

const clientId =
  "1080347041084-ql6qrkks5ucvunc56fu3qgkkbogniuic.apps.googleusercontent.com";
const clientSecret = "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";
const redirectUri = "http://localhost:4000/auth/google/callback";

// Setting-up Google Client
const client = new OAuth2Client({
  clientId,
  clientSecret,
  redirectUri,
});

export const generateAuthUrl = () => {
  return client.generateAuthUrl({
    scope: ["email", "profile", "openid"],
    prompt: "consent",
    // login_hint: "govind@gmail.com"
  });
};

export async function fetchUserFromGoogle(code) {
  const { tokens } = await client.getToken(code);

  const loginTicket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: clientId,
  });

  const userData = loginTicket.getPayload();
  return userData;
}
