import express from "express";

import { createHourlyCheckin, getDiscordUserProfile, getHourlyCheckins, getUser, updateUserProfile } from "../controllers/user.controller.js";
import User from "../models/User.model.js";

const router = express.Router();
// raw db routes

router.put("/update", updateUserProfile);
router.post("/flush", async (req, res) => {
  await User.deleteMany();
  console.log("all users deleted");
  res.send("all users deleted");
});
 
router.get("/hourly-checkins", getHourlyCheckins); // fetch all (with filters like ?date=2025-08-22)
router.post("/hourly-checkins/create", createHourlyCheckin); // create new entry
// router.get("/hourly-checkins/:id", getHourlyCheckinById); // fetch single checkin
// router.delete("/hourly-checkins/:id", deleteHourlyCheckin); // optional

router.get(
  "/:userId",
  // cacheMiddleware("userDetails", 4 * 24 * 60 * 60),
  getUser
);
router.get("/discord/profile/:userId", getDiscordUserProfile);


export default router;

