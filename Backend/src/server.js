const express = require("express");
const cors = require("cors");
require("dotenv").config();

const profileRoutes = require("./routes/profileRoutes");
const authRoutes = require("./routes/authRoutes");
const skillRoutes = require("./routes/skillRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const educationRoutes = require("./routes/educationRoutes");
const certificationRoutes = require("./routes/certificationRoutes");

const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/profile", profileRoutes);
app.use("/auth", authRoutes);
app.use("/skills", skillRoutes);
app.use("/experience", experienceRoutes);
app.use("/education", educationRoutes);
app.use("/certifications", certificationRoutes);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));