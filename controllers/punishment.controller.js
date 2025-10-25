import Timeblock from "../models/Timeblock.model.js";
import Violation from "../models/Violation.model.js";
import logger from "../utils/logger.utils.js";
import { getTodayViolations, getViolations } from "./violation.controller.js";

export const evaluatePunishments = async (req, res) => {
  try {
    const now = new Date();

    const uncompletedStrictBlocks = await Timeblock.find({
      date: { $eq: now.toISOString().slice(0, 10) },
      completed: false,
      strict: true,
      endTime: { $lt: now.toTimeString().slice(0, 5) }
    });

    const violationsToday = await Violation.find({
      timestamp: { $gte: new Date().setHours(0, 0, 0, 0) }
    });

    if (uncompletedStrictBlocks.length > 0 || violationsToday.length > 0) {
      // Example action: send punishment signal to frontend via service worker or DB
      logger("log","🚨 Punishment Triggered!");
    }

    return res.status(200).json({
      uncompletedStrict: uncompletedStrictBlocks.length,
      violations: violationsToday.length,
      punishmentTriggered:
        uncompletedStrictBlocks.length > 0 || violationsToday.length > 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to evaluate punishments" });
  }
};



export const checkMissedTimeblocks = async () => {
  // logger("info", "checkMissedTimeblocks i Am being called ")
  const now = dayjs();
  const today = now.format("YYYY-MM-DD");
  const currentTime = now.format("HH:mm");
  logger("info", "today", today);

  // ✅ Get all users
  const users = await User.find();
  // logger("info", "users.length", users.length);

  for (const user of users) {
 
    const missedBlocks = await TimeBlock.find({
      uid: user._id,
      date: today,
      completed: false,
      strict: true,
      endTime: { $lt: currentTime },
    });

    logger("log", `User ${user._id} missedBlocks:`, missedBlocks.length);
    for (const block of missedBlocks) {
      const alreadyViolated = await Violation.exists({ timeBlock: block._id });
      if (alreadyViolated) continue;
 
      await createViolationMessageService(user._id, "missed_block", block);
      applyPointsSrv("BLOCK_MISS_PENALTY");
      logger("log", user._id, user.name);

      logger("log", `⛔ Auto violation logged for user:${user._id} block:${block.task}`);
    }
  }
};
export const triggerPunishment = (violation) => {
  // Play alarm
  playAlarm();

  // Show fullscreen modal
  const event = new CustomEvent("PUNISHMENT_TRIGGER", { detail: violation });
  window.dispatchEvent(event);
};

export const checkForPunishments = async () => {
  const res = await getTodayViolations();
  const unresolved = res.data.filter((v) => !v.resolved);
logger("log",res)
  if (unresolved.length > 0) {
    triggerPunishment(unresolved[0]);
  }
};



 


