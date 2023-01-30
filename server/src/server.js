import { connectDB } from "./config/db.js";
import express from "express";
// import { connectDB } from "config/db";

const app = express();

app.listen(3000, async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("Erreur pour se connecter à la base de donnée.", error);
  }
});
