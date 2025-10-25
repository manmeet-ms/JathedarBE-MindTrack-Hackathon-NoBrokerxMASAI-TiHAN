import mongoose from "mongoose";
const chronosSchema = new mongoose.Schema({
  uid: { type: mongoose.Schema.Types.ObjectId, required: true }, // current user id, in browser cookie

  codename: { type: String, required: true },
  failures: { type: Number, required: true },
  timerStarted: { type: String, required: true }, // "DD/MM/YYYY"
  title: { type: String, required: true },
  description: { type: String, required: true },
  perks: { type: Array, required: true },
  punishments: { type: Array, required: true },
  alternates: { type: Array, required: true },
  quoteFlashingAllowed: { type: Boolean },
  pulseTheme: { type: String },
});
export default mongoose.model("Chronos", chronosSchema);

// import mongoose from 'mongoose';

// const TimeBlockSchema = new mongoose.Schema({
// task: { type: String, required: true },
// description: { type: String},
// startTime: { type: String, required: true }, // Format: 'HH:mm'
// endTime: { type: String, required: true },
// date: { type: String, required: true }, // Format: 'YYYY-MM-DD'
// strict: { type: Boolean, default: true }, // Punishment applied if strict and missed
// completed: { type: Boolean, default: false },
// });
// TimeBlockSchema.index({ date: 1, task: 1 }, { unique: true });

// export default mongoose.model('TimeBlock', TimeBlockSchema);
