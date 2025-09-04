import mongoose from "mongoose";
import User from "./UserModel.js";

const user1 = await User.insertOne({
  name: "Prateek",
  age: 40,
  email: "prateek@gmail.com",
});

console.log(user1);

await mongoose.disconnect();
