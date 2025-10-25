import { applyPoints, getPointsLedger, TestApplyPoints } from "../controllers/points.controller.js";
import express from 'express' 
const router = express.Router()

router.post("/apply", applyPoints);
router.get("/ledger", getPointsLedger);
router.post("/apply/test/:entryLimit", TestApplyPoints);

export default router