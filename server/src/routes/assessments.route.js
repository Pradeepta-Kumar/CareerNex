import express from 'express';
import { generateQuestions } from '../controllers/assessments.controller.js';

const router = express.Router();

router.post("/generate/:id", generateQuestions);

export default router;