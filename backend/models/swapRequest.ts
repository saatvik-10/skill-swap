import mongoose from "mongoose";

const swapRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  otherUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  offeredSkill: [
    {
      type: String,
      required: true,
    },
  ],
  wantedSkill: [
    {
      type: String,
      required: true,
    },
  ],
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

export const SwapRequests = mongoose.model("SwapRequest", swapRequestSchema);
