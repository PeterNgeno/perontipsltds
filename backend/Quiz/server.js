const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const quizRoutes = require("./routes/quizRoutes");
const { PORT } = require("./shared/config"); // Updated path to correctly point to config.js

const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse JSON request bodies

// Health check route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Peron Tips Limited Quiz API is running" });
});

// Quiz routes
app.use("/api/quiz", quizRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Something went wrong!" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

