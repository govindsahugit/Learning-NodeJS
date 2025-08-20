export const checkParams = (req, res, next, params) => {
  if (!params.length === 24)
    return res.status(400).json({
      error: "Invalid Params ID!",
    });
  next();
};
