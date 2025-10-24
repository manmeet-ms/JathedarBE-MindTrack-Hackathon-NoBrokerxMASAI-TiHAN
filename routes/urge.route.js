import express from "express";
import { getUrges, logUrge } from "../controllers/urge.controller.js";
import { cacheMiddleware } from "../middlewares/cache.middleware.js";

const router = express.Router();

// router.get("/get-urges", getUrges);
router.get("/",getUrges);
// router.get("/get-urges",cacheMiddleware("getUrges", 10*60), getUrges);
router.get("/get-urgesnocache", getUrges);
router.post("/log-urge", logUrge);

export default router;
