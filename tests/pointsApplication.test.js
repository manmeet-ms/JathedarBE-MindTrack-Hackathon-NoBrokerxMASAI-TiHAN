// change to your db
import { faker } from "@faker-js/faker";
import "dotenv/config";
import mongoose from "mongoose";

import PointsTxn from "../models/PointsTxn.model.js";
import User from "../models/User.model.js";
import { applyPointsSrv } from "../../frontend/src/services/points.service.js";

const MONGO_URI = "mongodb://127.0.0.1:27017/test"; // change to your db

const eventArray = ["TIMEBLOCK_COMPLETE_CREDIT", "ALL_DAILY_COMPLETE_CREDIT", "NEW_STREAK_CREDIT", "EXTEND_STREAK_CREDIT", "DIARY_WRITING_CREDIT", "RITUAL_COMPLETE_CREDIT", "URGE_LOGGED_CREDIT", "URGE_RESISTED_CREDIT", "MOOD_LOGGED_CREDIT", "MOOD_IMPROVEMENT_CREDIT", "RITUAL_MISS_PENALTY", "URGE_FAILURE_PENALTY", "BLOCK_MISS_PENALTY", "STREAK_BREAK_PENALTY", "VIOLATION_PENALTY", "TIMER_RESET_PENALTY", "PUNISHMENT_TRIGGER_PENALTY"];

const userIds = ["68b1d51b657c3f684bb3cb11", "68b2c823b653c197fde32298", "68b2c823b653c197fde32299", "68b2c823b653c197fde3229a", "68b2c823b653c197fde3229b", "68b2c823b653c197fde3229c", "68b2c823b653c197fde3229d", "68b2c823b653c197fde3229e", "68b2c823b653c197fde3229f", "68b2c823b653c197fde322a0", "68b2c823b653c197fde322a1", "68b2c823b653c197fde322a2", "68b2c823b653c197fde322a3", "68b2c823b653c197fde322a4", "68b2c823b653c197fde322a5"];
const evertArray=[
"TIMEBLOCK_COMPLETE_CREDIT",
"ALL_DAILY_COMPLETE_CREDIT",
"NEW_STREAK_CREDIT",
"EXTEND_STREAK_CREDIT",
"DIARY_WRITING_CREDIT",
"RITUAL_COMPLETE_CREDIT",
"URGE_LOGGED_CREDIT",
"URGE_RESISTED_CREDIT",
"MOOD_LOGGED_CREDIT",
"MOOD_IMPROVEMENT_CREDIT",
"RITUAL_MISS_PENALTY",
"URGE_FAILURE_PENALTY",
"BLOCK_MISS_PENALTY",
"STREAK_BREAK_PENALTY",
"VIOLATION_PENALTY",
"TIMER_RESET_PENALTY",
"PUNISHMENT_TRIGGER_PENALTY"]
const eventPoints = {
  TIMEBLOCK_COMPLETE_CREDIT: 20,
  ALL_DAILY_COMPLETE_CREDIT: 100,
  NEW_STREAK_CREDIT: 50,
  EXTEND_STREAK_CREDIT: 10,
  DIARY_WRITING_CREDIT: 5,
  RITUAL_COMPLETE_CREDIT: 10,
  URGE_LOGGED_CREDIT: 10,
  URGE_RESISTED_CREDIT: 50,
  MOOD_LOGGED_CREDIT: 5,
  MOOD_IMPROVEMENT_CREDIT: 5,
  RITUAL_MISS_PENALTY: -10,
  URGE_FAILURE_PENALTY: -100,
  BLOCK_MISS_PENALTY: -40,
  STREAK_BREAK_PENALTY: -100,
  VIOLATION_PENALTY: -50,
  TIMER_RESET_PENALTY: -60,
  PUNISHMENT_TRIGGER_PENALTY: -15,
};

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");
for (let i = 0; i < 200; i++) {
    
    try {
      const randomEventKey = eventArray[Math.floor(Math.random() * 18)];
      const randomUser = userIds[Math.floor(Math.random() * 18)];
      await applyPointsSrv(randomUser, randomEventKey);
    } catch (error) {
      console.log(`#${i}`, error.message);
    }
    
}
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    process.exit(1);
  }
};
seedUsers();

/**
 *
 *
 * GO IN API CLIENT TO MAKE TXNS IN BULK
 */
