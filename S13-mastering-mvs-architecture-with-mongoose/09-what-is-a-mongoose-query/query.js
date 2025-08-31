import User from "./UserModel.js";

const query = User.find();

query.select("name age");

console.log(query.projection());

console.log(await query);