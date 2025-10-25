/**
 *
 * reset p1 priority
 * create p2
 * update
 * delete
 */
// import { set } from "mongoose";/
import logger from "../utils/logger.utils.js";
import Chronos from "../models/Chronos.model.js";

export const getChronos = async (req, res) => {
  try {
    const result = await Chronos.find().sort({ _createdAt: -1 });
    // logger("log","gettimers controller result", result);
    res.json(result);
  } catch (error) {
    console.error("error at Chronos.controller :: getChronos()", error.message);
    res.json(error.message);
  }
};
export const resetChronos = async (req, res) => {
  try {
    const result = await Chronos.updateOne(
      { _id: req.params.id },
      {
        $inc: { failures: 1 },
        $set: { timerStarted: new Date() },
      }
    );
    const block = await Chronos.findById(req.params.id);

    logger("log", { message: "RESET Timer OK", result: result, affectedBlock: block });
    res.json({ message: "RESET Timer OK", result: result, affectedBlock: block });
  } catch (error) {
    res.json(error.message);

    logger("error", "error at timers.controller :: resetTimer()", error.message);
  }
};
export const createChronos = async (req, res) => {
  try {
    // logger("log",req.body );
    // logger("log", req.user.id, req.body);
const timeExists = await Chronos.exists({codename:req.body.codename, title:req.body.title})
if (timeExists){
    return res.status(200).json({ message: "Already initialized" });

}
    const result = await Chronos.create(req.body);
    res.json({ message: "createTimer OK", result: result });
  } catch (error) {
    res.json(error.message);

    logger("error", "error at timers.controller :: createTimer()", error.message);
  }
};
export const updateChronos = async (req, res) => {
  try {
    res.json({ message: "/api/timers/updateTimer" });
  } catch (error) {
    res.json(error.message);

    logger("error", "error at timers.controller :: updateTimer()", error.message);
  }
};
export const deleteChronos = async (req, res) => {
  try {
    res.json({ message: "/api/timers/deleteTimer" });
  } catch (error) {
    res.json(error.message);

    logger("error", "error at timers.controller :: deleteTimer()", error.message);
  }
};
