import { model, Schema } from "mongoose";

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
    rootDirId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    strict: "throw",
    versionKey: false,
  }
);

const User = model("User", userSchema);

export default User;
