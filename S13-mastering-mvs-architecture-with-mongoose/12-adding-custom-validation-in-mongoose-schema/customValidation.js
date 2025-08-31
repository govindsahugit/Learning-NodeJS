import User from "./UserModel.js";

const user = new User();

const d = await user.deleteOne();

console.log(d);

console.log(user);
