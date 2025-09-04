import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name field is required. Please enter the name."],
      minLength: [3, "Kripaya 3 letters ka naam type kariye"],
      trim: true,
      alias: "nam",
    },
    age: {
      type: Number,
      required: [true, "age field is required. Please enter the age."],
      min: 12,
      validate: {
        validator() {
          return this.age % 2 === 0;
        },
        message: "age can only be an even number.",
      },
    },
    email: {
      type: String,
      required: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email",
      ],
      lowercase: true,
      trim: true,
    },
    password: String,
    hobbies: [String],
    parentId: {
      type: Schema.Types.ObjectId,
      required: function () {
        return this.age < 16;
      },
      default: null,
      ref: "User",
    },
  },
  {
    strict: "throw",
    timestamps: true,
    // optimisticConcurrency: true,
    // versionKey: '__version',
    virtuals: {
      isAdult: {
        get() {
          return this.age >= 18;
        },
      },
      hobbiesString: {
        get() {
          return this.hobbies.join(", ");
        },
        set(value) {
          this.hobbies = [...this.hobbies, ...value.split(", ")];
        },
      },
    },
    methods: {
      getSummary(option) {
        if (option === "full") {
          return `${this.name} is ${this.age} years old and he has these hobbies: ${this.hobbies.join(", ")}.`;
        }
        return `${this.name} is ${this.age} years old.`;
      },
    },
    statics: {
      findByName(name) {
        return this.find({ name });
      },
      findOneByName(name) {
        return this.findOne({ name });
      },
      findByEmail(email) {
        return this.findOne({ email });
      },
    },
  }
);

userSchema.pre("insertMany", function (next, docs) {
  for (const doc of docs) {
    doc.password = doc.name + doc.age;
  }
  console.log("Running insertMany Middleware");
  next();
});

const User = model("User", userSchema);

export default User;
