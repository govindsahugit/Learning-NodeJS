import jwt from "jsonwebtoken";
import { createHmac } from "node:crypto";

// const token = jwt.sign({ name: "govind" }, "secret");
// console.log(token); // output=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ292aW5kIiwiaWF0IjoxNzU3OTAwNzc0fQ.4E-Wo9YOa-y6UYzUWvOKzy8sy3ndTUspz3xa3KRsY3M

// const token = jwt.sign({ name: "govind" }, "secret", {
//   expiresIn: 10,
// });
// console.log(token);

console.log(
  jwt.verify(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ292aW5kIiwiaWF0IjoxNzU3OTAxNjg2LCJleHAiOjE3NTc5MDE2OTZ9.Uw_Eyi0360_L2iq1Zv8eqf1sz6PmhXLX_foVaAnIkYY",
    "secret"
  )
);

// console.log(
//   createHmac("sha256", "secret")
//     .update(
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ292aW5kIiwiaWF0IjoxNzU3OTAwNzc0fQ"
//     )
//     .digest("base64url")
// );
