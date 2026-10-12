import mongoose from "mongoose";
import { env } from "../env";

export async function dbConnect() {
  try {
    await mongoose.connect(env.MONGO_URI);
    mongoose.set("debug", true);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
}
