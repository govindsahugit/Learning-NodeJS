import crypto from "node:crypto";

const salt = crypto.randomBytes(16);

crypto.pbkdf2("password", salt, 100000, 32, "sha256", (err, output) => {
  console.log(output.toString("base64url"));
  console.log(salt.toString("base64url"));
});
