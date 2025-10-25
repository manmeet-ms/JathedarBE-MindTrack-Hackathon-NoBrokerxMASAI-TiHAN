import express from "express";

import { getAnalytics, leaderboardUsers } from "../controllers/analytics.controller.js";

const router = express.Router();

// router.get("/analytics/summary",getAnalytics);
router.get("/summary", getAnalytics);

router.get("/leaderboard",  leaderboardUsers);

export default router;
