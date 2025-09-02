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
      validate: {
        validator() {
          return this.age % 2 === 0;
        },
        message: "age must be even number!",
      },
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: String,
    hobbies: [String],
    parentId: {
      required: function () {
        return this.age < 16;
      },
      type: Schema.Types.ObjectId,
      default: null,
      ref: "User",
    },
  },
  {
    strict: "throw",
    timestamps: true,
    virtuals: {
      isAdult: {
        get() {
          return this.age >= 18;
        },
      },
      hobbiesString: {
        get() {
          let string = "";
          this.hobbies.map((hobby) => (string += `${hobby}, `));
          return string;
        },
        set(value) {
          this.hobbies = [...this.hobbies, ...value.split(", ")];
        },
      },
    },
    methods: {
      sayHii() {
        return "Hii";
      },
    },
    statics: {
      findByName(name) {
        return this.find({ name });
      },
    },
  }
);

userSchema.pre("save", function () {
  console.log("running my document middleware!");
  this.password = `${this.name}${this.age}`;
  console.log(this);
});

userSchema.post("save", function (doc) {
  console.log(`Your account is created and your password is ${doc.password}`);
});

const User = mongoose.model("User", userSchema);

export default User;
