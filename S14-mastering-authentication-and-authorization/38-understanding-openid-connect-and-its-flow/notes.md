What is OpenID Connect?

-> OpenID Connect (OIDC) helps apps know who the user is — like their name, email, or profile picture.
-> It works on top of OAuth 2.0, which is used to get access to data.
OAuth 2.0 = What you can access
OIDC = Who you are

How It Works
-> You click "Login with Google" or another provider.
-> You're sent to a login page (Google, etc.).
-> You log in and give permission.
-> The app gets an ID token that says who you are.
-> The app reads this token to get your name, email, etc.

What’s in OpenID Connect
-> ID Token = A small package (JWT) with your info.
-> serInfo Endpoint = An API to get more details if needed.
-> copes = openid, profile, email, etc., tell what info the app can get.

Why It’s Useful
✅ Simple and safe login
✅ No password sharing
✅ Used by big names like Google, Microsoft
