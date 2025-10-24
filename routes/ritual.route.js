// Backend: defines the API route	Makes route available on server

import express from "express";
import {
  checkInRitual,
  flushRituals,
  getTodayRitual,
} from "../controllers/ritual.controller.js";

const router = express.Router();

router.post("/check-in", checkInRitual);
router.get("/today", getTodayRitual);
router.post("/flush", flushRituals);

export default router;
