import axios from "axios";
import dayjs from "dayjs";

import HourlyCheckin from "../models/HourlyCheckin.model.js";
import User from "../models/User.model.js";
import logger from "../utils/logger.utils.js";

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
