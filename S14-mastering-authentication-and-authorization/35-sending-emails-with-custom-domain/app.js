// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: "smtp.resend.com",
//   auth: {
//     user: "resend",
//     pass: "password",
//   },
// });

// const info = await transporter.sendMail({
//   from: "Govind Sahu <govind@parumalbsp.domain>",
//   to: "sahuji.0812@gmail.com",
//   subject: "Nodej Email Server",
//   html: "<b>This Email has sent by using NodeJS?</b>",
// });

// console.log("Message sent:", info.messageId);

import { Resend } from "resend";

const resend = new Resend("re_7fDB5hbt_2hJk3pJUt1sjYsJKWaDZBnRN");

const result = await resend.emails.send({
  from: "Govind Sahu <govind@parumalbsp.online>",
  to: ["thisisgovindsahu@gmail.com"],
  subject: "Email Sender Server",
  html: "<p>it works!</p>",
});

console.log(result);
