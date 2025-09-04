import mongoose from "mongoose";
import User from "./UserModel.js";

const user1 = await User.findOne({
  email: "prateek@gmail.com",
});

const user2 = await User.findOne({
  email: "prateek@gmail.com",
});

user1.amount += 500;
await user1.save();

user2.amount += 200;
await user2.save();

await mongoose.disconnect();
