import { ObjectId } from "mongodb";

export const CheckAuth = async (req, res, next) => {
  const { uid } = req.cookies;
  if (!uid) return res.status(401).json({ error: "Not logged in!" });
  const db = req.db;
  try {
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(String(uid)) });
    if (!user) return res.status(401).json({ error: "Not logged in!" });
    req.user = user;
  } catch (error) {
    next(error);
  }
  next();
};
