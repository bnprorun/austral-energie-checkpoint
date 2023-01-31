import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { userModel } from "../model/userModel.js";
import { userData } from "./data.js";
dotenv.config();

const dbUrl = process.env.DATABASE_URL;

const connectDB = () => {
  console.log(dbUrl);
  console.log(process.env.MONGO_URL);
  return mongoose.connect(process.env.MONGO_URL, { dbName: "aecdb" }, (err) => {
    if (err) {
      console.error("Connection to DB failed");
    } else {
      console.log("Connection to DB was successful");
    }
  });
};

const db = mongoose.connection;
const ifCollectionExists = async  () => {

  const users = await userModel.find();
  if(users && users.length === 0){
    console.log("database initialisation ...")
    userData.map((user) => {
      const usr = userModel.create({
        name : user.name,
        email : user.email,
        password: bcrypt.hashSync(user.password),
        admin : user.admin,
        access_code: user.access_code
    })})
    console.log("User inserted !");
  }
};
db.on("error", console.error.bind(console, "MongoDB connection failed"));
export { connectDB, ifCollectionExists };
