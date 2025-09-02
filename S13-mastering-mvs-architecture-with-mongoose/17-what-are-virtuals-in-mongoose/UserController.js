import mongoose from "mongoose";
import User from "./UserModel.js";

const newHobbies = ["cricket", "chess", "playing"];

// await User.updateOne(
//   { email: "govind@gmail.com" },
//   { $set: { hobbies: newHobbies } }
// );

const user = await User.findOne({ email: "govind@gmail.com" });

console.log(user.hobbiesString);

user.hobbiesString = "Hello, World!";

await user.save();

console.log(user.hobbiesString);

await mongoose.disconnect();
