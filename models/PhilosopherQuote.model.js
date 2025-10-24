import mongoose from "mongoose";
const philosopherQuoteSchema = new mongoose.Schema({
  philosopher: {
    name: { type: String, required: true },
    iconUrl: { type: String },
    coverUrl: { type: String },
    qualities: { type: Array, required: true }
  },
  quotes: { type: Array, required: true 
    // text: { type: Array, required: true },
    // source: { type: String, default: "Unknown Work" },
  },
//   tone: { type: String, enum: ["dangerous", "neutral"], default: "neutral" },
//   timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("PhilosopherQuote", philosopherQuoteSchema);
