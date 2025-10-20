import { OAuth2Client } from "google-auth-library";

const clientId =
  "1080347041084-ql6qrkks5ucvunc56fu3qgkkbogniuic.apps.googleusercontent.com";

const client = new OAuth2Client({
  clientId,
});

export const verifyToken = async (idToken) => {
  const loginTicket = await client.verifyIdToken({
    idToken,
    audience: clientId,
  });

  const userData = loginTicket.getPayload();
  return userData;
};
