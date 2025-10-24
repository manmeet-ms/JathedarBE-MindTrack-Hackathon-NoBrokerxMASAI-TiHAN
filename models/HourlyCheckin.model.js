import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
  moodType: { type: String, enum: ["Happy", "Anxious", "Angry", "Stressed", "Sad", "Neutral", "Excited"], required: true },
  intensity: { type: Number, min: 1, max: 10, required: true, default: 1 },
  notes: { type: String, maxLength: 300 },
  tags: [{ type: String }], // array instead of single string
  trigger: { type: String },
  location: { type: String },
  physicalState: { type: String },
}, { _id: false });

const hourlyCheckinTimelineSchema = new mongoose.Schema(
  {
    uid: { type: mongoose.Schema.Types.ObjectId, required: true }, // current user id, in browser cookie
    note: { type: String, required: true, default: "def: No Activity Shared" , maxLength:400},
    tag: { type: String, default:"def: No activity"},
    entryDate: { type: String},
    context: { type: String },
  mood: moodSchema,
   },
  { timestamps: true }
);
export default mongoose.model("HourlyCheckin", hourlyCheckinTimelineSchema);
