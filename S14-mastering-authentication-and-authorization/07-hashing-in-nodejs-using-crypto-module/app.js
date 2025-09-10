import crypto from "crypto";

const hash = crypto.createHash("sha256").update("Hello World").digest("hex");

console.log(hash);
