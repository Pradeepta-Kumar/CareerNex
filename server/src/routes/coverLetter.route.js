import express from "express";
import { createCoverLetter } from "../controllers/coverletter.controller.js";

const router = express.Router();

router.post("/create/:id", createCoverLetter);

export default router;