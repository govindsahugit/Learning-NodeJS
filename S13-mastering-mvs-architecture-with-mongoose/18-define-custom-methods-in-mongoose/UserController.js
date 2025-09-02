import mongoose from "mongoose";
import User from "./UserModel.js";

const user = await User.findOne({ email: "govind@gmail.com" });

console.log(user.sayHii());

await mongoose.disconnect();
