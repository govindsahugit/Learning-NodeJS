import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const clientId =
  "1080347041084-ql6qrkks5ucvunc56fu3qgkkbogniuic.apps.googleusercontent.com";
const clientSecret = "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";
const redirectUri = "http://localhost:4000/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: clientId,
      clientSecret,
      callbackURL: redirectUri,
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);
