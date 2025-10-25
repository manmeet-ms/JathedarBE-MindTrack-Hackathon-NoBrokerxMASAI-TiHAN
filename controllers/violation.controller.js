import logger from ".././utils/logger.utils.js";
import TimeBlock from "../models/Timeblock.model.js";
import User from "../models/User.model.js";
import Violation from "../models/Violation.model.js";
import { getRandomTaunt } from "../utils/taunts.utils.js";


export const logViolation = async (req, res) => {
  try {
    const { type, timeBlockId } = req.body;
    const userId = req.user?.id; // Prefer authenticated user from session/token

    // Optional: allow override only in dev or if admin (not recommended in prod)
    // const targetUserId = userId || req.body.userId;

    if (!userId) {
      return res.status(401).json({ error: "User must be authenticated" });
    }

    // Validate inputs
    if (!type || !timeBlockId) {
      return res.status(400).json({ error: "Missing 'type' or 'timeBlockId'" });
    }

    // Fetch related data
    const block = await TimeBlock.findById(timeBlockId);
    if (!block) {
      return res.status(404).json({ error: "TimeBlock not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate taunt & create violation
    const taunt = getRandomTaunt();
    const violation = await Violation.create({
      uid: userId,
      type,
      timeBlock: block._id,
      tauntStatement: taunt,
      timestamp: new Date(),
      blockData: block.toObject(), // safer than spread on Mongoose doc
    });

    // 🔔 Optional: Send to Discord (server-side only)
    if (process.env.VITE_DISCORD_WEBHOOK_URL) {
      const message = `⚠ ${user.name} failed "${block.task}" scheduled at ${block.startTime} – ${block.endTime}\nViolation type: \`${violation.type}\``;

      try {
        await axios.post(process.env.VITE_DISCORD_WEBHOOK_URL, { content: message });
        logger("log", `Discord notification sent for violation ${violation._id}`);
      } catch (discordErr) {
        logger("warn", `Failed to send Discord webhook: ${discordErr.message}`);
       }
    }

    logger("log", `⛔ Violation logged for user ${user.name}, block: ${block.task}`);

    return res.status(201).json(violation);
  } catch (err) {
    logger("error", `logViolation failed: ${err.message}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getViolations = async (req, res) => {
  try {
    const violations = await Violation.find().sort({ timestamp: -1 });
    res.json(violations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getTodayViolations = async (req, res) => {
  try {
    const violations = await Violation.find().sort({ timestamp: -1 });
    res.json(violations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const resolveViolation = async (req, res) => {
  try {
    const violation = await Violation.findByIdAndDelete(req.params.id);
    // const violation = await Violation.findByIdAndUpdate(req.params.id, { resolved: true }, { new: true });
    res.json(violation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const flushViolations = async (req, res) => {
  try {
    await Violation.deleteMany({});
    logger("log", "Flushed all violations");

    res.json({ message: true });

    return true;
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
