import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: "try.govindsahu@gmail.com",
    pass: "bohf kvui qnei emwq",
  },
});

const info = await transporter.sendMail({
  to: "sahuji.0812@gmail.com",
  subject: "Hello ✔",
  html: "<b>Hello from Govind?</b>",
});

console.log("Message sent:", info.messageId);
