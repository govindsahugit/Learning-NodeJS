// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: "smtp.resend.com",
//   auth: {
//     user: "resend",
//     pass: "password",
//   },
// });

// const info = await transporter.sendMail({
//   from: "Govind Sahu <sender email>",
//   to: "receiver email",
//   subject: "Nodej Email Server",
//   html: "<b>This Email has sent by using NodeJS?</b>",
// });

// console.log("Message sent:", info.messageId);

import { Resend } from "resend";

const resend = new Resend("password");

const result = await resend.emails.send({
  from: "Govind Sahu <sender emain>",
  to: ["reciver email"],
  subject: "Email Sender Server",
  html: "<p>it works!</p>",
});

console.log(result);
