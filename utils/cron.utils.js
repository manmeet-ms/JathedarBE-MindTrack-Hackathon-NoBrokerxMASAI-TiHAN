import dayjs from "dayjs";
import cron from "node-cron";

import PhilosopherQuoteSchema from "../models/PhilosopherQuote.model.js";
import { leaderboardUsersCronSrvSendDC } from "../../frontend/src/services/analytics.service.js";
import api from "../../ frontend/src/services/api.js";
import { checkMissedTimeblocks } from "../../frontend/src/services/punishment.service.js";
import { initTimeBlocksSrv } from "../../frontend/src/services/timeblock.service.js";
import logger from "./logger.utils.js";

  
// let grant100TimerPoints = "0 */24 * * *"; // In UTC TimeZone on Render
let lapotopOnCron = "*/35 0-17 * * *"; // In UTC TimeZone on Render
let workReminderCron = "*/50 1-18 * * * "; // In UTC TimeZone on Render
let philosophyQuotesCron = "0 1-18/1 * * *"; // In UTC TimeZone on Render
let whatAreYouDoingCron = "*/59 1-18 * * *"; // In UTC TimeZone on Render
let initTimeBlocksEvDay = "0 */24 * * *"; // In UTC TimeZone on Render
// let checkMissedTimeBLocksCron = "*/45 1-18 * * *"; // In UTC TimeZone on Render
let checkMissedTimeBLocksCron = "0 1-18/6 * * *"; // In UTC TimeZone on Render
let sendWeeklyLeaderboardDiscord = "0 0 * * 6"; // In UTC TimeZone on Render
let prolongedSittingReminder = "*/40 1-18 * * *"; // In UTC TimeZone on Render



 cron.schedule(
  lapotopOnCron,
  async () => {
    try {
    
      const payload = {
        title: `${dayjs().format("HH:mm")} Prolonged Sitting`,
        body: "Walk every 40m, reduce inactivity maintain healthy weight. #cysts haha ",
        vibrate: [200, 100, 200],
        icon: "/assets/pwa-icons/icons/icon-128x128.png",
        badge: "/assets/pwa-icons/icons/icon-48x48.png",

        // image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0eLihAg88tN1BUcMLgZGrrlgu--IhyFhHts-ptDD4dRyLwCyBMKVT-G9yp4HAF9-1IBM&usqp=CAU",
       
      };
      await api.post("/notifications/trigger", payload);

      const webHookUrl = process.env.VITE_DISCORD_WEBHOOK_URL;

      if (!webHookUrl) {
        console.warn("webHookUrl not set");
        return;
      }

      // try {
      //   await axios.post(webHookUrl, {
      //     content: `${payload.title} - ${payload.body}  `,
      //   }
      //   // ,{timezone: "India/Kolkata"}
      // );
      // } catch (err) {
      //   console.error("Failed to send Discord webhook:", err.message);
      // }
    } catch (error) {
      logger("error", "Error running cron job: ", error);
    }
  }
  // ,{timezone: "India/Kolkata"}
);


cron.schedule(
  sendWeeklyLeaderboardDiscord,
  async () => {
    try {
    leaderboardUsersCronSrvSendDC()
      console.log();
      
    } catch (error) {
      logger("error", "Error running Weekly leaderboard discord: ", error);
    }
  }
  // ,{timezone: "India/Kolkata"}
);

cron.schedule(
  initTimeBlocksEvDay,
  async () => {
    try {
      initTimeBlocksSrv();
    } catch (error) {
      logger("error", "Error running initTimeBlock: ", error);
    }
  }
  // ,{timezone: "India/Kolkata"}
);


// TODO: moved from server js to cron to recurr every 30minutes

// 45 mins given to compensate with late completion button as buffer to avoid unfair points vut
cron.schedule(
  checkMissedTimeBLocksCron,
  async () => {
    try {
      // console.log("checkMissedTimeBLocksCron");
      
      checkMissedTimeblocks();

      // logger("log", " applyPointsSrv inside");
    } catch (error) {
      logger("error", "Error running initTimeBlock: ", error);
    }
  }
  // ,{timezone: "India/Kolkata"}
); 

