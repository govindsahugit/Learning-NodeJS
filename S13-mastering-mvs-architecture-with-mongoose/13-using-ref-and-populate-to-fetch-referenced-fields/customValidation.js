import User from "./UserModel.js";

const user = await User.findById("68b43f01eb86fc07e2ac8e7a").populate({
  path: "parentId",
  select: "name age -_id",
});

console.log(user);
