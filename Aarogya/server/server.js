require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const claimRoutes = require("./Routes/claimRouter");

const app = express();

app.use(express.json()); 
app.use(cors()); 


mongoose.connect("mongodb+srv://Silambazhagii:silu777@cluster0.hfioesj.mongodb.net/ClaimManagement?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

app.use("/api/claims", claimRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Claims Management API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
