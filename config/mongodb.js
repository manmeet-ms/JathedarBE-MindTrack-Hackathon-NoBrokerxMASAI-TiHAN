import mongoose from "mongoose";
import "dotenv/config";
import logger from ".././utils/logger.utils.js";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger("success","MongoDB Connected:",process.env.MONGO_URI);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
