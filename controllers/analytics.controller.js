import dayjs from "dayjs";

import Ritual from "../models/Ritual.model.js";
import TimeBlock from "../models/Timeblock.model.js";
import User from "../models/User.model.js";
import Violation from "../models/Violation.model.js";
import PointsTxn from "../models/PointsTxn.model.js";
import logger from "../utils/logger.utils.js";
import Urge from "../models/Urge.model.js";
 

 


export const getStreaks = async (req, res) => {
  try {
    // Fetch transactions sorted by time
    const entries = await PointsTxn.find({ type: "TIMER_RESET_PENALTY" })
      .select("_id uid user timerId createdAt") // ensure timerId exists in your model
      .sort("createdAt");

    // Group by timerId (unique timer)
    const grouped = entries.reduce((acc, entry) => {
      const timerId = entry.timerId?.toString() || "unknown_timer";
      if (!acc[timerId]) acc[timerId] = [];
      acc[timerId].push(entry);
      return acc;
    }, {});

    // Build chart-ready structure for each timer
    const chartData = Object.entries(grouped).map(([timerId, records]) => {
      // sort by timestamp
      records.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      const dataPoints = [];
      for (let i = 1; i < records.length; i++) {
        const prev = new Date(records[i - 1].createdAt);
        const curr = new Date(records[i].createdAt);

        // Calculate time difference in hours between consecutive resets
        const diffHrs = (curr - prev) / (1000 * 60 * 60);

        dataPoints.push({
          x: curr.getTime(),
          y: diffHrs,
        });
      }

      return {
        id: timerId,
        label: `Timer ${timerId.slice(-6)}`,
        user: records[0]?.user || "Unknown",
        data: dataPoints,
      };
    });

    // Sort timers by their first timestamp
    chartData.sort((a, b) => (a.data[0]?.x || 0) - (b.data[0]?.x || 0));

    res.json(chartData);
  } catch (err) {
    console.error("getStreaks error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCalendarActivity = async (req, res) => {
  try {
    const entries = await PointsTxn.find()
      .sort({ createdAt: -1 })
      .select("_id createdAt type");

    // Map database entries to calendar-compatible objects
    const eventMap = {
      TIMER_RESET_PENALTY: { title: "Timer Reset Penalty", color: "pink" },
      TIMEBLOCK_COMPLETE_CREDIT: { title: "Timeblock Completed", color: "green" },
      RITUAL_CREATED_CREDIT: { title: "Ritual Created", color: "purple" },
      URGE_LOGGED_CREDIT: { title: "Urge Logged", color: "blue" },
      VIOLATION_RESOLVED_CREDIT: { title: "Violation Resolved", color: "blue" },
      DIARY_WRITING_CREDIT: { title: "Diary Entry", color: "green" },
    };

    const events = entries.map((entry) => {
      const eventData = eventMap[entry.type] || { title: entry.type, color: "default" };

      return {
        id: entry._id.toString(),
        start: new Date(entry.createdAt),
        end: new Date(new Date(entry.createdAt).getTime() + 30 * 60 * 1000), // +30 min duration
        title: eventData.title,
        color: eventData.color,
      };
    });

    res.status(200).json(events);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


 
export const getMood = async (req, res) => {
  try {
    // Fetch all urge entries sorted chronologically
    const entries = await Urge.find()
      .select("_id urgeTimeStamp urgeIntensity urgeTrigger")
      .sort("urgeTimeStamp");

    // Transform entries into x-y pairs for charting
    const formatted = entries.map((entry) => ({
      id: entry._id.toString(),
      x: new Date(entry.urgeTimeStamp).getTime(), // timestamp for X-axis
      y: entry.urgeIntensity, // intensity for Y-axis
      tooltip: entry.urgeTrigger, // for hover details
    }));

    res.json(formatted);
  } catch (err) {
    console.error("getMood error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
export const leaderboardUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1 }).limit(20);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const leaderboardUsersCronSrvSendDC = async () => {
  const dcembedsuserlist = [""];
  let payload = {
    content: "",
    embeds: [
      {
        author: {
          name: "Jathedar",
          url: "https://jathedar.vercel.app/",
          // icon_url: "https://jathedar.vercel.app/logo.png",
        },
        title: "Weekly Leaderboard",
        // "url": "https://google.com/",
        description: "",
        color: 0xffd700,

        // thumbnail: {
        //     url: "https://jathedar.vercel.app/logo.png",
        //   },
        //   image: {
        //     url: "https://media1.tenor.com/m/hhaHukGx8UkAAAAd/nadda-jp-nadda.gif",
        //   },
        footer: {
          text: "Our top performers this week 🙌 ",
          // icon_url: "https://jathedar.vercel.app/logo.png",
        },
      },
    ],
  };
  const leaderboardUsers = await User.find().sort({ points: -1 }).limit(10);
  leaderboardUsers.map((item, idx) => {
    let medal = "";
    switch (idx) {
      case 0:
        medal = "🥇";
        break;

      case 1:
        medal = "🥈";
        break;

      case 2:
        medal = "🥉";

        break;

      default:
        medal = '⚡️';
        break;
    }

    dcembedsuserlist.push(`${medal} ${item.points} - **${item.name}**  `);
  });
  payload.embeds[0].description = dcembedsuserlist.toString().replaceAll(",", "\n- ") + "\n@everyone";

  // sendMessageInDiscordChannel("1412432577595183244", payload);
};
export const getAnalytics = async (req, res) => {
  const today = dayjs().format("YYYY-MM-DD");

  const [totalBlocks, completedBlocks, missedBlocks, recentViolations, ritualStatus] = await Promise.all([
    TimeBlock.countDocuments({ date: today }),
    TimeBlock.countDocuments({ date: today, completed: true }),
    TimeBlock.countDocuments({
      date: today,
      completed: false,
      endTime: { $lt: dayjs().format("HH:mm") },
    }),
    Violation.find({}).sort({ timestamp: -1 }).limit(5),
    Ritual.find({ date: today }),
  ]);

  res.json({
    totalBlocks,
    completedBlocks,
    missedBlocks,
    recentViolations,
    streak: 0, // You can build a streak tracker later
    ritualStatus,
  });
};

export const getStats = async (req, res) => {
  // → Returns counts of:
  // Completed blocks
  // Missed strict blocks
  // Total blocks
  try {
    const completed_blocks = (await TimeBlock.find({ completed: true })).length;
    const missed_strict_blocks = (await TimeBlock.find({ strict: true, completed: false })).length;
    const total_blocks = (await TimeBlock.find({})).length;

    const respose = {
      total: total_blocks,
      strict: missed_strict_blocks,
      completed: completed_blocks,
    };

    res.json(respose);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
