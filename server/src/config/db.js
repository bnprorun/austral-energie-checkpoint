import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbUrl = process.env.DATABASE_URL;

const connectDB = () => {
    return mongoose.connect(dbUrl, { dbName : "aecdb"},
    (err) => {
      if (err) {
        console.error("Connection to DB failed");
      } else {
        console.log("Connection to DB was successful");
      }
    }
  );
}

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection failed"));

export { connectDB }

