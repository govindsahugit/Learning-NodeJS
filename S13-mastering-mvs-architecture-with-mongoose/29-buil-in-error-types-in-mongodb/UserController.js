import mongoose from "mongoose";
import User from "./UserModel.js";

console.log(mongoose.mongo.MongoServerError);

// mongoose.connections

// console.log(mongoose.Error);

await mongoose.disconnect();