cron.schedule(
  lapotopOnCron,
  async () => {
    try {
      // logger(
      //   "log",
      //   "\nCheck your laptop :: Cron job executed at:",
      //   dayjs().format("DD-MM-YYYY HH:mm:ss a")
      // );
      const payload = {
        title: `${dayjs().format("HH:mm")} Check you laptop`,
        body: "If it is idle or charging from a long",
        vibrate: [200, 100, 200],
        icon: "/assets/pwa-icons/icons/icon-128x128.png",
        badge: "/assets/pwa-icons/icons/icon-48x48.png",

        // image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0eLihAg88tN1BUcMLgZGrrlgu--IhyFhHts-ptDD4dRyLwCyBMKVT-G9yp4HAF9-1IBM&usqp=CAU",
        actions: [
          {
            action: "laptop-working",
            type: "button",
            title: "Working",
          },
          {
            action: "laptop-idle",
            type: "button",
            title: "Idle",
          },

          {
            action: "laptop-charging",
            type: "button",
            title: "Charging",
          },
        ],
      };
      await api.post("/notifications/trigger", payload);

      const webHookUrl = process.env.VITE_DISCORD_WEBHOOK_URL;

      if (!webHookUrl) {
        console.warn("webHookUrl not set");
        return;
      }

      // try {
      //   await axios.post(webHookUrl, {
      //     content: `${payload.title} - ${payload.body}  `,
      //   }
      //   // ,{timezone: "India/Kolkata"}
      // );
      // } catch (err) {
      //   console.error("Failed to send Discord webhook:", err.message);
      // }
    } catch (error) {
      logger("error", "Error running cron job: ", error);
    }
  }
  // ,{timezone: "India/Kolkata"}
);

cron.schedule(
  workReminderCron,
  async () => {
    try {
      // logger(
      //   "log",
      //   "\nKaam krle kaam :: Cron job executed at:",
      //   dayjs().format("DD-MM-YYYY HH:mm:ss a")
      // );
      const payload = {
        title: `${dayjs().format("HH:mm")} Do NOT ROT yourself`,
        body: "Upcoming exams, -11k points, 200+ todoist tasks. Still think you&apos;ve got time",
        vibrate: [200, 100, 200],
        icon: "/assets/pwa-icons/icons/icon-128x128.png",
        badge: "/assets/pwa-icons/icons/icon-48x48.png",
        // image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0eLihAg88tN1BUcMLgZGrrlgu--IhyFhHts-ptDD4dRyLwCyBMKVT-G9yp4HAF9-1IBM&usqp=CAU",
        // actions: [
        //   {
        //     action: "working-yes",
        //     type: "button",
        //     title: "Ruining",
        //   },
        //   {
        //     action: "working-about-to-go",
        //     type: "button",
        //     // type: 'text',
        //     title: "Jaa rha hu",
        //   },
        // ],
      };
      await api.post("/notifications/trigger", payload);
    } catch (error) {
      logger("error", "Error running cron job: ", error);
    }
  }
  // ,{timezone: "India/Kolkata"}
);
cron.schedule(
  whatAreYouDoingCron,
  async () => {
    try {
      const payload = {
        title: `${dayjs().format("HH:mm")} What are you doing?`,
        body: "Log what you are doing",
        vibrate: [200, 100, 200],
        icon: "/assets/pwa-icons/icons/icon-128x128.png",
        badge: "/assets/pwa-icons/icons/icon-48x48.png",
        // image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0eLihAg88tN1BUcMLgZGrrlgu--IhyFhHts-ptDD4dRyLwCyBMKVT-G9yp4HAF9-1IBM&usqp=CAU",
        actions: [
          {
            action: "write-up",
            type: "text",
            title: "Write",
          },
        ],
      };
      await api.post("/notifications/trigger", payload);
    } catch (error) {
      logger("error", "Error running cron job: ", error);
    }
  }
  // ,{timezone: "India/Kolkata"}
);

logger("log", dayjs().format("YYYY-MM-DD"), "Cron jobs scheduled, waiting...");
setInterval(() => {}, 49000); // Keeps process running

cron.schedule(
  philosophyQuotesCron,
  async () => {
    try {
      const quoteNotif = await PhilosopherQuoteSchema.find();
      const randomPhilsopher = quoteNotif[Math.floor(Math.random() * quoteNotif.length)];
      const payload = {
        silent: true,
        title: randomPhilsopher.philosopher.name,
        body: randomPhilsopher.quotes[Math.floor(Math.random() * randomPhilsopher.quotes.length)],
        vibrate: [200, 100, 200],
        icon: randomPhilsopher.philosopher.iconUrl,
        badge: "/assets/pwa-icons/icons/icon-48x48.png",

        // image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0eLihAg88tN1BUcMLgZGrrlgu--IhyFhHts-ptDD4dRyLwCyBMKVT-G9yp4HAF9-1IBM&usqp=CAU",
      };
      await api.post("/notifications/trigger", payload);
    } catch (error) {
      logger("error", "Error running cron job: ", error);
    }
  }
  // ,{timezone: "India/Kolkata"}
);

/**
 
 # 
 # ┌──────────── minute
 # │ ┌────────── hour
 # │ │ ┌──────── day of month
 # │ │ │ ┌────── month
 # │ │ │ │ ┌──── day of week
 # │ │ │ │ │
 # │ │ │ │ │
 # * * * * *

 */
