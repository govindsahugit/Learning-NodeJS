const user1 = await User.findOne({ email: "bhanu@gmail.com" });
console.log(user);
user.hobbies.pop();
const updatedUser = await user.save();
console.log(updatedUser);

const user2 = await User.findOneAndUpdate(
  { email: "gitesh@gmail.com" },
  { age: 5 },
  { new: true, runValidators: true }
);