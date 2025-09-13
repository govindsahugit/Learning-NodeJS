import User from "../models/userModel.js";

export const CheckAuth = async (req, res, next) => {
  const { token } = req.signedCookies;
  if (!token) return res.status(401).json({ error: "Not logged in!" });
  try {
    const { id, expiry: expiryTimeInSecond } = JSON.parse(token);

    const currentTimeInSecond = Math.round(Date.now() / 1000);

    if (currentTimeInSecond > expiryTimeInSecond) {
      res.clearCookie("token");
      return res.status(200).json({
        message: "Loged out!",
      });
    }

    const user = await User.findById(id.substr(0, 24));
    if (!user) return res.status(401).json({ error: "Not logged in!" });
    req.user = user;
  } catch (error) {
    next(error);
  }
  next();
};
