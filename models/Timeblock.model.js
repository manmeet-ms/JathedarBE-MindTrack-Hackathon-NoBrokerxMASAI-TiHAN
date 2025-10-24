import mongoose from "mongoose";

const timeBlockSchema = new mongoose.Schema({
  uid: { type: mongoose.Schema.Types.ObjectId, required: true }, // current user id, in browser cookie
  task: { type: String, required: true },
  description: { type: String },
  startTime: { type: String, required: true }, // Format: 'HH:mm'
  endTime: { type: String, required: true },
  date: { type: String, required: true }, // Format: 'YYYY-MM-DD'
  strict: { type: Boolean, default: true }, // Punishment applied if strict and missed
  completed: { type: Boolean, default: false },
});
timeBlockSchema.index({ date: 1, task: 1 }, { unique: true });

export default mongoose.model("TimeBlock", timeBlockSchema);
