import mongoose from "mongoose";
import User from "./UserModel.js";

const user = await User.insertOne({
  name: "Prateek",
  age: 20,
  email: "prateek@gmail.com",
});

await user.save();

await mongoose.disconnect();
