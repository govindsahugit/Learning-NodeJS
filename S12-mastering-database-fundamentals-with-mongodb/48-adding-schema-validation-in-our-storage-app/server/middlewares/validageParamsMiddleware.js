import { ObjectId } from "mongodb";

export const checkParams = (req, res, next, params) => {
  if (!ObjectId.isValid(params))
    return res.status(400).json({
      error: "Invalid Params ID!",
    });
  next();
};
