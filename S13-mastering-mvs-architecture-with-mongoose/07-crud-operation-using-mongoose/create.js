const findData1 = await User.insertOne({
  name: "Gitesh",
  age: 15,
  email: "gitesh@gmail.com",
  hobbies: ["Gambling", "Cricket"],
  parentId: "68b2f89d22bd32afec719a01",
});

const findData2 = await User.create({
  name: "Prateek",
  age: 15,
  email: "Prateek@gmail.com",
  hobbies: ["Gambling", "Cricket"],
  parentId: "68b2f89d22bd32afec719a01",
});

const findData3 = await User.create([
  {
    name: "Prateek",
    age: 18,
    email: "Prateek@gmail.com",
    hobbies: ["Learning"],
    parentId: "68b2f89d22bd32afec719a01",
  },
  {
    name: "Gulshan",
    age: 19,
    email: "Gulshan@gmail.com",
    hobbies: ["Playing"],
    parentId: "68b2f89d22bd32afec719a01",
  },
]);

const findData = new User({
  name: "Bhanu",
  age: 16,
  email: "bhanu@gmail.com",
  hobbies: ["Cricket"],
  parentId: "68b2f89d22bd32afec719a01",
});
findData.age = 14;
findData.hobbies.push("Playing");
const data = await findData.save();
