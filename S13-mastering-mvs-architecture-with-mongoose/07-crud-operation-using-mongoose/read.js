const user = await User.findOne({ email: "bhanu@gmail.com" }).lean();
console.log(user);