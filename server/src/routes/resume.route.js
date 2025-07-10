import express from "express";
import { createResume } from "../controllers/resume.controller.js";

const router = express.Router();

router.post("/create/:id", createResume);

export default router;