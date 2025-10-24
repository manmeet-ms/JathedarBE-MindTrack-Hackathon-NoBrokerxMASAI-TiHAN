import express from "express";
import { evaluatePunishments } from "../controllers/punishment.controller.js";

const router = express.Router();

router.get("/trigger", evaluatePunishments);

export default router;
