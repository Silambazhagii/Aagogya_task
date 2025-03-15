const express = require("express");
const router = express.Router();
const claimModel = require("../Schema/claimModel");
const userModel = require("../Schema/userModel");

router.get("/", async (req, res) => {
  try {
    const claims = await claimModel.find().populate("claimant", "name email");
    res.status(200).json(claims);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const claim = await claimModel.findById(req.params.id).populate("claimant handler", "name email");
    if (!claim) return res.status(404).json({ message: "Claim not found" });
    res.json(claim);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, claimant } = req.body;
    const user = await userModel.findById(claimant);
    if (!user) return res.status(404).json({ message: "Claimant not found" });

    const newClaim = new claimModel({ title, description, claimant });
    await newClaim.save();

    res.status(201).json(newClaim);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const claim = await claimModel.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!claim) return res.status(404).json({ message: "Claim not found" });

    res.json(claim);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/:id/comments", async (req, res) => {
  try {
    const { userId, message } = req.body;
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const claim = await claimModel.findById(req.params.id);
    if (!claim) return res.status(404).json({ message: "Claim not found" });

    claim.comments.push({ user: userId, message });
    await claim.save();

    res.status(200).json({ message: "Comment added", comments: claim.comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:claimId/comments/:commentId", async (req, res) => {
  try {
    const claim = await claimModel.findById(req.params.claimId);
    if (!claim) return res.status(404).json({ message: "Claim not found" });

    claim.comments = claim.comments.filter(comment => comment._id.toString() !== req.params.commentId);
    await claim.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/:id/upvote", async (req, res) => {
  try {
    const { userId } = req.body;
    const claim = await claimModel.findById(req.params.id);
    if (!claim) return res.status(404).json({ message: "Claim not found" });

    if (claim.upvotedBy.includes(userId)) {
      return res.status(400).json({ message: "You have already upvoted this claim" });
    }

    claim.upvotes += 1;
    claim.upvotedBy.push(userId);
    await claim.save();

    res.json({ upvotes: claim.upvotes, message: "Claim upvoted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const claim = await claimModel.findByIdAndDelete(req.params.id);
    if (!claim) return res.status(404).json({ message: "Claim not found" });

    res.status(200).json({ message: "Claim deleted successfully" });
  } catch (error) {
    console.error("Error deleting claim:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
