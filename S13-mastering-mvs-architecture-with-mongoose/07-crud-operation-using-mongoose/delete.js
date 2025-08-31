const user1 = await User.findOneAndDelete({ email: "gitesh@gmail.com" });

const user2 = await User.findByIdAndDelete("68b3b91d4f1be8489bcf148e");
