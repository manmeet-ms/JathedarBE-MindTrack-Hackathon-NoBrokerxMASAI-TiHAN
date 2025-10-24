import { timetableBlocksTemplate } from "../../frontend/shared/timetableBlocksTemplate.js"; // TODO: change this immediately introduce empty states
import TimeBlock from "../models/Timeblock.model.js";
import dayjs from "dayjs";

export const initTimeblocks = async (req, res) => {
try {
    const today = dayjs().format("YYYY-MM-DD");

  const existing = await TimeBlock.exists({ date: today });
  if (existing) {
    // logger("log",
    //   "timeblock.controller.js :: initTimeblocks() \nTimeTableblock exists"
    // );

    return res.status(200).json({ message: "Already initialized" });
  }

  const blocksToInsert = timetableBlocksTemplate.map((block) => ({
    ...block,
    date: today,
    uid:req.user.id
  }));

  await TimeBlock.insertMany(blocksToInsert);
  res
    .status(201)
    .json({ message: "Timeblocks initialized", blocks: blocksToInsert });
} catch (error) {
  console.log(error);
  
}
};

export const createTimeBlock = async (req, res) => {
  try {
    const block = await TimeBlock.create(req.body);
    res.json(block);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTodayBlocks = async (req, res) => {
  try {
    const today = dayjs().format("YYYY-MM-DD");
    const blocks = await TimeBlock.find({ date: today }).sort({ startTime: 1 });
    // logger("log","Total Timeblocks: ", blocks.length);
    // logger("log",blocks);

    res.json(blocks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const completeBlock = async (req, res) => {
  try {
    const block = await TimeBlock.findByIdAndUpdate(
      req.params.id,
      { completed: true },
      { new: true }
    );
    res.json(block);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const flushBlocks = async (req, res) => {
  try {
    await TimeBlock.deleteMany({});
    logger("log","Flushed timeblocks");
    res.status(200).json({ message: "Timeblocks flushed" });
    return true;
  } catch (err) {
    res.status(500).json({ error: err.message + "Failed to flush timeblocks" });
  }
};
