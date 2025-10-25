import express from "express";
import { getUrges, logUrge } from "../controllers/urge.controller.js";

const router = express.Router();

// router.get("/get-urges", getUrges);
router.get("/",getUrges);
// router.get("/get-urges",  getUrges);
router.get("/get-urgesnocache", getUrges);
router.post("/log-urge", logUrge);

export default router;
