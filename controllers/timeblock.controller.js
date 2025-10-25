import TimeBlock from "../models/Timeblock.model.js";
import dayjs from "dayjs";
const timetableBlocksTemplate = [

  {
    task: 'Wake & Warm Up',
    description: 'Hydrate, stretch, prepare mentally for the day.',
    startTime: '06:00',
    endTime: '06:30',
    strict: true,
  },

  {
    task: 'Deep Work 1: Core Coding / Research',
    description: 'Focus block. Silence all distractions.',
    startTime: '06:30',
    endTime: '09:30',
    strict: true,
  },

  {
    task: 'Breakfast + Break',
    description: 'Eat light, walk, plan micro-goals.',
    startTime: '09:30',
    endTime: '10:00',
    strict: false,
  },

  {
    task: 'Deep Work 2: AI/ML Experiments',
    description: 'Train, debug, log outcomes, push commits.',
    startTime: '10:00',
    endTime: '12:30',
    strict: true,
  },

  {
    task: 'Lunch & Reset',
    description: 'Disconnect fully. Rest eyes and posture.',
    startTime: '12:30',
    endTime: '13:30',
    strict: false,
  },

  {
    task: 'Team Sync / Business Discussion',
    description: 'Strategy, pitch, documentation, task alignment.',
    startTime: '13:30',
    endTime: '15:00',
    strict: true,
  },

  {
    task: 'Deep Work 3: Development Continuation',
    description: 'Implement reviewed features or bug fixes.',
    startTime: '15:00',
    endTime: '17:30',
    strict: true,
  },

  {
    task: 'Evening Refresh',
    description: 'Go outside, stretch, reset mental fatigue.',
    startTime: '17:30',
    endTime: '18:00',
    strict: false,
  },

  {
    task: 'Learning / Skill Enhancement',
    description: 'Courses, documentation, or SSC prep if relevant.',
    startTime: '18:00',
    endTime: '20:00',
    strict: true,
  },

  {
    task: 'Dinner & Decompress',
    description: 'Eat, slow down. Reflect quietly.',
    startTime: '20:00',
    endTime: '21:00',
    strict: false,
  },

  {
    task: 'Review + Journal + Plan Tomorrow',
    description: 'Summarize what worked, adjust next-day goals.',
    startTime: '21:00',
    endTime: '22:00',
    strict: true,
  },

  {
    task: 'Sleep',
    description: 'Complete recovery cycle. No screens.',
    startTime: '22:00',
    endTime: '06:00',
    strict: true,
  },

];

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
