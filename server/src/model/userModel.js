import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    access_code: String,
    admin: { type: Boolean, default: false },
  },
  { collection: "user" }
);

const userModel = mongoose.model("User", userSchema)

export { userModel }