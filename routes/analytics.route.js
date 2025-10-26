import express from "express";

import { getAnalytics, getCalendarActivity, getMood, getStreaks, leaderboardUsers } from "../controllers/analytics.controller.js";

const router = express.Router();

// router.get("/analytics/summary",getAnalytics);
router.get("/summary", getAnalytics);
router.get("/streaks", getStreaks);
router.get("/calendar-activity", getCalendarActivity);
router.get("/mood-tracker", getMood);

router.get("/leaderboard",  leaderboardUsers);

export default router;
