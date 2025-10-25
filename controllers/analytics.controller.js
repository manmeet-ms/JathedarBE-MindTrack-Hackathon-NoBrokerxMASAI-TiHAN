import dayjs from "dayjs";

import Ritual from "../models/Ritual.model.js";
import TimeBlock from "../models/Timeblock.model.js";
import User from "../models/User.model.js";
import Violation from "../models/Violation.model.js";

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
