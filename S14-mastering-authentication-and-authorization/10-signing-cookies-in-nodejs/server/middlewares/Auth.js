import { mySecretKey } from "../controllers/userController.js";
import User from "../models/userModel.js";
import crypto from "crypto";

export const CheckAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ error: "Not logged in!" });
  try {
    const [base64urlEncodedData, signature] = token.split(".");

    const data = Buffer.from(base64urlEncodedData, "base64url").toString();

    const varifiedSignature = crypto
      .createHash("sha256")
      .update(mySecretKey)
      .update(data)
      .update(mySecretKey)
      .digest("base64url");

    if (signature !== varifiedSignature) {
      res.clearCookie("token");
      return res.status(200).json({
        message: "Loged out!",
      });
    }

    const { id, expiry: expiryTimeInSecond } = JSON.parse(data);

    const currentTimeInSecond = Math.round(Date.now() / 1000);

    if (currentTimeInSecond > expiryTimeInSecond) {
      res.clearCookie("token");
      return res.status(200).json({
        message: "Loged out!",
      });
    }

    console.log(Math.round(Date.now() / 1000 + 10));

    const user = await User.findById(id.substr(0, 24));
    if (!user) return res.status(401).json({ error: "Not logged in!" });
    req.user = user;
  } catch (error) {
    next(error);
  }
  next();
};
