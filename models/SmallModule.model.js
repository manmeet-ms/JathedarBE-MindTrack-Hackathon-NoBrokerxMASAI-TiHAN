import mongoose from "mongoose";

const smallModuleSchema = new mongoose.Schema(  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Day 1 starts here
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  });
smallModuleSchema.virtual('currentDay').get(function () {
  const today = new Date();
  const created = new Date(this.createdAt);

  // Normalize to UTC midnight to avoid timezone issues
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const createdStart = new Date(created.getFullYear(), created.getMonth(), created.getDate());

  const diffTime = Math.abs(todayStart - createdStart);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays + 1; // Day 1 on creation day
});
export default mongoose.model("SmallModule", smallModuleSchema);
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
