import mongoose from "mongoose";

await mongoose.connect("mongodb://admin:admin@localhost");

mongoose.set("autoCreate", false);

const UserModel = mongoose.model("User", { name: String, age: Number });

const insert = await UserModel.insertOne({ name: "Govind", age: 20 });
console.log(insert);

console.log("Database connected");
