import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import logger from "../utils/logger.utils.js";
import Chronos from "../models/Chronos.model.js";
import mongoose from "mongoose";
import  "dotenv/config";
const MONGO_URI = process.env.MONGO_URI; // change to your db
async function seedChronos() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");
    const chronosArray = [];
    for (let i = 0; i <  6; i++) {
    // for (let i = 0; i < process.argv[2] || 6; i++) {
      const data = {
        uid: '68a93bc1f3476d8cf96e3a0c',
        codename: faker.lorem.words(3), // random single noun
        failures: faker.number.int({ min: 27, max: 100 }), // random number 50-100
        timerStarted: `Mon Oct ${faker.number.int({min:1,max:30})} 2025 18:30:41 GMT+0000 (Coordinated Universal Time)`, // random date string
        title: faker.lorem.words(4), // random 3-word lorem
        description: faker.lorem.sentences(6), // random lorem text
        perks: Array.from({ length: faker.number.int({ min: 6, max: 15 }) }, () =>
          ({ name: faker.word.noun(), description: faker.lorem.lines(2) })
        ),
        punishments: Array.from({ length: faker.number.int({ min: 4, max: 5 }) }, () =>
          ({ name: faker.word.noun(), description: faker.lorem.lines(2) })
        ),
        alternates: Array.from({ length: faker.number.int({ min: 1, max: 13 }) }, () =>
          ({ name: faker.word.noun(), description: faker.lorem.lines(2) })
        ),
        quoteFlashingAllowed: faker.datatype.boolean(),
        pulseTheme: "bg-green-500",
      };
      chronosArray.push(data)
    }
    await Chronos.insertMany(chronosArray)
    logger("log", "success");
    process.exit(0)
  } catch (err) {
    logger("log", err.message);
    process.exit(1);


  }
}




seedChronos()