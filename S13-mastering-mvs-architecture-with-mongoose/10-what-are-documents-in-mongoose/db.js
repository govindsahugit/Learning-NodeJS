import mongoose from "mongoose";

console.log("Connecting Database...");
await mongoose.connect("mongodb://admin:admin@localhost");
console.log("Database connected");
