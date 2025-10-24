import mongoose from "mongoose";
const urgeSchema = new mongoose.Schema({
  uid: { type: mongoose.Schema.Types.ObjectId, required: true }, // current user id, in browser cookie

  urgeTimeStamp: { type: Date, required: true, default: Date.now() },
  urgeIntensity: {
    type: Number, // 1 to 10 scale
    min: 1,
    max: 10,
    default: 6,
  },

  urgeType: {
    type: String, // e.g., "procrastination", "distraction", "browsing", etc.
    enum: ["procrastination", "distraction", "doomscroll", "browsing", "addiction", "other"],
    default: "other",
  },

  urgeTrigger: {
    type: String, // optional free-text explanation
    // maxlength: 300,
    enum: ["boredom", "stress", "anxiety", "habitual time", "social media notification", "being alone", "seeing others online", "avoiding hard task", "tiredness", "mindless routine", "dopamine craving", "overwhelmed", "no clear goal", "peer influence", "seeking comfort"],
    default: null,
    // default: faker.person.firstName("female"),
  },

  urgeLocation: {
    type: String, // could be GPS or user-defined room label
    enum: ["bedroom", "workspace", "library", "college", "commute", "living room", "alone", "in public"],
    default: null,
    // default: faker.lorem.lines({ min: 1, max: 3 }),
  },

  urgeResolved: {
    type: Boolean,
    default: false, // set to true if user resisted/overcame the urge
  },

  urgeNotes: {
    type: String, // user can jot down what helped or happened
    // maxlength: 1000,
    default: null,
    // default: faker.person.bio(),
  },

  // urgeuid: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
});

export default mongoose.model("Urge", urgeSchema);

/**
 * | Field       | Purpose                                                                 |
| ----------- | ----------------------------------------------------------------------- |
| `intensity` | Quantify how strong the urge was (helps in charting progress).          |
| `urgeType`  | Categorize urges for pattern analysis.                                  |
| `trigger`   | Helps the user reflect on what causes the urge.                         |
| `location`  | Optional but useful if patterns emerge in certain places.               |
| `resolved`  | Track if user gave in or overcame the urge (useful for streaks/scores). |
| `notes`     | Journal-style reflection or coping strategy.                            |
| `userId`    | Tie it to a specific user in multi-user systems.                        |


 */
