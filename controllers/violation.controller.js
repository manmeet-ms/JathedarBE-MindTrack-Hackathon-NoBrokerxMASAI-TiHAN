import { createViolationMessageService } from "../../frontend/src/services/violation.service.js";
import logger from ".././utils/logger.utils.js";
import TimeBlock from "../models/Timeblock.model.js";
import Violation from "../models/Violation.model.js";

export const logViolation = async (req, res) => {
  try {
    const { type, timeBlockId } = req.body;

    const block = await TimeBlock.findById(timeBlockId);
    if (!block) {
      return res.status(404).json({ error: "TimeBlock not found" });
    }

    const violation = await createViolationMessageService(req.user.id, type,block );
    console.log(req.user.id);

    logger("log", `violation.controller :: mannual ⛔ Violation logged for block: ${block.task}`);
    // await sendViolationToDiscord(message);
    res.status(201).json(violation);
  } catch (err) {
    console.log(req.user.id);
    logger("error", err.message);
    res.status(500).json({ error: err.message });
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
