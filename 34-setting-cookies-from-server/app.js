import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  // res.set({
  //   "Access-Control-Allow-Credentials": true,
  //   "Set-Cookie": [
  //     "name=govind;SameSite=None;secure",
  //     "email=govind@mail.com;SameSite=None;secure",
  //   ],
  // });
  // res.cookie("name", "govind", {
  //   sameSite: "none",
  //   secure: true,
  // });
  // res.cookie("email", "govind@mail.com", {
  //   sameSite: "none",
  //   secure: true,
  // });
  console.log(req.cookies);
  res.json({
    message: "Hello world!",
  });
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
