import Timeblock from "../models/Timeblock.model.js";
import Violation from "../models/Violation.model.js";

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
