import mongoose from "mongoose";

await mongoose.connect("mongodb://admin:admin@localhost");
console.log("Database Connected");

const db = mongoose.connection.db; // we use this db like mongodb's db

mongoose.connection.on("events"); // we have events here to use for specific conditions
