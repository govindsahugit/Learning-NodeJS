import User from "../models/userModel.js";

export const CheckAuth = async (req, res, next) => {
  const { uid } = req.cookies;
  if (!uid) return res.status(401).json({ error: "Not logged in!" });
  try {
    const user = await User.findById(uid);
    if (!user) return res.status(401).json({ error: "Not logged in!" });
    req.user = user;
  } catch (error) {
    next(error);
  }
  next();
};
