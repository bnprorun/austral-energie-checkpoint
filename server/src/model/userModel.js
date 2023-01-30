import mongoose from "mongoose";

const checkpointSchema = mongoose.Schema({
  date: String,
  firstCheck: Date,
  lastCheck: Date,
  workTime: Number
})
const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    access_code: String,
    admin: { type: Boolean, default: false },
    checkpoints: [checkpointSchema]
  },
  { collection: "user" }
);

const userModel = mongoose.model("User", userSchema)

export { userModel }