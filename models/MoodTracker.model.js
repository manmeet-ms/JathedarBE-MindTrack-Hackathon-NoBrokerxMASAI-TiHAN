import mongoose from "mongoose";

const moodTrackerSchema = new mongoose.Schema({
    uid: { type: mongoose.Schema.Types.ObjectId, required: true }, // current user id, in browser cookie

  // user: { type: String, required: true , default:"user_undisclosed"},
  moodType: { type: String, enum: ["happy", "anxious", "angry", "sad", "neutral", "excited"], required: true },
  intensity: { type: Number, min: 1, max: 10, required: true, default: 1 },
  notes: { type: String, maxLength: 300 },
  tags: [{ type: String }], // array instead of single string
  trigger: { type: String },
  location: { type: String },
  physicalState: { type: String },
},{timestamps:true}); 

export default mongoose.model("MoodTracker", moodTrackerSchema);
