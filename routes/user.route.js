import express from "express";

import { createHourlyCheckin, getDiscordUserProfile, getHourlyCheckins, getUser, updateUserProfile } from "../controllers/user.controller.js";
 
const router = express.Router();
// raw db routes

router.put("/update", updateUserProfile);
 
 
router.get("/hourly-checkins", getHourlyCheckins); // fetch all (with filters like ?date=2025-08-22)
router.post("/hourly-checkins/create", createHourlyCheckin); // create new entry
// router.get("/hourly-checkins/:id", getHourlyCheckinById); // fetch single checkin
// router.delete("/hourly-checkins/:id", deleteHourlyCheckin); // optional

router.get(
  "/:userId",
  getUser
);
router.get("/discord/profile/:userId", getDiscordUserProfile);


export default router;

