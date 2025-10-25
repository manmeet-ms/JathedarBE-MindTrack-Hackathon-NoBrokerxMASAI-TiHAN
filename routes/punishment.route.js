import express from "express";
import { checkForPunishments, checkMissedTimeblocks, evaluatePunishments, triggerPunishment } from "../controllers/punishment.controller.js";

const router = express.Router();

router.get("/evaluate-punishments",evaluatePunishments)
router.get("/check-missed-timeblocks",checkMissedTimeblocks)
router.get("/check-for-punishments",checkForPunishments)
router.get("/trigger-punishment",triggerPunishment)
 
export default router;
