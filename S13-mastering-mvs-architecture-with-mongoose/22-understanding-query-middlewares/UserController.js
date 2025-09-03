import mongoose from "mongoose";
import User from "./UserModel.js";

const user1 = await User.find({
  name: "Prateek",
});
const user2 = await User.findOne({
  name: "Prateek",
});

await mongoose.disconnect();
