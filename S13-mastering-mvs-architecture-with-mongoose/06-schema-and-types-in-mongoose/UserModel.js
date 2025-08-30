import mongoose, { Schema } from "mongoose";

console.log("Executing UserModel.js");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required!"],
    },
    age: {
      type: Number,
      required: [true, "age is required!"],
      min: 12,
    },
    email: {
      type: String,
      required: true,
    },
    hobbies: [String],
    parentId: {
      required: function () {
        return this.age < 16;
      },
      type: Schema.Types.ObjectId,
      default: null,
    },
  },
  { strict: "throw", timestamps: true }
);
const User = mongoose.model("User", userSchema);

console.log("Inserting Data");
const findData = await User.insertOne({
  name: "Gitesh",
  age: 15,
  email: "gitesh@gmail.com",
  hobbies: ["Gambling", "Cricket"],
  parentId: "68b2f89d22bd32afec719a01"
});
console.log("Inserted Data");
console.log(findData);
