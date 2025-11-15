import { getSignedUrl } from "@aws-sdk/cloudfront-signer";
import { readFile } from "fs/promises";

const url = `https://d1licuftds6f0j.cloudfront.net/images/Snapchat-1630619800.jpg`;
const privateKey = await readFile("./private_key.pem", "utf8");
const keyPairId = "KZGR7NVKXNK2D";
const dateLessThan = "2026-11-19"; // any Date constructor compatible

const signedUrl = getSignedUrl({
  url,
  keyPairId,
  dateLessThan,
  privateKey,
});

console.log(signedUrl);

// Commands to create private and public keys.
// Private Key: openssl genrsa -out private_key.pem 2048
// Public Key: openssl rsa -in private_key.pem -pubout -out public_key.pem
