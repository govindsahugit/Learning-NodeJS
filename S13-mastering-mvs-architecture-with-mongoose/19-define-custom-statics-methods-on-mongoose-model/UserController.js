import mongoose from "mongoose";
import User from "./UserModel.js";

const user = await User.findByName("Govind");

console.log(user);

await mongoose.disconnect();
