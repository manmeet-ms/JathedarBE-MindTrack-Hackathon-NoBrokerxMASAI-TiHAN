/**
 *
 * reset p1 priority it is ultimately update request
 * create p2
 * update
 * delete
 */

import { Router } from "express";
import { createTimer, deleteTimer, getTimers, resetTimer, updateTimer } from "../controllers/timer.controller.js";
const router = Router();

router.get("/get", getTimers);
router.put("/reset/:id", resetTimer);
router.post("/create", createTimer);
router.put("/update/:id", updateTimer);
router.delete("/delete/:id", deleteTimer);
export default router;
 