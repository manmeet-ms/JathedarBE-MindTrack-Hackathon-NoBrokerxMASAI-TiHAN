import mongoose from "mongoose";

const pointsTxnSchema = new mongoose.Schema(
  {
    uid: { type: mongoose.Schema.Types.ObjectId, required: true }, // current user id, in browser cookie
    user: { type:String},
    type: {
      type: String,
      enum: ["TIMEBLOCK_COMPLETE_CREDIT", "ALL_DAILY_COMPLETE_CREDIT", "VIOLATION_RESOLVED_CREDIT", "NEW_STREAK_CREDIT", "EXTEND_STREAK_CREDIT", "DIARY_WRITING_CREDIT", 
        "RITUAL_CREATED_CREDIT","RITUAL_COMPLETE_CREDIT", "URGE_LOGGED_CREDIT", "URGE_RESISTED_CREDIT", "MOOD_LOGGED_CREDIT", "MOOD_IMPROVEMENT_CREDIT", "RITUAL_MISS_PENALTY", "URGE_FAILURE_PENALTY", "BLOCK_MISS_PENALTY", "STREAK_BREAK_PENALTY", "VIOLATION_PENALTY", "TIMER_RESET_PENALTY", "PUNISHMENT_TRIGGER_PENALTY","DEFAULT"],
      required: true,
      default:"DEFAULT"
    },
    points: { type: Number, required: true }, // + or -
    balanceAfter: { type: Number, required: true }, // snapshot after applying txn
    metadata: { type: Object }, // extra info (timeblockId, violationId, etc.)
  },
  { timestamps: true }
);

export default mongoose.model("PointsTxn", pointsTxnSchema);
