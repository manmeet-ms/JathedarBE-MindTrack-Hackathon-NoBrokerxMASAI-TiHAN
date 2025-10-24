import mongoose from "mongoose";

const ritualSchema = new mongoose.Schema({
  uid: { type: mongoose.Schema.Types.ObjectId, required: true }, // current user id, in browser cookie
  date: { type: String, required: true }, // Format: 'YYYY-MM-DD'
  vow: { type: String, required: true },
  completedDailyCheckIn: { type: Boolean, default: false },
}, {timestamps:true});

export default mongoose.model("Ritual", ritualSchema);
/**
 * 
 * 
 * Use these parameters in your mood form model:

* user (ref to User)
* timestamp (Date)
* mood (String or Enum, e.g., "happy", "anxious", "angry", etc.)
* intensity (Number, e.g., 1–10)
* notes (optional String for comments)
* tags (optional \[String], e.g., \["stress", "work"])
* trigger (optional String, e.g., "argument", "deadline")
* location (optional String or geo data if relevant)
* physical\_state (optional String, e.g., "tired", "rested")

Minimum required: user, timestamp, mood.


 */
