import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
    },
    picture: {
      type: String,
      default: null,
    },
    rootDirId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Admin", "Manager", "User"],
      default: "User",
    },
  },
  {
    strict: "throw",
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = model("User", userSchema);

export default User;
