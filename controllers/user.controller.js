import axios from "axios";
import dayjs from "dayjs";
import fs from "fs";
import path from "path";

import { applyPointsSrv } from "../../frontend/src/services/points.service.js";
import logger from "../utils/logger.utils.js";
import HourlyCheckin from "../models/HourlyCheckin.model.js";
import PointsTxn from "../models/PointsTxn.model.js";
import User from "../models/User.model.js";

export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const userRes = await User.findById(userId);
    // logger("success", "User found", userRes.name);

    res.status(200).json(userRes);
  } catch (error) {
    res.send(error.message);
  }
};

export const logPoints = async (req, res) => {};
export const updateUserProfile = async (req, res) => {
  //   {
  //   "id": "64f123ab",
  //   "property": "username",
  //   "propertyValue": "newName"
  // }
  try {
    console.log(req.body);

    const currentUser = await User.findByIdAndUpdate(req.user.id, req.body);
    currentUser.save();
    console.log(currentUser.name, currentUser.points);

    res.send("ok");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
export const getDiscordUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    logger("log", userId);
    const profileData = await axios.get(`${process.env.VITE_DISCORD_API_ENDPOINT}/users/${userId}`, {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_JATHEDAR_BOT_TOKEN}`,
      },
    });
    res.status(200).json(profileData.data);
  } catch (error) {
    res.send(error.message);
    console.error(error.message);
  }
};

/**
 * POINTS TRANSACTIONS
 */

export const applyPoints = async (req, res) => {
  try {
    const points = await applyPointsSrv(req.user.id, req.body.event);

    res.status(200).json({ points });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const TestApplyPoints = async (req, res) => {
  const eventArray = ["TIMEBLOCK_COMPLETE_CREDIT", "ALL_DAILY_COMPLETE_CREDIT", "NEW_STREAK_CREDIT", "EXTEND_STREAK_CREDIT", "DIARY_WRITING_CREDIT", "RITUAL_COMPLETE_CREDIT", "URGE_LOGGED_CREDIT", "URGE_RESISTED_CREDIT", "MOOD_LOGGED_CREDIT", "MOOD_IMPROVEMENT_CREDIT", "RITUAL_MISS_PENALTY", "URGE_FAILURE_PENALTY", "BLOCK_MISS_PENALTY", "STREAK_BREAK_PENALTY", "VIOLATION_PENALTY", "TIMER_RESET_PENALTY", "PUNISHMENT_TRIGGER_PENALTY", "DEFAULT"];

  const eventPoints = {
    TIMEBLOCK_COMPLETE_CREDIT: 20,
    ALL_DAILY_COMPLETE_CREDIT: 100,
    NEW_STREAK_CREDIT: 50,
    VIOLATION_RESOLVED_CREDIT: 30,
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
    DEFAULT: 0,
  };
  console.log("user,currentPoints,eventKey,eventPoints,finalPoint");

  try {
    const { entryLimit } = req.params;
    const filePath = path.join(process.cwd(), `./backend/logs/${entryLimit}_points_test.csv`);
    const writeStream = fs.createWriteStream(filePath, { flags: "w" });

    // CSV header
    writeStream.write("User,CurrentPoints,EventKey,EventPoints,FinalPoints\n");

    for (let index = 0; index < entryLimit; index++) {
      // const {userId}=req.user.id
      // console.log(req.user.id);
      const eventKey = eventArray[Math.floor(Math.random() * eventArray.length)];

      const userRes = await User.findById(req.user.id);
      const currentPoints = userRes.points;
      const finalPoints = currentPoints + eventPoints[eventKey];
      const uupdatedUserPoints = await User.findByIdAndUpdate(userRes._id, {
        points: finalPoints,
      });
      uupdatedUserPoints.save();
      // console.log("user:", userRes.name, "currentPoints:", currentPoints, "| eventKey:", eventKey, "| eventPoints:", eventPoints[eventKey], "| finalPoint:", finalPoints);
      writeStream.write(`${userRes.name},${currentPoints},${eventKey},${eventPoints[eventKey]},${finalPoints}\n`);
      await PointsTxn.create({
        uid: userRes._id,
        type: eventKey,
        points: currentPoints,
        balanceAfter: finalPoints,
      });
    }
    writeStream.end(); // close file
    logger("info", "loop exit, CSV written");

    res.status(200).json("OK");
  } catch (err) {
    logger("error", err.message);
    res.status(400).json({ error: err.message });
  }
};

export const getPointsLedger = async (req, res) => {
  try {
    const entries = await PointsTxn.find().sort({ createdAt: -1 });
    const totalEntries = await PointsTxn.countDocuments();
    res.status(200).json({ totalEntries, entries });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


 
// ✅ Get all checkins for today
export const getHourlyCheckins = async (req, res) => {
  try {
    const today = dayjs().format("YYYY-MM-DD");
    const result = await HourlyCheckin.find({
      uid: req.user.id,
      entryDate: today,
    }).sort({ createdAt: -1 });

    res.status(200).json(result);
  } catch (error) {
    logger("error", error);
    res.status(500).json({ error: "Failed to fetch hourly check-ins" });
  }
};

// ✅ Create new checkin
export const createHourlyCheckin = async (req, res) => {
  try {
    const { note, tag, context, mood } = req.body;
console.log(req.body);

    const entry = await HourlyCheckin.create({
      uid: req.user.id,
      note: note ,
      tag: tag ,
      context: context  ,
      entryDate: dayjs().format("YYYY-MM-DD"),
      mood: mood  ,
    });

    res.status(201).json(entry);
  } catch (error) {
    logger("error", error);
    res.status(400).json({ error: "Failed to create hourly check-in" });
  }
};

// ✅ Update checkin
export const updateHourlyCheckin = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = await HourlyCheckin.findOneAndUpdate(
      { _id: id, uid: req.user.id },
      { $set: updates },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Check-in not found" });

    res.status(200).json(updated);
  } catch (error) {
    logger("error", error);
    res.status(400).json({ error: "Failed to update check-in" });
  }
};

// ✅ Delete checkin
export const deleteHourlyCheckin = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await HourlyCheckin.findOneAndDelete({ _id: id, uid: req.user.id });

    if (!deleted) return res.status(404).json({ error: "Check-in not found" });

    res.status(200).json({ message: "Check-in deleted" });
  } catch (error) {
    logger("error", error);
    res.status(400).json({ error: "Failed to delete check-in" });
  }
};



// export const getHourlyCheckins = async (req, res) => {
//   try {
//     const today = dayjs().format("YYYY-MM-DD");
    
    
//     const result = await HourlyCheckin.find({
//       uid: req.user.id,
//       entryDate: today},
//     ).sort({ createdAt: -1 });
// console.log(result);

//     res.status(200).json(result);
//   } catch (error) {
//     logger("error", error);
//     res.status(400).json(error);
//   }
// };

// // Create a new hourly checkin
// export const createHourlyCheckin = async (req, res) => {
//   try {
//     const { noteEntry, tag } = req.body;
//     logger("log", req.body,req.user.id, noteEntry,tag);

    
//     const entry = await HourlyCheckin.create({
//       uid: req.user.id,
//       note: noteEntry,
//       entryDate:dayjs().format("YYYY-MM-DD"),
//       tag: tag,
//     }); 
//     res.status(200).json(entry);
//   } catch (error) {
//     res.status(400).json({ error: error });
//   }
// };
