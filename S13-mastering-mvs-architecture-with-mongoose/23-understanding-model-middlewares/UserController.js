import mongoose from "mongoose";
import User from "./UserModel.js";

const user1 = await User.insertMany([
  {
    name: "Prateek",
    age: 40,
    email: "p1@gmail.com",
  },
  {
    name: "Ankit",
    age: 30,
    email: "a1@gmail.com",
  },
]);

// console.log(user1);

await mongoose.disconnect();
