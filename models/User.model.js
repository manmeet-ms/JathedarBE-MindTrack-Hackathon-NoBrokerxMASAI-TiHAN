import bcrypt from "bcryptjs";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    name: { type: String },
    email: { type: String, unique: true },
    points: { type: Number, default: 0 },
    password: { type: String },
    avatar: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },

    isVerified: { type: Boolean, default: false },
    verificationToken: {
      type: String,
    },
    resetPasswordToken: { type: String },
    resetPasswordTokenExpires: { type: Date },
    provider: {
      discord: {
        discordId: { type: String, required: true, unique: true },
      },
    },
  },
  { timestamps: true }
); // defined outside the object

userSchema.pre("save", async function (next) {
  if (!this.verificationToken) {
    this.verificationToken = this.verificationToken;
  }
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export default mongoose.model("User", userSchema);
