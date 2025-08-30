import mongoose from "mongoose";

console.log("Executing UserModel.js");

const UserModel = mongoose.model("User", { name: String, age: Number });

console.log("Fetching Data");
const findData = await UserModel.findOne({ name: "Prateek" });
console.log("Data fetched");
console.log(findData);
