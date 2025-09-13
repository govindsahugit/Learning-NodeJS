# Hashing Passwords

## Never save passwords directly

If someone hacks your database, they'll see all user passwords.

## Hashing turns passwords into scrambled values

Like turning `hello123` into `a94a8fe5ccb19ba61c4c0873d391e987`.

## But there's a problem:

If a user chooses a weak password (like `123456`), hackers can guess it using rainbow tables (huge list of pre-hashed common passwords).
