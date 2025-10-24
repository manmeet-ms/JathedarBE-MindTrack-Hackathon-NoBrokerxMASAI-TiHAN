import express from "express";
import {
  completeBlock,
  createTimeBlock,
  flushBlocks,
  getTodayBlocks,
  initTimeblocks,
} from "../controllers/timeblock.controller.js";

const router = express.Router();

router.post("/", createTimeBlock);
router.get(
  "/today",
  // cacheMiddleware("getTodayTimeblocks", 43200),
  getTodayBlocks
);
router.post("/:id/complete", completeBlock);
router.post("/init",initTimeblocks);
router.post("/flush", flushBlocks);

// TODO GET /streaks (Optional for later)
// → Return current streak and longest streak (e.g., using consecutive days with 0 violations)

export default router;
