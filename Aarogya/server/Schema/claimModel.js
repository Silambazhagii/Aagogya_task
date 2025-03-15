const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  claimant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  handler: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  status: { type: String, enum: ["Pending", "In Review", "Approved", "Rejected"], default: "Pending" },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      message: String,
      postedTime: { type: Date, default: Date.now },
    },
  ],
  upvotes: { type: Number, default: 0 },
  upvotedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

module.exports = mongoose.model("Claim", claimSchema);
