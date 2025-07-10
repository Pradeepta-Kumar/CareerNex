import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import resumeRoutes from "./routes/resume.route.js"; 
import coverLetterRoutes from "./routes/coverLetter.route.js"; 
import assessmentsRoutes from "./routes/assessments.route.js"; 
import indusrtyInsightsRoutes from "./routes/indusrtyInsights.route.js"; 

const app = new express();

dotenv.config({
  path: "./.env",
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);


app.use(cookieParser());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/cover-letter", coverLetterRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/assessments", assessmentsRoutes );
app.use("/api/industry-insights", indusrtyInsightsRoutes);

export default app;